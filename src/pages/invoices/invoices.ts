import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Invoice } from '../../models/invoice/invoice';
import { EntryPage } from '../entry/entry';
import { UserSession } from '../../sessions/user/user';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { RecountsPage } from '../recounts/recounts';
import { InvoiceProvider } from '../../providers/invoice/invoice';

@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
  providers: [
    InvoiceProvider
  ]
})
export class InvoicesPage {

  invoices: Array<Invoice> = [];
  invoicesR: Array<Invoice> = [];
  showLevel1 = null;

  constructor(public nav: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private userSession: UserSession,
    private invoiceSession: InvoiceSession,
    private invoiceProvider: InvoiceProvider) {
      this.refresh();
  }

  refresh() {
    if (this.userSession.isTesting()) {
      this.invoiceSession.loadTestInvoices();
      this.invoices = this.invoiceSession.getInvoices();
      this.invoicesR = this.invoiceSession.getInvoicesR();
    }
    else {
      this.searchInvoices();
    }
  }

  goToEntry(id: Number) {
    this.nav.push(EntryPage, { invoiceId: id });
  }
    
  goToRecounts(id: Number) {
    this.invoiceSession.setInvoiceId(id);
    this.nav.push(RecountsPage);
  }
    
  searchInvoices() {
    
    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    this.invoiceProvider.invoices().subscribe(
      data => {
        loading.dismiss();

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }

        this.invoices = response.invoices;
        this.invoicesR = response.invoicesR;

      },
      error => {
        loading.dismiss();
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      }
    );
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  presentToast(msg: string, type: string, log?: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'botton',
      cssClass: type
    });

    toast.present();
  }


}

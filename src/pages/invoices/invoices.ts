import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Invoice } from '../../models/invoice/invoice';
import { EntryPage } from '../entry/entry';
import { UserSession } from '../../sessions/user/user';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { RecountsPage } from '../recounts/recounts';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { GlobalView } from '../../app/global.view';

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
    private global: GlobalView,
    private userSession: UserSession,
    private invoiceSession: InvoiceSession,
    private invoiceProvider: InvoiceProvider) {
  }

  ionViewCanEnter() {
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

    this.global.waitingProcess();

    this.invoiceProvider.invoices().subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.invoices = response.invoices;
        this.invoicesR = response.invoicesR;

        if(this.invoices.length == 0 && this.invoicesR.length == 0) 
          this.global.presentToast('Nenhuma nota pendente', 'warning');
    
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
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

}

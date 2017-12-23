import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Invoice } from '../../models/invoice/invoice';
import { EntryPage } from '../entry/entry';
import { UserSession } from '../../sessions/user/user';
import { InvoiceSession } from '../../sessions/invoice/invoice';

@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html'
})
export class InvoicesPage {

  invoices: Array<Invoice>;

  constructor(public nav: NavController,
    private invoiceSession: InvoiceSession,
    private userSession: UserSession) {
  }

  ionViewCanEnter() {
    this.refresh();
  }

  refresh() {
    if (this.userSession.isTesting()) {
      this.invoiceSession.loadTestInvoices();
      this.invoices = this.invoiceSession.getInvoices();
    }
    else {
      this.searchInvoices();
    }
  }

  goToEntry(id: Number) {
    this.nav.push(EntryPage, { invoiceId: id });
  }
    
  goToRecount(id: Number) {

  }
    
  searchInvoices() {
    /*
    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    while(this.barcode.length < 13) 
      this.barcode = "0" + this.barcode;

    this.itemProvider.search(this.barcode).subscribe(
      data => {
        loading.dismiss();

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }

        this.itemSession.setItem(response.item);
        this.nav.push(ItemPage);
      },
      error => {
        loading.dismiss();
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
        this.barcodeInput.setFocus();
      }
    );
    */
  }

}

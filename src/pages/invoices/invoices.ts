import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Invoice } from '../../models/invoice/invoice';
import { EntryStep1Page } from '../entry1/entry1';
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

  invoices1: Array<Invoice> = [];
  invoices2: Array<Invoice> = [];
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
      this.invoices1 = this.invoiceSession.getInvoices1();
      this.invoices1 = this.invoiceSession.getInvoices2();
      this.invoicesR = this.invoiceSession.getInvoicesR();
    }
    else {
      this.searchInvoices();
    }

    this.invoiceSession.setItem(null);
    this.invoiceSession.setInvoice(null);
    this.invoiceSession.setInvoiceItem(null);
  }

  goToEntry1(id: Number) {

    let invoice: Invoice  = null;
    for (let i = 0; i < this.invoices1.length; i++) {
      let loaded = this.invoices1[i];
      if (loaded.id == id) {
        invoice = loaded;
        break;
      }
    }

    this.invoiceSession.setInvoice(invoice);
    this.nav.push(EntryStep1Page);
  }

  goToEntry2(id: Number) {

    let invoice: Invoice  = null;
    for (let i = 0; i < this.invoices2.length; i++) {
      let loaded = this.invoices2[i];
      if (loaded.id == id) {
        invoice = loaded;
        break;
      }
    }

    this.invoiceSession.setInvoice(invoice);
    this.nav.push(EntryStep1Page);
  }
    
  goToRecounts(id: Number) {

    let invoice: Invoice;
    for (let i = 0; i < this.invoicesR.length; i++) {
      let loaded = this.invoicesR[i];
      if (loaded.id == id) {
        invoice = loaded;
        break;
      }
    }
    this.invoiceSession.setInvoice(invoice);
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

        this.invoices1 = response.invoices1;
        this.invoices2 = response.invoices2;
        this.invoicesR = response.invoicesR;    
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

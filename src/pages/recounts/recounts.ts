import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { GlobalView } from '../../app/global.view';
import { Invoice } from '../../models/invoice/invoice';
import { EntryStep2Page } from '../entry2/entry2';
import { EntryStep3Page } from '../entry3/entry3';
import { InvoicesPage } from '../invoices/invoices';

@Component({
  selector: 'page-recounts',
  templateUrl: 'recounts.html',
  providers: [
    InvoiceProvider
  ]
})
export class RecountsPage {

  items: Array<Item> = [];
  weights: Array<Item> = [];
  invoice: Invoice;

  constructor(public nav: NavController,
    private global: GlobalView,
    private userSession: UserSession,
    private invoiceSession: InvoiceSession,
    private invoiceProvider: InvoiceProvider) {
  }

  ionViewCanEnter() {    
    this.invoice = this.invoiceSession.getInvoice();
    this.refresh();
  }

  refresh() {
    if (this.userSession.isTesting()) {
      this.items = this.invoiceSession.getItems();
      this.global.finalizeProcess();
    }
    else {
      this.searchInvoiceItems();
    }
  }

  goToRecount(id: Number) {
    let item = null;
    
    for (let i = 0; i < this.items.length; i++) {
      let loaded = this.items[i];
      if (loaded.id == id) {
        item = loaded;
        break;
      }
    }

    this.invoiceSession.clear();
    this.invoiceSession.setItem(item);
    this.nav.setRoot(EntryStep2Page);    
  }

  goToWeightRecount(id: Number) {
    let item = null;
    
    for (let i = 0; i < this.weights.length; i++) {
      let loaded = this.weights[i];
      if (loaded.id == id) {
        item = loaded;
        break;
      }
    }

    this.invoiceSession.clear();
    this.invoiceSession.setItem(item);
    this.nav.setRoot(EntryStep3Page); 
  }

  return() {
    this.nav.setRoot(InvoicesPage);
  }

  searchInvoiceItems() {
    
    this.global.waitingProcess();

    this.invoiceProvider.invoice_items(this.invoice.id).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.items = [];
        this.weights = [];

        if ( response.items.length ) {
          for (let i = 0; i < response.items.length; i++) {
            let loaded = response.items[i];
            if (loaded.weight == 'S') 
              this.weights.push(loaded);
            else
              this.items.push(loaded);
          }
        }
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  }

}

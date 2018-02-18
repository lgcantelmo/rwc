import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { GlobalView } from '../../app/global.view';
import { Invoice } from '../../models/invoice/invoice';
import { EntryStep3Page } from '../entry3/entry3';
import { EntryStep1Page } from '../entry1/entry1';

@Component({
  selector: 'page-weights',
  templateUrl: 'weights.html',
  providers: [
    InvoiceProvider
  ]
})
export class WeightsPage {

  items: Array<Item> = [];
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
      this.searchWeightItems();
    }
  }

  goToWeight(id: Number) {
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
    this.nav.setRoot(EntryStep3Page);   
  }

  private searchWeightItems() {
    
    this.global.waitingProcess();

    this.invoiceProvider.weight_items(this.invoice.id).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.items = response.items;
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  }

  return() {
    this.nav.setRoot(EntryStep1Page);
  }

}

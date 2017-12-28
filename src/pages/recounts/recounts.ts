import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { RecountPage } from '../recount/recount';

@Component({
  selector: 'page-recounts',
  templateUrl: 'recounts.html'
})
export class RecountsPage {

  items: Array<Item>;
  invoiceId: Number;

  constructor(public nav: NavController,
    private invoiceSession: InvoiceSession,
    private userSession: UserSession) {
  }

  ionViewCanEnter() {
    this.invoiceId = this.invoiceSession.getInvoiceId();
    this.refresh();
  }

  refresh() {
    if (this.userSession.isTesting()) {
      this.items = this.invoiceSession.getItems();
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

    this.nav.push(RecountPage, { item: item, invoiceId: this.invoiceId });
  }

  searchInvoiceItems() {
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

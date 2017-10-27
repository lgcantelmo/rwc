import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchItemPage } from '../search-item/search-item';
import { InventoryPage } from '../inventory/inventory';
import { ReceiptPage } from '../receipt/receipt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController) {
  }

  goToSearchItem() {
    this.nav.setRoot(SearchItemPage);
  }

  goToInventory() {
    this.nav.setRoot(InventoryPage);
  }

  goToReceipt() {
    this.nav.setRoot(ReceiptPage);
  }

}

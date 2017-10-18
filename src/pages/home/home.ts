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

  goToSearchItem(params) {
    if (!params) params = {};
    this.nav.setRoot(SearchItemPage);
  }

  goToInventory(params) {
    if (!params) params = {};
    this.nav.setRoot(InventoryPage);
  }

  goToReceipt(params) {
    if (!params) params = {};
    this.nav.setRoot(ReceiptPage);
  }

}

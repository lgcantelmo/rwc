import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchItemPage } from '../search-item/search-item';
import { InventoryPage } from '../inventory/inventory';
import { InvoicesPage } from '../invoices/invoices';
import { UserSession } from '../../sessions/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string;

  constructor(public nav: NavController,
    private userSession: UserSession) {
  }

  ionViewCanEnter() {    
    this.name = this.userSession.getUser().name;    
  }    

  goToSearchItem() {
    this.nav.setRoot(SearchItemPage);
  }

  goToInventory() {
    this.nav.setRoot(InventoryPage);
  }

  goToInvoices() {
    this.nav.setRoot(InvoicesPage);
  }

}

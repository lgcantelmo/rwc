import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchItemPage } from '../search-item/search-item';
import { OrdersPage } from '../orders/orders';
import { ShoppingsPage } from '../shoppings/shoppings';
import { SalesPage } from '../sales/sales';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

  constructor(public nav: NavController) {
  }

  goToOrders(params){
    if (!params) params = {};
    this.nav.setRoot(OrdersPage);
  }

  goToShoppings(params){
    if (!params) params = {};
    this.nav.setRoot(ShoppingsPage);
  }

  goToSales(params){
    if (!params) params = {};
    this.nav.setRoot(SalesPage);
  }

  returnToSearchItem(params){
    if (!params) params = {};
    this.nav.setRoot(SearchItemPage);
  }

}

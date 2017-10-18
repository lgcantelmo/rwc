import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {

  constructor(public nav: NavController) {
  }
  
  goToOrder(params){
    if (!params) params = {};
    this.nav.setRoot(OrderPage);
  }

  returnToItem(params){
    if (!params) params = {};
    this.nav.setRoot(ItemPage);
  }
}

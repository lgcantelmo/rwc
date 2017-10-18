import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  constructor(public nav: NavController) {
  }

  returnToOrders(params) {
    if (!params) params = {};
    this.nav.setRoot(OrdersPage);
  }

}

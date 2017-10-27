import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';
import { Order } from '../../models/order/order';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  order: Order;

  constructor(public nav: NavController, private param: NavParams) {
  }

  ionViewCanEnter() {
    this.order = this.param.get('order');
  }

  returnToOrders() {
    this.nav.push(OrdersPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 2;
        this.nav.remove(startIndex, 2);
      });
  }

}
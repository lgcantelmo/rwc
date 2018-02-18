import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';
import { Order } from '../../models/order/order';
import { ItemSession } from '../../sessions/item/item';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  order: Order;

  constructor(public nav: NavController, private itemSession: ItemSession) {
  }

  ionViewCanEnter() {
    /*this.order = this.param.get('order');*/
    this.order = this.itemSession.order;
  }

  returnToOrders() {
    /*this.nav.push(OrdersPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 2;
        this.nav.remove(startIndex, 2);
      });*/
    this.nav.setRoot(OrdersPage);
  }

}
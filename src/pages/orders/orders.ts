import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { Order } from '../../models/order/order';
import { UserSession } from '../../sessions/user/user';
import { GlobalView } from '../../app/global.view';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [
    ItemProvider
  ]
})
export class OrdersPage {

  orders: Array<Order>;

  constructor(
    public nav: NavController,
    private global: GlobalView,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession,
    private userSession: UserSession) {
  }

  ionViewCanEnter() {

    this.orders = this.itemSession.getItem().orders;

    if (this.orders.length != 0)
      return;
    
    if(this.userSession.isTesting()) {
      this.itemSession.loadTestOrders();
      this.orders = this.itemSession.getItem().orders;
    }
    else {
      this.searchOrders();
    }
  }

  private searchOrders() {

    this.global.waitingProcess();

    let itemId = this.itemSession.getItem().id;
    this.itemProvider.orders(itemId).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.orders = response.orders;
        this.itemSession.getItem().orders = response.orders;

      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  }

  goToOrder(orderId: Number) {

    let order = null;

    for (let i = 0; i < this.orders.length; i++) {
      let loaded = this.orders[i];
      if (loaded.id == orderId) {
        order = loaded;
        break;
      }
    }

    this.nav.push(OrderPage, { order: order });
  }

  returnToItem() {
    this.nav.push(ItemPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
  }

}
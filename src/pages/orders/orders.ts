import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { Order } from '../../models/order/order';

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
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession) {
  }

  ionViewCanEnter() {

    this.orders = this.itemSession.getItem().orders;

    if (this.orders.length != 0)
      return;

    this.searchOrders();
  }

  private searchOrders() {

    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    let itemId = this.itemSession.getItem().id;
    this.itemProvider.orders(itemId).subscribe(
      data => {
        loading.dismiss();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }

        this.orders = response.orders;
        this.itemSession.getItem().orders = response.orders;

      },
      error => {
        loading.dismiss();
        this.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
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

  presentToast(msg: string, type: string, log?: string) {    
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'botton',
      cssClass: type
    });

    toast.onDidDismiss(() => {
      console.log(log);
    });

    toast.present();
  }
}
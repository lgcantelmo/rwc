import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [
    ItemProvider
  ]
})
export class OrdersPage {

  orders: Array<PurchaseOrder>;

  constructor(
    public nav: NavController,
    private param: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private itemProvider: ItemProvider) {
  }

  ionViewCanEnter() {

    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    let itemId = this.param.get('itemId');

    this.itemProvider.purchases(itemId).subscribe(
      data => {
        loading.dismiss();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }

        let ordersDto = response.purchases;

        this.orders = [];
        for (let i = 0; i < ordersDto.length; i++) {
          let dto = ordersDto[i];
          this.orders.push({
            id: dto.id,
            itemId: dto.itemId,
            code: dto.code,
            unit: dto.unit,
            description: dto.description,
            value: dto.value,
            date: dto.date,
            qty: dto.qty,
            balance: dto.balance,
            situation: dto.situation,
            company: dto.company
          });
        }

      },
      error => {
        loading.dismiss();
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      }
    );

  }

  goToOrder(orderId: Number) {

    let order = null;

    for (let i = 0; i < this.orders.length; i++) {
      let loaded = this.orders[i];
      if(loaded.id == orderId) {
        order = loaded;
        break;
      }
    }

    this.nav.push(OrderPage, { order: order });
  }

  returnToItem() {
    this.nav.setRoot(ItemPage);
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

export class PurchaseOrder {

  id: Number;
  itemId: Number;
  code: string;
  unit: string;
  description: string;
  value: string;
  total: string;
  date: string;
  qty: string;
  balance: string;
  situation: string;
  company: string;

  constructor() { }
}
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ShoppingPage } from '../shopping/shopping';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';

@Component({
  selector: 'page-shoppings',
  templateUrl: 'shoppings.html',
  providers: [
    ItemProvider
  ]
})
export class ShoppingsPage {

  shoppings: Array<Shopping>;

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

    this.itemProvider.shoppings(itemId).subscribe(
      data => {
        loading.dismiss();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }

        let shoppingsDto = response.shoppings;

        this.shoppings = [];
        for (let i = 0; i < shoppingsDto.length; i++) {
          let dto = shoppingsDto[i];
          this.shoppings.push({
            itemId: dto.itemId,
            date: dto.date,
            number: dto.number,
            provider: dto.provider,
            stock: dto.stock,
            cost: dto.cost,
            operation: dto.operation,
            code: dto.code,
            description: dto.description,
            unit: dto.unit,
            total: dto.total
          });
        }

      },
      error => {
        loading.dismiss();
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      }
    );

  }

  goToShopping(number: String) {

    let shopping = null;

    for (let i = 0; i < this.shoppings.length; i++) {
      let loaded = this.shoppings[i];
      if (loaded.number == number) {
        shopping = loaded;
        break;
      }
    }

    this.nav.push(ShoppingPage, { shopping: shopping });
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

export class Shopping {

  itemId: Number;
  date: string;
  number: string;
  provider: string;
  stock: string;
  cost: string;
  operation: string;
  code: string;
  description: string;
  unit: string;
  total: string;

  constructor() { }
}
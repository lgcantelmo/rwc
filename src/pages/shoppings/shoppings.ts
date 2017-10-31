import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ShoppingPage } from '../shopping/shopping';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { Shopping } from '../../models/shopping/shopping';
import { UserSession } from '../../sessions/user/user';

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
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession,
    private userSession: UserSession) {
  }

  ionViewCanEnter() {
    this.shoppings = this.itemSession.getItem().shoppings;

    if (this.shoppings.length != 0)
      return;

    if (this.userSession.isTesting()) {
      this.itemSession.loadTestShoppings();
      this.shoppings = this.itemSession.getItem().shoppings;
    }
    else {
      this.searchShoppings();
    }
  }

  private searchShoppings() {

    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    let itemId = this.itemSession.getItem().id;
    this.itemProvider.shoppings(itemId).subscribe(
      data => {
        loading.dismiss();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }

        this.shoppings = response.shoppings;
        this.itemSession.getItem().shoppings = response.shoppings;
      },
      error => {
        loading.dismiss();
        this.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
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
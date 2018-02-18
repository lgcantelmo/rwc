import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShoppingPage } from '../shopping/shopping';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { Shopping } from '../../models/shopping/shopping';
import { UserSession } from '../../sessions/user/user';
import { GlobalView } from '../../app/global.view';

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
    private global: GlobalView,
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

    this.global.waitingProcess();

    let itemId = this.itemSession.getItem().id;
    this.itemProvider.shoppings(itemId).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.shoppings = response.shoppings;
        this.itemSession.getItem().shoppings = response.shoppings;
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
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

    this.itemSession.shopping = shopping;
    this.nav.setRoot(ShoppingPage);  
  }

  returnToItem() {
    this.nav.setRoot(ItemPage);  
  }

}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShoppingsPage } from '../shoppings/shoppings';
import { Shopping } from '../../models/shopping/shopping';
import { ItemSession } from '../../sessions/item/item';

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html'
})
export class ShoppingPage {

  shopping: Shopping;

  constructor(public nav: NavController, private itemSession: ItemSession) {
  }

  ionViewCanEnter() {
    this.shopping = this.itemSession.shopping;
  }
  
  returnToShoppings() {
    this.nav.setRoot(ShoppingsPage);
  }

}
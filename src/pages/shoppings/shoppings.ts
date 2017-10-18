import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShoppingPage } from '../shopping/shopping';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-shoppings',
  templateUrl: 'shoppings.html'
})
export class ShoppingsPage {

  constructor(public nav: NavController) {
  } 

  goToShopping(params){
    if (!params) params = {};
    this.nav.setRoot(ShoppingPage);
  }

  returnToItem(params){
    if (!params) params = {};
    this.nav.setRoot(ItemPage);
  }
}

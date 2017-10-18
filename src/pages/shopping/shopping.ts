import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShoppingsPage } from '../shoppings/shoppings';

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html'
})
export class ShoppingPage {

  constructor(public nav: NavController) {
  }

  returnToShoppings(params){
    if (!params) params = {};
    this.nav.setRoot(ShoppingsPage);
  }
}

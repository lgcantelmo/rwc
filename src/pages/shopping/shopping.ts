import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ShoppingsPage } from '../shoppings/shoppings';

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html'
})
export class ShoppingPage {

  shopping: Shopping;

  constructor(public nav: NavController, private param: NavParams) {
  }

  ionViewCanEnter() {
    this.shopping = this.param.get('shopping');
  }

  returnToShoppings() {
    this.nav.setRoot(ShoppingsPage);
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
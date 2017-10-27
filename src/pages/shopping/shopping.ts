import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ShoppingsPage } from '../shoppings/shoppings';
import { Shopping } from '../../models/shopping/shopping';

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
    this.nav.push(ShoppingsPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 2;
        this.nav.remove(startIndex, 2);
      });
  }
}
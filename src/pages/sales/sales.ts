import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SalePage } from '../sale/sale';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html'
})
export class SalesPage {

  constructor(public nav: NavController) {
  }

  goToSale(params){
    if (!params) params = {};
    this.nav.setRoot(SalePage);
  }
  
  returnToItem(params){
    if (!params) params = {};
    this.nav.setRoot(ItemPage);
  }
}

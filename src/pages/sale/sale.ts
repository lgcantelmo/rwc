import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SalesPage } from '../sales/sales';

@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html'
})
export class SalePage {

  constructor(public nav: NavController) {
  }

  returnToSales(params){
    if (!params) params = {};
    this.nav.setRoot(SalesPage);
  }
}

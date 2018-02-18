import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchItemPage } from '../search-item/search-item';
import { OrdersPage } from '../orders/orders';
import { ShoppingsPage } from '../shoppings/shoppings';
import { SalesPage } from '../sales/sales';
import { ItemSession } from '../../sessions/item/item';
import { Item } from '../../models/item/item';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

  item: Item;

  constructor(public nav: NavController, private itemSession: ItemSession) {
  }

  ionViewCanEnter() {
    this.item = this.itemSession.getItem();    
  }

  ionViewDidLoad() {
    // limpa o histórico para apontar para search-item direto
    /*if(this.nav.getViews().length > 3) {
      const endIndex = this.nav.getActive().index - 1;
      this.nav.remove(2, endIndex);   
    }*/
  }

  goToOrders() {
    //this.nav.push(OrdersPage);   
    this.nav.setRoot(OrdersPage);
  }

  goToShoppings() {
    //this.nav.push(ShoppingsPage); 
    this.nav.setRoot(ShoppingsPage);
  }

  goToSales() {
    //this.nav.push(SalesPage);
    this.nav.setRoot(SalesPage);
  }

  returnToSearchItem() {
    this.itemSession.setItems(new Array<Item>());
    this.nav.setRoot(SearchItemPage);
  }

}
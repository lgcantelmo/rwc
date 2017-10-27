import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { SearchItemPage } from '../search-item/search-item';
import { OrdersPage } from '../orders/orders';
import { ShoppingsPage } from '../shoppings/shoppings';
import { SalesPage } from '../sales/sales';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

  public item: Item;

  constructor(public nav: NavController, private param: NavParams) {
  }

  ionViewCanEnter() {
    let pItem = this.param.get('item');

    this.item = new Item();
    this.item.id = pItem.id
    this.item.code = pItem.code;
    this.item.description = pItem.description;
    this.item.barcode = pItem.barcode;
    this.item.mark = pItem.mark;
    this.item.cost = pItem.cost;
    this.item.gain = pItem.gain;
    this.item.idealGain = pItem.idealGain;
    this.item.price = pItem.price;
    this.item.readjustDate = pItem.readjustDate;
    this.item.readjustHour = pItem.readjustHour;
    this.item.stock = pItem.stock;
    this.item.stockReserved = pItem.stockReserved;
    this.item.stockReturned = pItem.stockReturned;
    this.item.stockLoss = pItem.stockLoss;
    this.item.stockAvailable = pItem.stockAvailable;
    this.item.observation = pItem.observation;
    this.item.blocked = pItem.blocked;
    this.item.groupName = pItem.groupName;
    this.item.subgroupName = pItem.subgroupName;
  }

  goToOrders() {
    this.nav.push(OrdersPage, {itemId: this.item.id});
  }

  goToShoppings() {
    this.nav.push(ShoppingsPage, {itemId: this.item.id});
  }

  goToSales() {
    this.nav.push(SalesPage, {itemId: this.item.id});
  }

  returnToSearchItem() {
    this.nav.setRoot(SearchItemPage);
  }

}

export class Item {

  id: string;
  code: string;
  description: string;
  barcode: string;
  mark: string;
  cost: string;
  gain: string;
  idealGain: string;
  price: string;
  readjustDate: string;
  readjustHour: string;
  stock: string;
  stockReserved: string;
  stockReturned: string;
  stockLoss: string;
  stockAvailable: string;
  observation: string;
  blocked: string;
  groupName: string;
  subgroupName: string;

  constructor() { }
}
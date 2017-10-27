import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item/item';

@Injectable()
export class ItemSession {

  item: Item; 

  constructor() {
  }

  getItem() {
    return this.item;
  }

  setItem(item: Item) {
    this.item = item;
    this.item.orders = [];
    this.item.shoppings = [];
    this.item.sales = [];
  }

}

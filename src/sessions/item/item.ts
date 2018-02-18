import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item/item';
import { Shopping } from '../../models/shopping/shopping';
import { Sale } from '../../models/sale/sale';
import { Order } from '../../models/order/order';

@Injectable()
export class ItemSession {

  item: Item;
  items: Array<Item>;
  showBarcodeDiv: boolean = false;

  order: Order;
  shopping: Shopping;
  sale: Sale;

  constructor() {
  }

  clear() {
    this.item = new Item();
    this.items = [];
    this.showBarcodeDiv = false;

    this.order = new Order();
    this.shopping = new Shopping();
    this.sale = new Sale();
  }

  getOrder() {
    return this.order;
  }

  getShooping() {
    return this.shopping;
  }

  getSale() {
    return this.sale;
  }

  getItem() {
    return this.item;
  }

  getItems() {
    return this.items;
  }

  isShowBarcodeDiv(): boolean {
    return this.showBarcodeDiv;
  }

  setItem(item: Item) {
    this.item = item;
    this.item.orders = [];
    this.item.shoppings = [];
    this.item.sales = [];
  }

  setItems(items: Array<Item>) {
    this.items = items;
  }

  setShowBarcodeDiv(showBarcodeDiv: boolean) {
    this.showBarcodeDiv = showBarcodeDiv;
  }

  loadTestItem() {
    let item: Item = new Item();
    item.id = 24147;
    item.code = "19261";
    item.description = "FUBA MIMOSO SINHA FINO 500G *REC09)*****";
    item.barcode = "7896090704545";
    item.cost = "0,75";
    item.gain = "26,67";
    item.price = "0,95";
    item.readjustDate = "29/10/2015";
    item.readjustHour = "10:03";
    item.stock = "40,00";
    item.stockReserved = "0,00";
    item.stockReturned = "0,00";
    item.stockLoss = "0,00";
    item.stockAvailable = "40,00";
    item.observation = "BALANCO EFETUADO TC E COLINAS 20/05/2015";
    item.blocked = "false";
    item.groupName = "PRODUTOS ESPECIAIS";
    item.subgroupName = "ESPECIAIS";
    item.phase = "0,00";

    this.setItem(item);
  }

  loadTestOrders() {
    this.item.orders = [];
  }

  loadTestShoppings() {
    let shoppings: Array<Shopping> = [];

    shoppings.push({ "itemId": 24147, "date": "29/08/2017", "number": "81298", "provider": "TCBASE COMERCIAL LTD", "stock": "30,00", "cost": "0,51", "operation": "COMPRA P/ COMERCIALIZ.", "code": "19261", "description": "FUBA MIMOSO SINHA FINO 500G *REC09)*****", "unit": "UN", "total": "15,30" });
    shoppings.push({ "itemId": 24147, "date": "07/08/2017", "number": "80822", "provider": "TCBASE COMERCIAL LTD", "stock": "200,00", "cost": "0,96", "operation": "COMPRA P/ COMERCIALIZ.", "code": "19261", "description": "FUBA MIMOSO SINHA FINO 500G *REC09)*****", "unit": "UN", "total": "192,00" });

    this.item.shoppings = shoppings;
  }

  loadTestSales() {
    let sales: Array<Sale> = [];

    sales.push({"unit":"UN","month":"Setembro","year":"2017","total":"198,00","qtyTotal":"200,00","qtyNF":"200,00","qtyCF":"0,00"});

    this.item.sales = sales;
  }

  loadTestItems() {
    let items: Array<Item> = [];

    let item: Item = new Item();
    item.id = 24147;
    item.code = "19261";
    item.description = "FUBA MIMOSO SINHA FINO 500G *REC09)*****";
    item.barcode = "7896090704545";
    item.cost = "0,75";
    item.gain = "26,67";
    item.price = "0,95";
    item.readjustDate = "29/10/2015";
    item.readjustHour = "10:03";
    item.stock = "40,00";
    item.stockReserved = "0,00";
    item.stockReturned = "0,00";
    item.stockLoss = "0,00";
    item.stockAvailable = "40,00";
    item.observation = "BALANCO EFETUADO TC E COLINAS 20/05/2015";
    item.blocked = "false";
    item.groupName = "PRODUTOS ESPECIAIS";
    item.subgroupName = "ESPECIAIS";
    item.phase = "0,00";

    for(let i=0; i<20; i++) {
      items.push(item);
    }

    this.items = items;
  }
}


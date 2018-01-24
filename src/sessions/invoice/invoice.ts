import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Invoice } from '../../models/invoice/invoice';
import { Item } from '../../models/item/item';

@Injectable()
export class InvoiceSession {

  invoices: Array<Invoice>;
  invoicesR: Array<Invoice>;
  items: Array<Item>;
  
  invoice: Invoice;
  item: Item;

  constructor() {
  }

  clear() {
    this.invoices = [];
    this.invoicesR = [];
  }

  getItem() {
    return this.item;
  }

  setItem(item: Item) {
    this.item = item;
  }

  getInvoice() {
    return this.invoice;
  }

  setInvoice(invoice: Invoice) {
    this.invoice = invoice;
  }

  getInvoices() {
    return this.invoices;
  }

  getInvoicesR() {
    return this.invoicesR;
  }

  getItems() {
    return this.items;
  }

  loadTestInvoices() {
    let invoices: Array<Invoice> = [];
    let invoicesR: Array<Invoice> = [];

    invoices.push({ "id": 1, "number": "004445", "date": "25/11/2017", "detail": 1, "nick" : "Master Alimentos", "items" : [] });
    invoices.push({ "id": 2, "number": "004444", "date": "20/11/2017", "detail": 2, "nick" : "Master Alimentos", "items" : [] });
    invoices.push({ "id": 3, "number": "004443", "date": "18/11/2017", "detail": 1, "nick" : "Master Alimentos", "items" : [] });

    invoicesR.push({ "id": 6, "number": "004438", "date": "20/10/2017", "detail": 2, "nick" : "Master Alimentos", "items" : [] });
    invoicesR.push({ "id": 7, "number": "004436", "date": "18/10/2017", "detail": 1, "nick" : "Master Alimentos", "items" : [] });

    this.invoices = invoices;
    this.invoicesR = invoicesR;

    let items: Array<Item> = [];
    
    let item: Item = new Item();
    item.id = 24147;
    item.code = "19261";
    item.description = "FUBA MIMOSO SINHA FINO 500G *REC09)*****";
    item.detail = 1;

    for(let i=0; i<5; i++) {
      items.push(item);
    }

    this.items = items;
  }

}


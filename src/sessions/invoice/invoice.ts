import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Invoice } from '../../models/invoice/invoice';
import { Item } from '../../models/item/item';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';

@Injectable()
export class InvoiceSession {

  invoices1: Array<Invoice>;
  invoices2: Array<Invoice>;
  invoicesR: Array<Invoice>;
  items: Array<Item>;

  invoiceId: Number;

  constructor() {
  }

  clear() {
    this.invoices1 = [];
    this.invoices2 = [];
    this.invoicesR = [];
  }

  getInvoiceId() {
    return this.invoiceId;
  }

  setInvoiceId(invoiceId: Number) {
    this.invoiceId = invoiceId;
  }

  getInvoices1() {
    return this.invoices1;
  }

  getInvoices2() {
    return this.invoices2;
  }

  getInvoicesR() {
    return this.invoicesR;
  }

  getItems() {
    return this.items;
  }

  loadTestInvoices() {
    let invoices1: Array<Invoice> = [];
    let invoices2: Array<Invoice> = [];
    let invoicesR: Array<Invoice> = [];

    invoices1.push({ "id": 1, "number": "004445", "date": "25/11/2017", "items" : [] });
    invoices1.push({ "id": 2, "number": "004444", "date": "20/11/2017", "items" : [] });
    invoices1.push({ "id": 3, "number": "004443", "date": "18/11/2017", "items" : [] });

    invoices2.push({ "id": 4, "number": "004442", "date": "09/11/2017", "items" : [] });
    invoices2.push({ "id": 5, "number": "004440", "date": "01/11/2017", "items" : [] });

    invoicesR.push({ "id": 6, "number": "004438", "date": "20/10/2017", "items" : [] });
    invoicesR.push({ "id": 7, "number": "004436", "date": "18/10/2017", "items" : [] });

    this.invoices1 = invoices1;
    this.invoices2 = invoices2;
    this.invoicesR = invoicesR;

    let items: Array<Item> = [];
    
    let item: Item = new Item();
    item.id = 24147;
    item.code = "19261";
    item.description = "FUBA MIMOSO SINHA FINO 500G *REC09)*****";

    for(let i=0; i<5; i++) {
      items.push(item);
    }

    this.items = items;
  }

}


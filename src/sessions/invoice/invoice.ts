import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Invoice } from '../../models/invoice/invoice';
import { Item } from '../../models/item/item';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';

@Injectable()
export class InvoiceSession {

  /* Listagens em me memoria (confirmar se tem necessidade manter isso aqui*/
  invoices1: Array<Invoice>;
  invoices2: Array<Invoice>;
  invoicesR: Array<Invoice>;
  items: Array<Item>;
  
  invoice: Invoice;
  item: Item;
  dto: InvoiceItem;

  navigate: Number;

  constructor() {
  }

  clear() {
    this.item = new Item();
    this.dto = new InvoiceItem();
  }

  getInvoiceItem() {
    return this.dto;
  }

  setInvoiceItem(dto: InvoiceItem) {
    this.dto = dto;
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

  getNavigate() {
    return this.navigate;
  }

  setNavigate(navigate: number) {
    this.navigate = navigate;
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

    invoices1.push({ "id": 1, "number": "004445", "date": "25/11/2017", "detail": 1, "nick" : "Master Alimentos", "items" : [] });
    invoices1.push({ "id": 2, "number": "004443", "date": "18/11/2017", "detail": 1, "nick" : "Master Alimentos", "items" : [] });

    invoices2.push({ "id": 3, "number": "004444", "date": "20/11/2017", "detail": 2, "nick" : "Master Alimentos", "items" : [] });

    invoicesR.push({ "id": 6, "number": "004438", "date": "20/10/2017", "detail": 3, "nick" : "Master Alimentos", "items" : [] });
    invoicesR.push({ "id": 7, "number": "004436", "date": "18/10/2017", "detail": 3, "nick" : "Master Alimentos", "items" : [] });

    this.invoices1 = invoices1;
    this.invoices2 = invoices2;
    this.invoicesR = invoicesR;

    let items: Array<Item> = [];
    
    this.item = new Item();
    this.item.id = 24147;
    this.item.code = "19261";
    this.item.description = "FUBA MIMOSO SINHA FINO 500G *REC09)*****";
    this.item.detail = 1;
    this.item.barcode = '7896473410599';
    this.item.weight = 'N';

    for(let i=0; i<5; i++) {
      items.push(this.item);
    }

    this.items = items;
  }

}


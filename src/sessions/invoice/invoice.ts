import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Invoice } from '../../models/invoice/invoice';

@Injectable()
export class InvoiceSession {

  invoices: Array<Invoice>;

  constructor() {
  }

  clear() {
    this.invoices = [];
  }

  getInvoices() {
    return this.invoices;
  }

  loadTestInvoices() {
    let invoices: Array<Invoice> = [];

    invoices.push({ "id": 1, "number": "004445", "date": "25/11/2017", "status": "P1", "items" : [] });
    invoices.push({ "id": 2, "number": "004444", "date": "20/11/2017", "status": "R", "items" : [] });
    invoices.push({ "id": 3, "number": "004442", "date": "09/11/2017", "status": "P1", "items" : [] });
    invoices.push({ "id": 4, "number": "004440", "date": "01/11/2017", "status": "P2", "items" : [] });
    this.invoices = invoices;
  }

}


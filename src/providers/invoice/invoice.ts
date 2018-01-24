import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalDefinitions } from '../../app/definitions';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';

/*
  Generated class for the ItemProvider provider  shoppings(arg0: any): any {
    throw new Error("Method not implemented.");
   save_item_recount(arg0: any): any {
    throw new Error("Method not implemented.");
  }
 }
.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/ 

@Injectable()
export class InvoiceProvider {

  constructor(public http: Http) {
  }

  invoices() {
    var url = GlobalDefinitions.server_url + "/invoices.json?key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  search_item(barcode: String, invoiceId: Number) {
    var url = GlobalDefinitions.server_url + "/invoice/search-item.json?barcode=" + barcode + "&invoiceId=" + invoiceId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  save_item(dto: InvoiceItem, detail: Number) {
    var url = GlobalDefinitions.server_url + "/invoice/save-pointing.json?itemId=" + dto.itemId + "&invoiceId=" + dto.invoiceId + "&qty=" + dto.qty + "&validate=" + dto.validate + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  save_item_recount(dto: InvoiceItem) {
    var url  = GlobalDefinitions.server_url + "/invoice/save-repointing.json?itemId=" + dto.itemId + "&invoiceId=" + dto.invoiceId + "&qty=" + dto.qty + "&validate=" + dto.validate + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  save_notfound_item(invoiceId: Number, description: string, qty: Number, validate: string, observation: string) {
    var url = GlobalDefinitions.server_url + "/invoice/save-notfound.json?invoiceId=" + invoiceId + "&description=" + description + "&qty=" + qty + "&validate=" + validate + "&observation=" + observation + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }
  
  save_observation(invoiceId: Number, observation: string) {
    var url = GlobalDefinitions.server_url + "/invoice/save-observation.json?invoiceId=" + invoiceId + "&observation=" + observation + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  invoice_finalize(invoiceId: Number) {
    var url = GlobalDefinitions.server_url + "/invoice/finalize.json?invoiceId=" + invoiceId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  invoice_items(invoiceId: Number) {
    var url = GlobalDefinitions.server_url + "/invoiceitems.json?invoiceId=" + invoiceId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }
}

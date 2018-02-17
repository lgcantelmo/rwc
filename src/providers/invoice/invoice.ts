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

  completed_invoice(dto: InvoiceItem) {
    var url = GlobalDefinitions.server_url + "/invoice/completed-invoice.json?itemId=" + dto.itemId + "&invoiceId=" + dto.invoiceId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  save_item(dto: InvoiceItem) {
    var url = GlobalDefinitions.server_url + "/invoice/save-pointing.json?itemId=" + dto.itemId + "&invoiceId=" + dto.invoiceId + "&userId=" + dto.userId + "&qty=" + dto.getFinalQty() + "&validate=" + dto.validate + "&sendCount2=" + dto.sendCount2 + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  save_item_recount(dto: InvoiceItem) {
    var url  = GlobalDefinitions.server_url + "/invoice/save-repointing.json?itemId=" + dto.itemId + "&invoiceId=" + dto.invoiceId + "&userId=" + dto.userId + "&qty=" + dto.getFinalQty() + "&validate=" + dto.validate + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  save_notfound_item(dto: InvoiceItem, description: string) {
    var url = GlobalDefinitions.server_url + "/invoice/save-notfound.json?invoiceId=" + dto.invoiceId + "&description=" + description + "&qty=" + dto.getFinalQty() + "&validate=" + dto.validate + "&key=" + GlobalDefinitions.private_key;
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

  weight_items(invoiceId: Number) {
    var url = GlobalDefinitions.server_url + "/weight-items.json?invoiceId=" + invoiceId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  save_observation_item(itemId: Number, invoiceId: Number, observation: string): any {
     var url = GlobalDefinitions.server_url + "/invoice/save-observation-item.json?itemId=" + itemId + "&invoiceId=" + invoiceId + "&observation=" + observation + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }
}

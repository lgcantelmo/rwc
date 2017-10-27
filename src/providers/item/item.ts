import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalDefinitions } from '../../app/definitions';

/*
  Generated class for the ItemProvider provider  shoppings(arg0: any): any {
    throw new Error("Method not implemented.");
  }
.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {

  constructor(public http: Http) {
  }

  search(barcode: string) {

    var url = GlobalDefinitions.server_url + "/item/search.json?barcode=" + barcode + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  orders(itemId: string) {
    var url = GlobalDefinitions.server_url + "/item/orders.json?itemId=" + itemId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  shoppings(itemId: string) {
    var url = GlobalDefinitions.server_url + "/item/shoppings.json?itemId=" + itemId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  sales(itemId: string) {
    var url = GlobalDefinitions.server_url + "/item/sales.json?itemId=" + itemId + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

}

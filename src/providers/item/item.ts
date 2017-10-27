import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  private server_url: string = "http://192.168.1.5:8085/recobase";
  private private_key: string = "457e6a233a52302534727d4f28";

  constructor(public http: Http) {
  }

  search(barcode: string) {
    var url = this.server_url + "/item/search.json?barcode=" + barcode + "&key=" + this.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  purchases(itemId: Number) {
    var url = this.server_url + "/item/purchases.json?itemId=" + itemId + "&key=" + this.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  shoppings(itemId: Number) {
    var url = this.server_url + "/item/shoppings.json?itemId=" + itemId + "&key=" + this.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

}

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
export class InvoiceProvider {

  constructor(public http: Http) {
  }

  invoices() {
    var url = GlobalDefinitions.server_url + "/invoices.json?key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

}

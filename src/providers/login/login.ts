import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  private server_url: string = "http://192.168.1.5:8085/recobase";
  private private_key: string = "457e6a233a52302534727d4f28";

  constructor(public http: Http) {
  }

  login(login: string, password: string) {
    var url = this.server_url + "/login.json?login=" + login + "&password=" + password + "&key=" + this.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  testGet(login: string) {
    return this.http.get(this.server_url + "/test.json?login=" + login);
  }

  testPost(login: string) {
    return this.http.post(this.server_url + "/test.json?login=" + login, JSON.stringify({}));
  }

  testPost2(login: string, password: string) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Content-Type", 'application/json');
      headers.append("Accept", 'application/json');

      var params = {
        "req.login": login,
        "req.password": "123",
        "req.key": this.private_key
      }

      this.http.post(this.server_url + "/test2.json", JSON.stringify(params), { headers: headers })
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

}

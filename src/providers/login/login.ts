import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalDefinitions } from '../../app/definitions';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: Http) {
  }

  login(login: string, password: string) {
    var url = GlobalDefinitions.server_url +  "/login.json?login=" + login + "&password=" + password + "&key=" + GlobalDefinitions.private_key;
    return this.http.post(url, JSON.stringify({}));
  }

  testGet(login: string) {
    return this.http.get(GlobalDefinitions.server_url + "/test.json?login=" + login);
    /*return this.http.get(GlobalDefinitions.server_url + "/test-get.json?param=123");*/
  }

  testPost(login: string) {
    return this.http.post(GlobalDefinitions.server_url + "/test.json?login=" + login, JSON.stringify({}));
    /*return this.http.post(GlobalDefinitions.server_url + "/test-post.json?temperature=10&pressure=20&rpm=30&failure=aqui", JSON.stringify({}));*/
  }

}

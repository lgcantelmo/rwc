import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { User } from '../../models/user/user';

@Injectable()
export class UserSession {

  private user: User; 
  private testing: boolean = false;

  constructor(private storage: Storage) {
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  login(user: User) {
    this.storage.set('user.login', user.login);
    this.storage.set('user.name', user.name);

    this.user = user;
  }

  logout() {
    this.storage.remove('user.login');
    this.storage.remove('user.name');

    this.user = null;
    this.testing = false;
  }

  setTestMode() {
    this.testing = true;
  }

  isTesting() {
    return this.testing;
  }
}

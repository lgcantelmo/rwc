import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { User } from '../../models/user/user';
import { ItemSession } from '../item/item';

@Injectable()
export class UserSession {

  private user: User; 
  private testing: boolean = false;

  constructor(private storage: Storage, private itemSession: ItemSession) {
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  login(user: User) {
    this.storage.set('user.id', user.id);
    this.storage.set('user.login', user.login);
    this.storage.set('user.name', user.name);
    this.storage.set('user.password', user.password);

    this.user = user;
  }

  logout() {    
    this.storage.remove('user.id');
    this.storage.remove('user.login');
    this.storage.remove('user.name');
    this.storage.remove('user.password');

    this.itemSession.clear();
    
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

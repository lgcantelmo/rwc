import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { SearchItemPage } from '../pages/search-item/search-item';
import { InventoryPage } from '../pages/inventory/inventory';
import { InvoicesPage } from '../pages/invoices/invoices';
import { LoginPage } from '../pages/login/login';

import { UserSession } from '../sessions/user/user';
import { User } from '../models/user/user';
import { GlobalDefinitions } from './definitions';

@Component({
  templateUrl: 'app.html',
  providers: [
    UserSession
  ]
})
export class RWC {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = LoginPage;
  version: string = GlobalDefinitions.version;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    private userSession: UserSession) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.loadUser();
    this.loadConfig();
  }

  private loadUser() {
    let user: User = new User();

    this.storage.get('user.login').then((val) => {
      if (val == null) {
        this.userSession.setUser(null);
        return;
      }

      user.login = val;

      this.storage.get('user.name').then((val) => {
        if (val == null)
          val = "";

        user.name = val;

        this.storage.get('user.id').then((val) => {
          if (val == null)
            val = "";
  
          user.id = Number(val);

          this.userSession.setUser(user);
          this.nav.setRoot(HomePage);
        });
      });
    });
  }

  private loadConfig() {
    this.storage.get('server_url').then((val) => {
      if (val == null) 
        return;
    
      GlobalDefinitions.server_url = val;
    });
  }

  goToHome() {
    this.nav.setRoot(HomePage);
  }

  goToSearchItem() {
    this.nav.setRoot(SearchItemPage);
  }

  goToInventory() {
    this.nav.setRoot(InventoryPage);
  }

  goToInvoices() {
    this.nav.setRoot(InvoicesPage);
  }

  logout() {
    this.userSession.logout();
    this.nav.setRoot(LoginPage);
  }

}

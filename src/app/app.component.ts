import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { SearchItemPage } from '../pages/search-item/search-item';
import { InventoryPage } from '../pages/inventory/inventory';
import { ReceiptPage } from '../pages/receipt/receipt';
import { LoginPage } from '../pages/login/login';
import { UserSession } from '../sessions/user/user';
import { User } from '../models/user/user';

@Component({
  templateUrl: 'app.html',
  providers: [
    UserSession
  ]
})
export class RWC {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = SearchItemPage;
  rootPage: any = LoginPage;

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

    //-> recuperar a url do servidor do storage e setar na configProvider
    //-> se tiver algum config salvo, atualizo os dados do definitions.js
  }

  private loadUser() {

    let user: User = new User();

    this.storage.get('user.login').then((val) => {
      if(val == null) {
        this.userSession.setUser(null);
        return;
      }

      user.login = val;

      this.storage.get('user.name').then((val) => {
        if(val == null) 
          val = "";
        
        user.name = val;
        this.userSession.setUser(user);

        this.nav.setRoot(HomePage);
      });
      
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

  goToReceipt() {
    this.nav.setRoot(ReceiptPage);
  }

  logout() {
    this.userSession.logout();
    this.nav.setRoot(LoginPage);
  }
}

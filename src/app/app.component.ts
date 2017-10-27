import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SearchItemPage } from '../pages/search-item/search-item';
import { InventoryPage } from '../pages/inventory/inventory';
import { ReceiptPage } from '../pages/receipt/receipt';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class RWC {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SearchItemPage;
  //rootPage: any = LoginPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    //-> recuperar o user do storage e seta no loginProvider
    //-> recuperar a url do servidor do storage e setar na configProvider
    //-> se tiver algum config salvo, atualizo os dados do definitions.js
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
    this.nav.setRoot(LoginPage);
  }
}

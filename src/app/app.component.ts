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
  }

  goToHome(params){
    if (!params) params = {};
    this.nav.setRoot(HomePage);
  }

  goToSearchItem(params){
    if (!params) params = {};
    this.nav.setRoot(SearchItemPage);
  }

  goToInventory(params){
    if (!params) params = {};
    this.nav.setRoot(InventoryPage);
  }

  goToReceipt(params){
    if (!params) params = {};
    this.nav.setRoot(ReceiptPage);
  }

  logout(params){
    if (!params) params = {};
    this.nav.setRoot(LoginPage);
  }
}

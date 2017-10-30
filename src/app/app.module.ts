import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { RWC } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchItemPage } from '../pages/search-item/search-item';
import { ItemPage } from '../pages/item/item';
import { OrderPage } from '../pages/order/order';
import { OrdersPage } from '../pages/orders/orders';
import { ShoppingPage } from '../pages/shopping/shopping';
import { ShoppingsPage } from '../pages/shoppings/shoppings';
import { SalesPage } from '../pages/sales/sales';
import { InventoryPage } from '../pages/inventory/inventory';
import { ReceiptPage } from '../pages/receipt/receipt';
import { LoginPage } from '../pages/login/login';
import { ConfigPage } from '../pages/config/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';

import { ItemSession } from '../sessions/item/item';
import { GlobalDefinitions } from './definitions';

@NgModule({
  declarations: [
    RWC,
    HomePage,
    SearchItemPage,
    ItemPage,
    OrderPage,
    OrdersPage,
    ShoppingPage,
    ShoppingsPage,
    SalesPage,
    InventoryPage,
    ReceiptPage,
    LoginPage,
    ConfigPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(RWC),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RWC,
    HomePage,
    SearchItemPage,
    ItemPage,
    OrderPage,
    OrdersPage,
    ShoppingPage,
    ShoppingsPage,
    SalesPage,
    InventoryPage,
    ReceiptPage,
    LoginPage,
    ConfigPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalDefinitions,
    ItemSession
  ]
})
export class AppModule {
}

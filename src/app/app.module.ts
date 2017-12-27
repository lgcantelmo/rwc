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
import { EntryPage } from '../pages/entry/entry';
import { InvoicesPage } from '../pages/invoices/invoices';
import { LoginPage } from '../pages/login/login';
import { ConfigPage } from '../pages/config/config';
import { RecountsPage } from '../pages/recounts/recounts';
import { RecountPage } from '../pages/recount/recount';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalDefinitions } from './definitions';
import { ItemSession } from '../sessions/item/item';
import { InvoiceSession } from '../sessions/invoice/invoice';
import { UserSession } from '../sessions/user/user';

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
    RecountPage,
    RecountsPage,
    SalesPage,
    InventoryPage,
    EntryPage,
    InvoicesPage,
    LoginPage,
    ConfigPage
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
    RecountPage,
    RecountsPage,
    SalesPage,
    InventoryPage,
    EntryPage,
    InvoicesPage,
    LoginPage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalDefinitions,
    ItemSession,
    InvoiceSession,
    UserSession
  ]
})
export class AppModule {
}

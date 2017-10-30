import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { Sale } from '../../models/sale/sale';

@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
  providers: [
    ItemProvider
  ]
})
export class SalesPage {

  units: Array<string>;
  sales: Array<Sale>;

  constructor(
    public nav: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession) {
  }

  ionViewCanEnter() {

    this.sales = this.itemSession.getItem().sales;

    if (this.sales.length != 0)
      return;

    this.searchSales();
  }

  private searchSales() {

    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    let itemId = this.itemSession.getItem().id;
    this.itemProvider.sales(itemId).subscribe(
      data => {
        loading.dismiss();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }

        this.itemSession.getItem().sales = response.groupedSales;

        this.units = response.units;

        if(this.units.length != 0)
          this.loadSales(this.units[0]);
      },
      error => {
        loading.dismiss();
        this.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  }

  private loadSales(unit: string) {

    this.sales = [];

    let allSales = this.itemSession.getItem().sales;

    if (allSales.length == 0 || unit == null)
      return;

    for (let i = 0; i < allSales.length; i++) {
      if (allSales[i].unit == unit) {
        this.sales.push(allSales[i]);
      }
    }
  }

  returnToItem() {
    this.nav.push(ItemPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
  }

  presentToast(msg: string, type: string, log?: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'botton',
      cssClass: type
    });

    toast.onDidDismiss(() => {
      console.log(log);
    });

    toast.present();
  }
}

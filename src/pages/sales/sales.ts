import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { Sale } from '../../models/sale/sale';
import { UserSession } from '../../sessions/user/user';
import { GlobalView } from '../../app/global.view';

@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
  providers: [
    ItemProvider
  ]
})
export class SalesPage {

  sales: Array<Sale>;

  constructor(
    public nav: NavController,
    private global: GlobalView,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession,
    private userSession: UserSession) {
  }

  ionViewCanEnter() {

    this.sales = this.itemSession.getItem().sales;

    if (this.sales.length != 0)
      return;

    if (this.userSession.isTesting()) {
      this.itemSession.loadTestSales();
      this.sales = this.itemSession.getItem().sales;
    }
    else {
      this.searchSales();
    }
  }

  private searchSales() {

    this.global.waitingProcess();

    let itemId = this.itemSession.getItem().id;
    this.itemProvider.sales(itemId).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.sales = response.sales;
        this.itemSession.getItem().sales = response.sales;

      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  }

  returnToItem() {
    this.nav.push(ItemPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
  }

}

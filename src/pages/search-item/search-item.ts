import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { UserSession } from '../../sessions/user/user';

@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html',
  providers: [
    ItemProvider
  ]
})
export class SearchItemPage {

  @ViewChild('input') barcodeInput;
  barcode: string = "";

  constructor(
    public nav: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession,
    private userSession: UserSession) {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.barcodeInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  searchItem() {
    if (this.barcode == "") {
      this.presentToast("Informe o código de barras primeiro", 'error');
      this.barcodeInput.setFocus();
      return;
    }

    if (this.userSession.isTesting()) {
      this.itemSession.loadTestItem();
      this.nav.push(ItemPage);
    }

    else {
      const loading = this.loadingCtrl.create({ content: "Aguarde..." });
      loading.present();

      this.itemProvider.search(this.barcode).subscribe(
        data => {
          loading.dismiss();

          const response = JSON.parse((data as any)._body);
          if (response.ok == false) {
            this.presentToast(response.msg, 'error');
            return;
          }

          this.itemSession.setItem(response.item);
          this.nav.push(ItemPage);
        },
        error => {
          loading.dismiss();
          this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
          this.barcodeInput.setFocus();
        }
      );
    }

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


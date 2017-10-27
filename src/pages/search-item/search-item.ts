import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';

@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html',
  providers: [
    ItemProvider
  ]
})
export class SearchItemPage {

  barcode: string = "7896102502947";

  constructor(
    public nav: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession) {
  }
  
  pressEnter(ev) {
    console.log(ev.target.value);
    // -> se for tecla ENTER chama searchItem
  }

  searchItem() {

    if (this.barcode == "") {
      this.presentToast("Informe o código de barras primeiro", 'error');
      return;
    }

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
      }
    );

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


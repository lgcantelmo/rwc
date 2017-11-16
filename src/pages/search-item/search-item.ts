import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { UserSession } from '../../sessions/user/user';
import { Item } from '../../models/item/item';

@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html',
  providers: [
    ItemProvider
  ]
})
export class SearchItemPage {

  @ViewChild('barcodeInput') barcodeInput;
  @ViewChild('queryInput') queryInput;
  barcode: string = "";
  items: Array<Item>;
  showBarcodeDiv: boolean;

  constructor(
    public nav: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private itemProvider: ItemProvider,
    private itemSession: ItemSession,
    private userSession: UserSession) {      
  }

  ionViewWillEnter() {
    
    this.showBarcodeDiv = this.itemSession.isShowBarcodeDiv();

    if(this.showBarcodeDiv) {
      setTimeout(() => {
        this.barcodeInput.setFocus();
      }, 150);
    }
    else {
      this.items = this.itemSession.getItems();
      this.queryInput.setFocus();
    }

  }

  changeBarcodeDiv() {

    if(this.showBarcodeDiv)
      this.barcodeInput.setFocus();
    else
      this.queryInput.setFocus();

    this.itemSession.setShowBarcodeDiv(this.showBarcodeDiv);

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

  searchItems(event) {
    
    let query = event.target.value;
    if (query == "") {
      this.presentToast("Informe uma descrição/código primeiro", 'error');
      return;
    }

    if (this.userSession.isTesting()) {
      this.itemSession.loadTestItems();
      this.items = this.itemSession.getItems();
    }

    else {
      const loading = this.loadingCtrl.create({ content: "Aguarde..." });
      loading.present();

      this.itemProvider.searchDetail(query).subscribe(
        data => {
          loading.dismiss();

          const response = JSON.parse((data as any)._body);
          if (response.ok == false) {
            this.presentToast(response.msg, 'error');
            return;
          }

          this.items = response.items;
          this.itemSession.setItems(response.items);
        },
        error => {
          loading.dismiss();
          this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
        }
      );
    }
  }

  goToItem(itemId: Number) {
    
    let item = null;

    for (let i = 0; i < this.items.length; i++) {
      let loaded = this.items[i];
      if (loaded.id == itemId) {
        item = loaded;
        break;
      }
    }

    this.itemSession.setItem(item);
    this.nav.push(ItemPage);
  }
}



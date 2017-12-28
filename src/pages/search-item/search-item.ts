import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';
import { ItemProvider } from '../../providers/item/item';
import { ItemSession } from '../../sessions/item/item';
import { UserSession } from '../../sessions/user/user';
import { Item } from '../../models/item/item';
import { GlobalView } from '../../app/global.view';

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
    private global: GlobalView,
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
      this.global.presentToast("Informe o código de barras primeiro", 'error');
      this.barcodeInput.setFocus();
      return;
    }

    if (this.userSession.isTesting()) {
      this.itemSession.loadTestItem();
      this.nav.push(ItemPage);
    }

    else {
      this.global.waitingProcess();

      while(this.barcode.length < 13) 
        this.barcode = "0" + this.barcode;

      this.itemProvider.search(this.barcode).subscribe(
        data => {
          this.global.finalizeProcess();

          const response = JSON.parse((data as any)._body);
          if (response.ok == false) {
            this.global.presentToast(response.msg, 'error');
            return;
          }

          this.itemSession.setItem(response.item);
          this.nav.push(ItemPage);
        },
        error => {
          this.global.finalizeProcess();
          this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
          this.barcodeInput.setFocus();
        }
      );
    }

  }

  searchItems(event) {
    
    let query = event.target.value;
    if (query == "") {
      this.global.presentToast("Informe uma descrição/código primeiro", 'error');
      return;
    }

    if (this.userSession.isTesting()) {
      this.itemSession.loadTestItems();
      this.items = this.itemSession.getItems();
    }

    else {
      this.global.waitingProcess();

      query = query.toUpperCase();
      
      this.itemProvider.searchDetail(query).subscribe(
        data => {
          this.global.finalizeProcess();

          const response = JSON.parse((data as any)._body);
          if (response.ok == false) {
            this.global.presentToast(response.msg, 'error');
            return;
          }

          this.items = response.items;
          this.itemSession.setItems(response.items);
        },
        error => {
          this.global.finalizeProcess();
          this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
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



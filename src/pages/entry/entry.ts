import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoicesPage } from '../invoices/invoices';

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html'
})
export class EntryPage {
  
  @ViewChild('barcodeInput') barcodeInput;

  barcode: string = "";
  descriptionItem: String = "";
  loadedItem: boolean = false;
  countPerBox: boolean = false;
  boxQty: Number;
  unitQty: Number;
  validate: String;

  minYear: Number;
  maxYear: Number;

  private bean: InvoiceItem = new InvoiceItem();

  constructor(public nav: NavController, 
    private param: NavParams,
    private toastCtrl: ToastController,
    private userSession: UserSession) {
      let now = new Date();
      this.minYear = now.getFullYear();
      this.maxYear = now.getFullYear() + 5;
  }

  ionViewCanEnter() {
    this.bean.invoiceId = this.param.get('invoiceId');
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
    
    if(this.userSession.isTesting()) {
      this.descriptionItem = "FUBA MIMOSO SINHA FINO 500G **";
      this.loadedItem = true;
      return;
    }

  }

  restartView() {
    this.loadedItem = false;
    this.unitQty = null;
    this.boxQty = null;
    this.validate = null;
    this.barcode = "";
    this.descriptionItem = "";
  }

  saveItem() {
   
    if(this.userSession.isTesting()) {
        this.restartView();
        this.presentToast("Operação salva com sucesso!", 'success');
        return;
    }

    // envia para o servidor
    this.restartView();
  }

  closeInvoice () {
    if(this.userSession.isTesting()) {
      this.nav.setRoot(InvoicesPage);
      this.presentToast("Nota finalizada com sucesso!", 'success');
      return;
    }

    // finaliza a nota no servidor
  }

  returnToInvoices () {
    this.nav.setRoot(InvoicesPage);
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

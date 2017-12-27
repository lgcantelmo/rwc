import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoicesPage } from '../invoices/invoices';
import { Item } from '../../models/item/item';
import { RecountsPage } from '../recounts/recounts';

@Component({
  selector: 'page-recount',
  templateUrl: 'recount.html'
})
export class RecountPage {
  
  @ViewChild('barcodeInput') barcodeInput;

  countPerBox: boolean = false;
  boxQty: Number;
  unitQty: Number;
  validate: String;

  minYear: Number;
  maxYear: Number;

  public item: Item;
  private bean: InvoiceItem = new InvoiceItem();
  
  constructor(public nav: NavController, 
    private param: NavParams,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private userSession: UserSession) {
      let now = new Date();
      this.minYear = now.getFullYear();
      this.maxYear = now.getFullYear() + 5;
  }

  ionViewCanEnter() {
    this.item = this.param.get('item');
    this.bean.invoiceId = this.param.get('invoiceId');
    this.bean.itemId = this.item.id;
  }    

  saveItem() {

    // validation
    if(this.validateForm())
      return;

    if(this.countPerBox && this.boxQty == null) {
      this.presentToast("Qtd. por caixa é obrigatória!", 'error');
      return;
    }
   
    if(this.userSession.isTesting()) {
        this.presentToast("Operação salva com sucesso!", 'success');
        this.returnToItems();
        return;
    }

    // envia para o servidor
    this.returnToItems();
  }

  returnToItems () {
    this.nav.push(RecountsPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 2;
        this.nav.remove(startIndex, 2);
      });
  }

  presentToast(msg: string, type: string, log?: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'botton',
      cssClass: type
    });

    toast.present();
  }

  validateForm() {
    let error = false;

    if(this.unitQty == null) {
      error = true; 
      // add class error in field
    }
    
    if(this.validate == null){
      error = true; 
      // add class error in field
    }
    
    if(this.countPerBox && this.boxQty == null){
      error = true; 
      // add class error in field
    }
    
    if(error)
      this.presentToast("Campos obrigatórios!", 'error');

    return error;
  }

  closeInvoice () {    
    let prompt = this.alertCtrl.create({
      title: 'Atenção!',
      message: "Gostaria de finalizar a nota?",
      buttons: [
        {
          text: 'Não',
          handler: data => {
          }
        },
        {
          text: 'SIM',
          handler: data => {

            if(this.userSession.isTesting()) {
              this.nav.setRoot(InvoicesPage);
              this.presentToast("Nota finalizada com sucesso!", 'success');
              return;
            }

            // finaliza a nota no servidor
          }
        }
      ]
    });
    prompt.present();
  }

  saveObservation () {    
    let prompt = this.alertCtrl.create({
      title: 'Registrar Observações!',
      inputs: [
        {
          label: "Observações",
          value: ""
        }
        ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            // salva a observação no servidor
            console.log(data[0]);

            this.presentToast("Observação registrada com sucesso!", 'success');
            return;
          }
        }
      ]
    });
    prompt.present();
  }
    
}

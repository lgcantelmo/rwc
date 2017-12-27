import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
    private alertCtrl: AlertController,
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

      if(this.barcode == "xxx") {
        this.saveNotFoundItem();
        return;
      }

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

    // validation
    if(this.validateForm())
      return;

    if(this.countPerBox && this.boxQty == null) {
      this.presentToast("Qtd. por caixa é obrigatória!", 'error');
      return;
    }
   
    if(this.userSession.isTesting()) {
        this.restartView();
        this.presentToast("Operação salva com sucesso!", 'success');
        return;
    }

    // envia para o servidor
    this.restartView();
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
    
  saveNotFoundItem () {    
    let prompt = this.alertCtrl.create({
      title: 'Item não encontrado!',
      inputs: [
        {
          placeholder: "Descrição",
          value: ""
        },
        {
          placeholder: "Quantidade",
          value: "",
          type: "number"
        },
        {
          placeholder: "Validade",
          value: "",
          type: "date"
        },
        {
          placeholder: "Observações",
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
            // salva o item no servidor
            console.log(data[0]);
            console.log(data[1]);
            console.log(data[2]);
            console.log(data[3]);

            this.presentToast("Item registrado com sucesso!", 'success');
            return;
          }
        }
      ]
    });
    prompt.present();
  }   

}

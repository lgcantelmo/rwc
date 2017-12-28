import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoicesPage } from '../invoices/invoices';
import { RecountsPage } from '../recounts/recounts';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { GlobalView } from '../../app/global.view';

@Component({
  selector: 'page-recount',
  templateUrl: 'recount.html',
  providers: [
    InvoiceProvider
  ]
})
export class RecountPage {
  
  @ViewChild('barcodeInput') barcodeInput;

  description: String = "";
  countPerBox: boolean = false;
  boxQty: Number;
  unitQty: Number;
  validate: string;

  minYear: Number;
  maxYear: Number;

  private dto: InvoiceItem = new InvoiceItem();
  
  constructor(public nav: NavController, 
    private param: NavParams,
    private global: GlobalView,
    private alertCtrl: AlertController,
    private userSession: UserSession,
    private invoiceProvider: InvoiceProvider) {
      let now = new Date();
      this.minYear = now.getFullYear();
      this.maxYear = now.getFullYear() + 10;
  }

  ionViewCanEnter() {
    let item = this.param.get('item');
    this.dto.invoiceId = this.param.get('invoiceId');
    this.dto.itemId = item.id;
    this.description = item.description;
  }    

  saveItem() {

    // validation
    if(this.validateForm())
      return;

    if(this.countPerBox && this.boxQty == null) {
      this.global.presentToast("Qtd. por caixa é obrigatória!", 'error');
      return;
    }
   
    if(this.userSession.isTesting()) {
        this.global.presentToast("Apontamento salvo com sucesso!", 'success');
        this.returnToItems();
        return;
    }

    // envia para o servidor
    this.global.waitingProcess();

    let qty: Number = 0;
    if(this.countPerBox) 
      qty = Number(this.boxQty) * Number(this.unitQty);
    else
      qty = Number(this.unitQty);

    this.dto.qty = qty;
    this.dto.validate = this.validate;

    this.invoiceProvider.save_item( this.dto ).subscribe(
      data => {

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        if (response.finalized == false) {
          this.global.presentToast("Apontamento salvo com sucesso!", 'success');
          this.returnToItems();
        }
        else {
          this.global.presentToast("Apontamento salvo e nota finalizada!", 'success');
          this.nav.setRoot(InvoicesPage);
        }
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  }

  returnToItems () {
    this.nav.push(RecountsPage)
      .then(() => {
        const startIndex = this.nav.getActive().index - 2;
        this.nav.remove(startIndex, 2);
      });
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
      this.global.presentToast("Campos obrigatórios!", 'error');

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
              this.global.presentToast("Nota finalizada com sucesso!", 'success');
              return;
            }

            // finaliza a nota no servidor
            this.global.waitingProcess();

            this.invoiceProvider.invoice_finalize( this.dto.invoiceId ).subscribe(
              data => {
        
                const response = JSON.parse((data as any)._body);
                if (response.ok == false) {
                  this.global.presentToast(response.msg, 'error');
                  return;
                }
                        
                this.nav.setRoot(InvoicesPage);
                this.global.presentToast("Nota finalizada com sucesso!", 'success');
              },
              error => {
                this.global.finalizeProcess();
                this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }

  saveObservation () {    
    let prompt = this.alertCtrl.create({
      title: 'Registrar observação',
      inputs: [
        {
          label: "Observação",
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
            
            let observation = data[0];
            if( observation.length == 0 ) {
              this.global.presentToast("Observação obrigatória", 'error');
              return;
            }

            // envia para o servidor
            this.global.waitingProcess();

            this.invoiceProvider.save_observation( this.dto.invoiceId, observation ).subscribe(
              data => {
                this.global.finalizeProcess();
        
                const response = JSON.parse((data as any)._body);
                if (response.ok == false) {
                  this.global.presentToast(response.msg, 'error');
                  return;
                }
        
                this.restartView();
                this.global.presentToast("Observação salva com sucesso!", 'success');
              },
              error => {
                this.global.finalizeProcess();
                this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }

  restartView() {
    this.unitQty = null;
    this.boxQty = null;
    this.validate = null;
  }

}

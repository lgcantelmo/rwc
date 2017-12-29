import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoicesPage } from '../invoices/invoices';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { GlobalView } from '../../app/global.view';

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
  providers: [
    InvoiceProvider
  ]
})
export class EntryPage {
  
  @ViewChild('barcodeInput') barcodeInput;

  barcode: string = "";
  description: String = "";
  loadedItem: boolean = false;
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
    this.dto.invoiceId = this.param.get('invoiceId');
  }    

  ionViewWillEnter() {
    setTimeout(() => {
      this.barcodeInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  restartView() {
    this.loadedItem = false;
    this.unitQty = null;
    this.boxQty = null;
    this.validate = null;
    this.barcode = "";
    this.description = "";
    this.barcodeInput.setFocus();
  }

  searchItem() {

    if (this.barcode == "") {
      this.global.presentToast("Informe o código de barras primeiro", 'error');
      this.barcodeInput.setFocus();
      return;
    }

    this.unitQty = null;
    this.boxQty = null;
    this.validate = null;
    
    if(this.userSession.isTesting()) {
      if(this.barcode == "xxx") {
        this.saveNotFoundItem();
        return;
      }
      this.description = "FUBA MIMOSO SINHA FINO 500G **";
      this.loadedItem = true;
      return;
    }

    this.global.waitingProcess();

    while(this.barcode.length < 13) 
        this.barcode = "0" + this.barcode;

    this.invoiceProvider.search_item(this.barcode, this.dto.invoiceId).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {

          if (response.showModalNotFound == true) {
            this.saveNotFoundItem();
            return;
          }

          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.dto.itemId = response.item.id;
        this.description = response.item.description;
        this.loadedItem = true;
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );

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
        this.restartView();
        this.global.presentToast("Apontamento salvo e nota finalizada!", 'success');
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
          this.global.finalizeProcess();
          this.global.presentToast(response.msg, 'error');
          return;
        }
        
        if (response.finalized == false) {
          this.global.finalizeProcess();
          this.global.presentToast("Apontamento salvo com sucesso!", 'success');
          this.restartView();
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

  returnToInvoices () {
    this.nav.setRoot(InvoicesPage);
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
        
                this.barcodeInput.setFocus();
                this.global.presentToast("Observação salva com sucesso!", 'success');
              },
              error => {
                this.global.finalizeProcess();
                this.global.presentToast('Erro inesperado! Verifique o status do servidor!!', 'error', error.error);
              }
            );
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

            let description = data[0];
            if( description.length == 0 ) {
              this.global.presentToast("Descrição obrigatória", 'error');
              return;
            }

            if(  data[1].length == 0 ) {
              this.global.presentToast("Quantidade obrigatória", 'error');
              return;
            }

            let qty: Number = Number(data[1]);
            if(  qty <= 0 ) {
              this.global.presentToast("Quantidade inválida", 'error');
              return;
            }

            let validate =  data[2];
            let observation =  data[3];

            // envia para o servidor
            this.global.waitingProcess();

            this.invoiceProvider.save_notfound_item( this.dto.invoiceId, description, qty, validate, observation ).subscribe(
              data => {
                this.global.finalizeProcess();
        
                const response = JSON.parse((data as any)._body);
                if (response.ok == false) {
                  this.global.presentToast(response.msg, 'error');
                  return;
                }
        
                this.restartView();
                this.global.presentToast("Apontamento salvo com sucesso!", 'success');
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

}

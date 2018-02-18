import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { EntryStep3Page } from '../entry3/entry3';
import { EntryEndPage } from '../entry-end/entry-end';
import { GlobalView } from '../../app/global.view';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { Invoice } from '../../models/invoice/invoice';

@Component({
  selector: 'page-entry4',
  templateUrl: 'entry4.html',
  providers: [
    InvoiceProvider
  ]
})
export class EntryStep4Page {

  private invoice: Invoice;
  private item: Item;
  private dto: InvoiceItem;

  constructor(public nav: NavController, 
    private global: GlobalView,
    private alertCtrl: AlertController,
    private invoiceSession: InvoiceSession,
    private invoiceProvider: InvoiceProvider) {
  }

  ionViewCanEnter() {    
    this.invoice = this.invoiceSession.getInvoice();    
    this.item = this.invoiceSession.getItem();
    this.dto = this.invoiceSession.getInvoiceItem();

    if(this.dto.validate == null)
      this.dto.validate = '';
  }    

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {    

    if (this.dto.validate != null && this.dto.validate.length) {
      let validate = this.dto.validate;
      if ( validate.length != 6) {
        this.global.presentToast("Validade inválida!", 'error');
        return;
      }

      let day = -1;
      let month = -1;
      let year = -1;
      try {
        day = Number(validate.substring(0,2));
        month = Number(validate.substring(2,4));
        year = Number(validate.substring(4,6)); 
      }
      catch(Exception) {
      }

      if( day < 1 || day > 31 || month < 1 || month > 12 || year < 1 ) {
        this.global.presentToast("Validade inválida!", 'error');
        return;
      }
    }
    
    this.invoiceSession.setInvoiceItem(this.dto);
    this.nav.setRoot(EntryEndPage);
  }

  return() {
    this.nav.setRoot(EntryStep3Page);
  }

  saveObservation () {    
    let prompt = this.alertCtrl.create({
      title: 'Observ. do Item!',
      inputs: [
        {
          label: "Observ. do Item",
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
              this.global.presentToast("Nenhuma observação registrada!", 'error');
              return;
            }

            // envia para o servidor
            this.global.waitingProcess();

            this.invoiceProvider.save_observation_item( this.item.id, this.invoice.id, observation ).subscribe(
              data => {
                this.global.finalizeProcess();
        
                const response = JSON.parse((data as any)._body);
                if (response.ok == false) {
                  this.global.presentToast(response.msg, 'error');
                  return;
                }
        
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
}

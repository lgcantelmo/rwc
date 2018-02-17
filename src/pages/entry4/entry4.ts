import { Component, ViewChild } from '@angular/core';
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
  
  @ViewChild('validateInput') validateInput;

  private navigate: Number;
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
    this.navigate = this.invoiceSession.getNavigate();
    this.invoice = this.invoiceSession.getInvoice();    
    this.item = this.invoiceSession.getItem();
    this.dto = this.invoiceSession.getInvoiceItem();

    if(this.dto.validate == null)
      this.dto.validate = '';
  }    

  ionViewDidEnter() {
    setTimeout(() => {
      this.validateInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {    
    this.invoiceSession.setInvoiceItem(this.dto);
    this.nav.push(EntryEndPage);
  }

  return () {
    this.nav.push(EntryStep3Page)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
  }

  saveObservation () {    
    let prompt = this.alertCtrl.create({
      title: 'Observações do Item!',
      inputs: [
        {
          label: "Observações do Item",
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

import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoicesPage } from '../invoices/invoices';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { GlobalView } from '../../app/global.view';
import { Invoice } from '../../models/invoice/invoice';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { EntryStep1Page } from '../entry1/entry1';
import { EntryStep4Page } from '../entry4/entry4';

@Component({
  selector: 'page-entry-end',
  templateUrl: 'entry-end.html',
  providers: [
    InvoiceProvider
  ]
})
export class EntryEndPage {
  
  private invoice: Invoice;
  private item: Item;
  private dto: InvoiceItem;

  constructor(public nav: NavController, 
    private global: GlobalView,
    private alertCtrl: AlertController,
    private userSession: UserSession,
    private invoiceSession: InvoiceSession,
    private invoiceProvider: InvoiceProvider) {
  }

  ionViewCanEnter() {
    this.invoice = this.invoiceSession.getInvoice();    
    this.item = this.invoiceSession.getItem();
    this.dto = this.invoiceSession.getInvoiceItem();
  }   

  save() {
    
    if(this.userSession.isTesting()) {      
      this.global.presentToast("OK! Informe o código de barras!", 'success');
      this.nav.setRoot(EntryStep1Page);
      return;
    }

    // open waiting...
    this.global.waitingProcess();

    // definindo os ids no DTO:
    this.dto.invoiceId = this.invoice.id;
    this.dto.itemId = this.item.id;
    this.dto.userId = this.userSession.getUser().id;
   
    // 1) Verificar se a nota esta encerrada
    //    -> Se sim: perguntar se deseja enviar para a segunda contagem
    //        -> Se sim: setar o flag de envio para a contagem 2 no dto e chamar o save_item(this.dto)
    //        -> senão: seta o flag para falso e chamo o save_item(this.dto)
    //    -> Senão: 
    //        -> setar null para o item e new para o dto em memória
    //        -> navego para a tela de consulta por código de barras

    this.invoiceProvider.completed_invoice( this.dto ).subscribe(
      data => {
      
        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.global.finalizeProcess();
          this.global.presentToast(response.msg, 'error');
          return;
        }

        // close waiting...
        this.global.finalizeProcess();
        
        if (response.completed) {

          let prompt = this.alertCtrl.create({
            title: 'Confirmação!',
            message: "Deseja enviar a nota para a contagem 2?",
            buttons: [
              {
                text: 'SIM',
                handler: data => {
                  this.dto.sendCount2 = true;
                  this.saveCount();
                }
              },
              {
                text: 'Não',
                handler: data => {
                  this.dto.sendCount2 = false;
                  this.saveCount();
                }
              }
            ]
          });
          prompt.present();

        }
        else {
          this.saveCount();
        }
      },
      error => {
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );

  }

  private saveCount() {

    this.global.waitingProcess();

    this.invoiceProvider.save_item( this.dto ).subscribe(
      data => {

        this.global.finalizeProcess();
      
        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }
        
        if (response.finalized) {
          // navega para a listagem de notas pendentes
          this.global.presentToast("Apontamento salvo e nota finalizada!", 'success');
          this.nav.setRoot(InvoicesPage);          
        }
        else {
          // limpa os dados da sessao 
          this.invoiceSession.setInvoiceItem(new InvoiceItem());
          this.invoiceSession.setItem(null);

          // navega para continua a contagem
          this.global.presentToast("Apontamento salvo com sucesso!", 'success');
          this.nav.setRoot(EntryStep1Page);
        }
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );

  }

  return () {
    this.nav.push(EntryStep4Page)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
  }

  saveObservation () {    
    let prompt = this.alertCtrl.create({
      title: 'Observações!',
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
    
  /*
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
  */

}

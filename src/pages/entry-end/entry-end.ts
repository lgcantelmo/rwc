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
import { RecountsPage } from '../recounts/recounts';
import { NavigatePages } from '../../app/navigate';

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
        
        if (response.completed && this.invoice.detail == 1) {

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

    let navigate = this.invoiceSession.getNavigate();
    switch( navigate ) {

      case( NavigatePages.EntryNormalCounter ) :
        this.saveItem();
      break;

      case( NavigatePages.EntryNotFoundItem ) :
        this.saveNotFoundItem();
      break;

      case( NavigatePages.EntryRecountItem ) :
        this.saveRecountItem();
      break;
    }

  }

  private saveItem() {
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
          // navega para continuar a contagem
          this.global.presentToast("Apontamento salvo com sucesso!", 'success');
          this.invoiceSession.clear();
          this.nav.setRoot(EntryStep1Page);
        }
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  }
    
  private saveNotFoundItem () {    

    this.dto.invoiceId = this.invoice.id;
    
    this.invoiceProvider.save_notfound_item( this.dto, this.item.description ).subscribe(
      data => {      
        this.global.finalizeProcess();
        
        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }

        // navega para continua a contagem
        this.global.presentToast("Apontamento salvo com sucesso!", 'success');
        this.invoiceSession.clear();
        this.nav.setRoot(EntryStep1Page);
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );
  } 

  private saveRecountItem() {
    this.invoiceProvider.save_item_recount( this.dto ).subscribe(
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
          // navega para listagem de itens a serem recontados
          this.global.presentToast("Apontamento salvo com sucesso!", 'success');
          this.invoiceSession.clear();
          this.nav.setRoot(RecountsPage);
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

            this.dto.invoiceId = this.invoice.id;

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

}

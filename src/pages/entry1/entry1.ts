import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserSession } from '../../sessions/user/user';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoicesPage } from '../invoices/invoices';
import { InvoiceProvider } from '../../providers/invoice/invoice';
import { GlobalView } from '../../app/global.view';
import { Invoice } from '../../models/invoice/invoice';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { EntryStep2Page } from '../entry2/entry2';
import { EntryNotFoundStepPage } from '../entry-notfound/entry-notfound';
import { NavigatePages } from '../../app/navigate';

@Component({
  selector: 'page-entry1',
  templateUrl: 'entry1.html',
  providers: [
    InvoiceProvider
  ]
})
export class EntryStep1Page {

  @ViewChild('barcodeInput') barcodeInput;

  barcode: string = "";

  private invoice: Invoice;

  constructor(public nav: NavController,
    private global: GlobalView,
    private userSession: UserSession,
    private invoiceSession: InvoiceSession,
    private invoiceProvider: InvoiceProvider) {
  }

  ionViewCanEnter() {
    this.invoice = this.invoiceSession.getInvoice();
    this.barcode = this.invoiceSession.getItem().barcode;
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.barcodeInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  private searchItem() {

    if (this.barcode == "") {
      this.global.presentToast("Informe o código de barras primeiro", 'error');
      this.barcodeInput.setFocus();
      return;
    }

    while (this.barcode.length < 13)
      this.barcode = "0" + this.barcode;

    if (this.userSession.isTesting()) {
      if (this.barcode == "xxx") {
        this.invoiceSession.clear();
        this.goToNotFoundItem();
        return;
      }
      this.invoiceSession.setInvoiceItem(new InvoiceItem());
      this.goToStep2();
      return;
    }

    this.global.waitingProcess();

    this.invoiceProvider.search_item(this.barcode, this.invoice.id).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);
        if (response.ok == false) {
          
          if (response.itemNotFound == true) {            
            this.invoiceSession.clear();
            this.invoiceSession.getItem().barcode = this.barcode;
            this.goToNotFoundItem();
            return;
          }

          this.global.presentToast(response.msg, 'error');
          return;
        }

        this.invoiceSession.clear();
        this.invoiceSession.setItem(response.item);
        this.goToStep2();
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );

  }

  private goToNotFoundItem() {
    this.invoiceSession.setNavigate(NavigatePages.EntryNotFoundItem);
    this.nav.push(EntryNotFoundStepPage);
  }

  private goToStep2() {
    this.nav.push(EntryStep2Page);
  }

  nextStep() {

    let navigate = this.invoiceSession.getNavigate();
    switch( navigate ) {

      case( NavigatePages.EntryNormalCounter ) :
        if( this.invoiceSession.item.id ==  -1 )
          this.searchItem();
        else
          this.goToStep2();
      break;

      case( NavigatePages.EntryNotFoundItem ) :
        this.goToNotFoundItem();
      break;
      
    }
      
  }

  return() {
    this.nav.setRoot(InvoicesPage);
  }

}
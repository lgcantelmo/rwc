import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { GlobalView } from '../../app/global.view';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { EntryStep2Page } from '../entry2/entry2';
import { EntryStep4Page } from '../entry4/entry4';

@Component({
  selector: 'page-entry3',
  templateUrl: 'entry3.html'
})
export class EntryStep3Page {
  
  @ViewChild('unitQtyInput') unitQtyInput;

  private item: Item;
  private dto: InvoiceItem;

  constructor(public nav: NavController, 
    private global: GlobalView,
    private invoiceSession: InvoiceSession) {
    }

  ionViewCanEnter() {  
    this.item = this.invoiceSession.getItem();
    this.dto = this.invoiceSession.getInvoiceItem();
  }    

  ionViewWillEnter() {
    setTimeout(() => {
      this.unitQtyInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {

    if (this.dto.unitQty == null) {
      this.global.presentToast("Qtd. por caixa é obrigatória!", 'error');
      this.unitQtyInput.setFocus();
      return;
    }
    
    this.invoiceSession.setInvoiceItem(this.dto);
    this.nav.push(EntryStep4Page);
  }

  return () {
    this.nav.push(EntryStep2Page)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
  }

}

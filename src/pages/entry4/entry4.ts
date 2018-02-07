import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { EntryStep3Page } from '../entry3/entry3';
import { EntryEndPage } from '../entry-end/entry-end';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-entry4',
  templateUrl: 'entry4.html',
  providers: [DatePipe]
})
export class EntryStep4Page {
  
  @ViewChild('validateInput') validateInput;

  private item: Item;
  private dto: InvoiceItem;

  constructor(public nav: NavController, 
    private invoiceSession: InvoiceSession,
    public datepipe: DatePipe) {
  }

  ionViewCanEnter() {    
    this.item = this.invoiceSession.getItem();
    this.dto = this.invoiceSession.getInvoiceItem();
  }    

  ionViewWillEnter() {
    setTimeout(() => {
      this.validateInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {    

    if(this.dto.validate != null) {
      let validate = this.dto.validate;
      this.dto.validate = this.datepipe.transform( validate, 'dd/MM/yyyy');
    }

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

}

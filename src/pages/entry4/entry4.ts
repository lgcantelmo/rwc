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

    if(this.dto.validate == null)
      this.dto.validate = '';
  }    

  ionViewWillEnter() {
    setTimeout(() => {
      this.validateInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  private isNumber(keyCode) {
    return (keyCode>47 && keyCode<58) || keyCode==8 || keyCode==0;
  }

  onKeyPress(keyCode)  {

    if( this.isNumber(keyCode) == false )
      return false;

    let val = this.dto.validate;
    if( val.length == 2 )
      val += '/';
    this.dto.validate = val;
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

}

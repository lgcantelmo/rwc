import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { GlobalView } from '../../app/global.view';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { EntryStep2Page } from '../entry2/entry2';
import { EntryStep4Page } from '../entry4/entry4';
import { NavigatePages } from '../../app/navigate';
import { WeightsPage } from '../weights/weights';
import { RecountsPage } from '../recounts/recounts';

@Component({
  selector: 'page-entry3',
  templateUrl: 'entry3.html'
})
export class EntryStep3Page {
  
  /*@ViewChild('unitQtyInput') unitQtyInput;*/

  private navigate: Number;
  private item: Item;
  private dto: InvoiceItem;

  constructor(public nav: NavController,
    private global: GlobalView,
    private invoiceSession: InvoiceSession) {
  }

  ionViewCanEnter() {
    this.navigate = this.invoiceSession.getNavigate();
    this.item = this.invoiceSession.getItem();
    this.dto = this.invoiceSession.getInvoiceItem();
  }

 /* ionViewLoaded() {
    setTimeout(() => {
      console.log("Init")
      this.unitQtyInput.setFocus();
    },200);
 }*/

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {

    if (this.dto.unitQty == null) {
      this.global.presentToast("Quantidade obrigatória!", 'error');
      /*this.unitQtyInput.setFocus();*/
      return;
    }
    
    this.invoiceSession.setInvoiceItem(this.dto);
    this.nav.push(EntryStep4Page);
  }

  return () {

    if( this.invoiceSession.navigate == NavigatePages.EntryWeightItem ) {
      this.nav.push(WeightsPage)
        .then(() => {
          const startIndex = this.nav.getActive().index - 1;
          this.nav.remove(startIndex, 1);
        });
    }
    else if( this.invoiceSession.navigate == NavigatePages.EntryWeigthRecountItem ) {
      this.nav.push(RecountsPage)
        .then(() => {
          const startIndex = this.nav.getActive().index - 1;
          this.nav.remove(startIndex, 1);
        });
    }
    else {
      this.nav.push(EntryStep2Page)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
    }
   
  }

}

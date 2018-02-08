import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InvoiceItem } from '../../models/invoice_item/invoice_item';
import { GlobalView } from '../../app/global.view';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { EntryStep1Page } from '../entry1/entry1';
import { EntryStep3Page } from '../entry3/entry3';
import { EntryNotFoundStepPage } from '../entry-notfound/entry-notfound';
import { RecountsPage } from '../recounts/recounts';
import { NavigatePages } from '../../app/navigate';

@Component({
  selector: 'page-entry2',
  templateUrl: 'entry2.html'
})
export class EntryStep2Page {
  
  @ViewChild('boxQtyInput') boxQtyInput;

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
      this.boxQtyInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {

    if (this.dto.boxQty == null) {
      this.global.presentToast("Qtd. de caixa é obrigatória!", 'error');
      this.boxQtyInput.setFocus();
      return;
    }
    
    this.invoiceSession.setInvoiceItem(this.dto);
    this.nav.push(EntryStep3Page);

  }

  return () {

    let navigate = this.invoiceSession.getNavigate();
    switch( navigate ) {

      case( NavigatePages.EntryNormalCounter ) :
        this.nav.push(EntryStep1Page)
          .then(() => {
            const startIndex = this.nav.getActive().index - 1;
            this.nav.remove(startIndex, 1);
          });
      break;

      case( NavigatePages.EntryNotFoundItem ) :
        this.nav.push(EntryNotFoundStepPage)
          .then(() => {
            const startIndex = this.nav.getActive().index - 1;
            this.nav.remove(startIndex, 1);
          });
      break;

      case( NavigatePages.EntryRecountItem ) :
        this.nav.push(RecountsPage)
          .then(() => {
            const startIndex = this.nav.getActive().index - 1;
            this.nav.remove(startIndex, 1);
          });
      break;
      
    }

  }

}

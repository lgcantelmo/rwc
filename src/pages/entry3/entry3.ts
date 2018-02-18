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

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {

    if (this.dto.unitQty == null) {
      this.global.presentToast("Quantidade obrigatória!", 'error');
      return;
    }
    
    this.invoiceSession.setInvoiceItem(this.dto);
    this.nav.setRoot(EntryStep4Page);
  }

  return () {

    let navigate = this.invoiceSession.getNavigate();
    switch( navigate ) {

      case( NavigatePages.EntryNormalCounter ) :
        this.nav.setRoot(EntryStep2Page);    
      break;

      case( NavigatePages.EntryNotFoundItem ) :
        this.nav.setRoot(EntryStep2Page);    
      break;

      case( NavigatePages.EntryRecountItem ) :
        if( this.item.weight != "S" )
        this.nav.setRoot(EntryStep2Page); 
        else
          this.nav.setRoot(RecountsPage);    
      break;

      case( NavigatePages.EntryWeightItem ) :
        this.nav.setRoot(WeightsPage);    
      break;
      
    }
   
  }

}

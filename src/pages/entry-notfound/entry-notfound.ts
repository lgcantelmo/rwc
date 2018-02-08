import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalView } from '../../app/global.view';
import { InvoiceSession } from '../../sessions/invoice/invoice';
import { Item } from '../../models/item/item';
import { EntryStep1Page } from '../entry1/entry1';
import { EntryStep2Page } from '../entry2/entry2';

@Component({
  selector: 'page-entry-notfound',
  templateUrl: 'entry-notfound.html'
})
export class EntryNotFoundStepPage {
  
  @ViewChild('descriptionInput') descriptionInput;

  private item: Item;

  constructor(public nav: NavController, 
    private global: GlobalView,
    private invoiceSession: InvoiceSession) {
    }

  ionViewCanEnter() { 
    this.item = this.invoiceSession.getItem();
  }    

  ionViewWillEnter() {
    setTimeout(() => {
      this.descriptionInput.setFocus();
    }, 150);
  }

  selectAll(event): void {
    event.target.select();
  }

  nextStep() {

    if (this.item.description == null) {
      this.global.presentToast("Descrição é obrigatória!", 'error');
      this.descriptionInput.setFocus();
      return;
    }
    
    this.invoiceSession.setItem(this.item);
    this.nav.push(EntryStep2Page);

  }

  return () {
    this.nav.push(EntryStep1Page)
      .then(() => {
        const startIndex = this.nav.getActive().index - 1;
        this.nav.remove(startIndex, 1);
      });
  }

}

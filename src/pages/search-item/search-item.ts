import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html'
})
export class SearchItemPage {

  constructor(public nav: NavController) {
  }

  searchItem(params) {

    // valida se tem valor digitado na caixa de texto
    // chama funcao ajax de consulta
    // se obtiver retorno positivo, passa o objeto para a controller ItemPage

    if (!params) params = {};
    this.nav.setRoot(ItemPage);
  }

  pressEnder(ev) {
    console.log(ev.target.value);
  }
}

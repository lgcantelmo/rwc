import { InvoiceItem } from '../invoice_item/invoice_item';

export class Invoice {

  /* NOTA FISCAL DE ENTRADA */

  id: Number;
  number: String;
  date: string;

  items: Array<InvoiceItem> = [];  

  constructor() {}

}
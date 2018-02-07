
export class InvoiceItem {

  /* ITEM DA NOTA FISCAL DE ENTRADA */

  invoiceId: Number;      // Id na NFENTRAD
  itemId: Number;         // Id na NFEITENS
  userId: Number;         // Id na USUARIO

  boxQty: Number;         // Qtd de caixas
  unitQty: Number;        // Qtd em cada caixa
  validate: string;

  sendCount2: boolean = false;    // flag que indica para o servidor se deve enviar a nota para a contagem 2

  constructor() {}

  getFinalQty() {
    return Number(this.boxQty) * Number(this.unitQty);
  }

}
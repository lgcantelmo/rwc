import { Shopping } from '../shopping/shopping';
import { Order } from '../order/order';
import { Sale } from '../sale/sale';

export class Item {

   /* PRODUTO */

  id: Number;
  code: string;
  description: string;
  barcode: string;
  mark: string;
  cost: string;
  gain: string;
  idealGain: string;
  price: string;
  readjustDate: string;
  readjustHour: string;
  stock: string;
  stockReserved: string;
  stockReturned: string;
  stockLoss: string;
  stockAvailable: string;
  observation: string;
  blocked: string;
  groupName: string;
  subgroupName: string;
  phase: string;

  detail: Number;

  orders: Array<Order> = [];   
  shoppings: Array<Shopping> = [];   
  sales: Array<Sale> = [];   

  constructor() {}

}
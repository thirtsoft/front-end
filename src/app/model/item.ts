import {CartOrder} from './cart-order';
import { Order } from './order';
import { RequestOrder } from './request-order';

export class Item {
  id: number;
  img: string;
  quantity: number;
  price: number;
  numero: number;
  productName: string;

  requestOrder: RequestOrder;

  order: Order;

  constructor(order: CartOrder) {
    this.img = order.img
    this.quantity = order.quantity
    this.price = order.price
    this.productName = order.name;
  }
}

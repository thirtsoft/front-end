import {Client} from './client';
import {Address} from './address';
import {RequestOrder} from './request-order';
import {Item} from './item';
import { Utilisateur } from './utilisateur';

export class PurchaseRequest {
  client: Client;
  utilisateur: Utilisateur;
/*  fromAddress: Address;
  toAddress: Address;
  */
  requestOrder: RequestOrder;
  items: Item[];
}

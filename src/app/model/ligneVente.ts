import { Order } from "./order";
import { Vente } from "./vente";

export class LigneVente {
  id: number;
  numero: number;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prixVente: number;
  total: number;

  vente: Vente;

  produit: Order;

}

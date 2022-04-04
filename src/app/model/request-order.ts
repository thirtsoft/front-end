import { Utilisateur } from "./utilisateur";

export class RequestOrder {

  id: number;
  numeroCommande: number;
  totalPrice: number;
  totalQuantity: number;
  montantReglement: number;
  typeReglement: string;
  status: string;
  
  dataCreate: Date;
  dateCommande: Date ;

  utilisateur: Utilisateur;

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { RequestOrder } from '../model/request-order';
import { Vente } from '../model/vente';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  public baseUrl = 'http://localhost:8080/api/';

  Data;
  listDataVente: any[] = [];
  listDataLigneVente: any[] = [];

 // private baseUrl = 'http://localhost:8080/alAmine';
 // private baseUrl = window["cfgApiBaseUrl"];

  choixmenu : string  = 'A';
  listData : Vente[];
  formData:  FormGroup;
  list: any={};
  vente: Vente;
  NumVente;
  idUser;
  username;

  id;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService
  ) { }

  public getAllRequestOrders(): Observable<RequestOrder[]> {
    return this.http.get<RequestOrder[]>(`${this.baseUrl}ventes/all`);
  }

  public getAllRequestOrdersRequestOrderByIdDesc(): Observable<RequestOrder[]> {
    return this.http.get<RequestOrder[]>(`${this.baseUrl}ventes/searchAllVentesOrderByIdDesc`);
  }

  public addRequestOrder(requestOrder: RequestOrder): Observable<RequestOrder> {
    return this.http.post<RequestOrder>(`${this.baseUrl}ventes/create`, requestOrder);
  }

  public updateRequestOrder(ordId: number, requestOrder: RequestOrder): Observable<RequestOrder> {
    return this.http.put<RequestOrder>(`${this.baseUrl}ventes/update/${ordId}`, requestOrder);
  }

  public sumTotaleOfCommandeInDay(): Observable<any> {
    return this.http.get(`${this.baseUrl}ventes/sumVenteInDay`);
  }

  public sumTotaleOfCommandeInMonth(): Observable<any> {
    return this.http.get(`${this.baseUrl}ventes/sumVenteInMonth`);
  }

  public sumTotaleOfCommandeInYear(): Observable<any> {
    return this.http.get(`${this.baseUrl}ventes/sumVenteInYear`);
  }

  public SumTotaleOfCommandePeerMonth(): Observable<RequestOrder[]> {
    return this.http.get<RequestOrder[]>(`${this.baseUrl}ventes/sumTotalOfVentesPeerMonth`);
  }

  public SumTotaleOfOrdersPeerYear(): Observable<RequestOrder[]> {
    return this.http.get<RequestOrder[]>(`${this.baseUrl}ventes/sumTotalOfVentesPeerYear`);
  }

  public deleteRequestOrder(ordId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}ventes/delete/${ordId}`);
  }

  public saveVente(info: Vente, id:number) {
    return this.http.post(`${this.baseUrl}ventes/create?id=`+id, info);
  }

  public saveVenteWithBarcode(info: Vente, id:number) {
    return this.http.post(`${this.baseUrl}ventes/venteWithbarCode?id=`+id, info);
  }

  public generateNumeroVente(): Observable<any> {
    return this.http.get(`${this.baseUrl}ventes/generateNumeroVente`);
  }

  public getNumeroVente() {
    this.generateNumeroVente().subscribe(
      response =>{
        this.NumVente = response;
        console.log("Numero Vente:" + this.NumVente);
      }
    );
  }

  public getCurrentUser(): Observable<any> {
    return this.tokenService.getUser();
  }

  public getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PurchaseRequest} from '../model/purchase-request';
import {Observable} from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseServiceService {

  private baseUrl = 'http://localhost:8080/api/buy/purchase';

  id;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService
  ) { }

  getOrder(purchaseRequest: PurchaseRequest): Observable<any>{
    return this.http.post<PurchaseRequest>(this.baseUrl,purchaseRequest);
  }

  getOrderWithUser(purchaseRequest: PurchaseRequest, id: number): Observable<any>{
  //  return this.http.post<PurchaseRequest>(this.baseUrl,purchaseRequest);
    return this.http.post<PurchaseRequest>(`${this.baseUrl}?id=`+id, purchaseRequest);
  }

  getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id;
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  public baseUrl = 'http://localhost:8080/api/';
  //private baseUrl = 'http://localhost:8080/api/allOrders';
  //private url = 'http://localhost:8080/api/category?id=';
  constructor(private http: HttpClient) { }

  getOrders(page,size): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}allOrders?page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}products/all`).pipe(
      map(
        response => response
      )
    )
  }

  getAllOrdersOrderByIdDesc(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}products/searchAllArticleOrderByIdDesc`).pipe(
      map(
        response => response
      )
    )
  }

  getOrdersByCategoryId(id,page,size): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}category?id=${id}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  getOrdersByKey(word,page,size): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}orderkey?word=${word}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }
  getOrderById(id): Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}order?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }

  public getProductById(catId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}products/findById/${catId}`);
  }

  getOrdersLength(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}orderSize`).pipe(
      map(
        response => response
      )
    )
  }

  getOrdersLengthByCategoryId(id): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}ctegoryidsize?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }
  getOrdersLengthByKey(word): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}keysize?key=${word}`).pipe(
      map(
        response => response
      )
    )
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}products/create`, Order);
  }

  public addOrderWithPhotoInFolder(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.baseUrl}products/createWithFileInFolder`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public updateOrder(ordId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}products/update/${ordId}`, order);
  }

  uploadPhotoOrderInFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/products/uploadProductPhotoInFolder/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getPhotoArticleInContext() {
    return this.http.get(`${this.baseUrl}products/photoProductInContext`);
  }

  public deleteOrder(ordId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}products/delete/${ordId}`);
  }


}

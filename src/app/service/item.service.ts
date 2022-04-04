import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public baseUrl = 'http://localhost:8080/api/';
  //private baseUrl = 'http://localhost:8080/api/allItems';
  //private url = 'http://localhost:8080/api/category?id=';

  listData : Item[];

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}items/all`);
  }

  getAllItemsItemByIdDesc(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}items/searchAllItemsOrderByIdDesc`);
  }

  getAllItemsByRequestOrderId(comId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}items/searchAllItemsByRequestOrderId/${comId}`);
  }

  public addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}items/create`, item);
  }

  public updateItem(ordId: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}items/update/${ordId}`, item);
  }

  public deleteItem(ordId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}items/delete/${ordId}`);
  }

}

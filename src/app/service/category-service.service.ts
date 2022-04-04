import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Category} from '../model/category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  baseUrl = 'http://localhost:8080/api/allCategoies';

  apiServerUrl = 'http://localhost:8080/api';
  
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl).pipe(
      map (
        response => response
      )
    )
  }

  public getCategorieDTOsOrderByIdDesc(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/categories/searchAllCategoriesOrderByIdDesc`);
  }

  public getCategoryById(catId: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiServerUrl}/categories/findById/${catId}`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiServerUrl}/categories/create`, category);
  }

  public updateCategory(catyId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/categories/update/${catyId}`, category);
  }

  public deleteCategory(catyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/categories/delete/${catyId}`);
  }


}

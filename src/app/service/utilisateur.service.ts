import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Utilisateur } from '../model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  baseUrl = 'http://localhost:8080/restaurant/v1';

  choixmenu : string  = 'A';
  listData : Utilisateur[];
 
  dataForm:  FormGroup;
 
  userId;
 
  private listners = new Subject<any>();
  
  listen(): Observable<any> {
    return this.listners.asObservable();
  }
  
  filter(filterBy: string) {
    this.listners.next(filterBy);
  }
 
  constructor(private http: HttpClient) { }
 
  getAllUtilisateurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/utilisateurs/all`);
  }
 
  getAllUtilisateurOrderDesc(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/utilisateurs/allUtilisateurOrderDesc`);
  }
 
  getUtilisateurById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/utilisateurs/findById/${id}`);
  }
 
  getPhotoUtilisateur(id: number) {
    return this.http.get(`${this.baseUrl}/utilisateurs/photoUser/`+ id);
  }
 
  public getUserAvatar(id: number){
    return this.http.get(`${this.baseUrl}/utilisateurs/avatar/`+ id);
  }
 
  updateUtilisateur(id: number, value: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/utilisateurs/update/${id}`, value);
  }
 
  uploadPhotoUtilisateur(file: File, userId): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl+'/utilisateurs/uploadUserPhoto/'+userId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  deleteUtilisateur(id: number) {
    return this.http.get<any>(`${this.baseUrl}/utilisateurs/delete/${id}`);
  }
 
}

import { Injectable } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProfileInfo, UpdateUsernameInfo, UpdatePasswordInfo, UpdateProfilInfo } from './profile-info';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { Login } from 'src/app/auth/login';
import { Register } from 'src/app/auth/register';

import { environment } from 'src/environments/environment';


const AUTH_API = 'http://localhost:8080/restaurant/v1/';

const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl_1 = 'http://localhost:8080/restaurant/v1';

  loginUrl = "http://localhost:8080/restaurant/v1/auth/signIn";

  choixmenu : string  = 'A';
  dataForm:  FormGroup;
  listData: ProfileInfo;
  listDataUsername: UpdateUsernameInfo;

  public islogin = false ;

  profileInfo: ProfileInfo = {} as ProfileInfo;
  userId;
  user;
  currentUser = {};

  formData:  FormGroup;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: string) {
    this.listners.next(filterBy);
  }

  signUp(info: Register): Observable<Register> {
    return this.http.post<Register>(AUTH_API + 'auth/signUp', info , httpOptions);
  }

  attemptAuth(credentials: Login): Observable<any> {
    const loginData = {
      username: credentials.username,
      password: credentials.password
    };
    return this.http.post(this.loginUrl, loginData, httpOptions);
    this.islogin=true;
  }

  getUserProfile(id): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/utilisateurs/findById/${id}`, httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(this.baseUrl_1 + `/utilisateurs/getUserByUsername/${username}`);
  }

  getUserById(id: any) {
    return this.http.get(`${this.baseUrl_1}/utilisateurs/findById/${id}`);
  }

  updateProfil(item: UpdateProfilInfo): Observable<UpdateProfilInfo> {
    return this.http.patch<UpdateProfilInfo>("http://localhost:8080/restaurant/v1/updateProfil", {
      name: item.name,
      username: item.username,
      email: item.email,
      password: item.password,
      confirmPassword: item.confirmPassword
    }, httpOptions);

  }

  updateUsername(item: UpdateUsernameInfo): Observable<UpdateUsernameInfo> {
    return this.http.patch<UpdateUsernameInfo>(`${this.baseUrl_1}/utilisateurs/updateUsername`, {
      username: item.username,
      newUsername: item.newUsername
    }, httpOptions);

  }

  updatePassword(item: UpdatePasswordInfo): Observable<UpdatePasswordInfo> {
    return this.http.patch<UpdatePasswordInfo>(`${this.baseUrl_1}/utilisateurs/updatePassword/`, {
      username: item.username,
      oldPassword: item.oldPassword,
      newPassword: item.newPassword
    }, httpOptions);
  }

  activatedUser(id: number, isActive: boolean): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"isActive":isActive};
    return this.http.patch(`${this.baseUrl_1}/utilisateurs/activatedUser/`+id+'?isActive='+data.isActive, {headers: headers});
  }

  isLogin(){
    return !(this.tokenService.getUsername() == null ||
           this.tokenService.getToken() == null);
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}

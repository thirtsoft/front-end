import { Component } from '@angular/core';
import {CartServiceService} from './service/cart-service.service';
import {CookieService} from 'ngx-cookie-service';
import { TokenStorageService } from './auth/token-storage.service';
import { UtilisateurService } from './service/utilisateur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showVendeurBoard = false;
  username: string;
  name: string;
  email: String;
  userId;
  photo;
  img: boolean;

  constructor(private cook: CookieService,
              private tokenService: TokenStorageService,
              private userService: UtilisateurService
  
  //  private auth: AuthenticationServiceService
              ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');

      this.username = user.username;
      this.name = user.name;
      this.userId = user.id;
      this.photo = user.photo;

      if (this.userService.getUserAvatar(this.userId) === null)
        this.img = false;
      else this.img = true;
    };
   /*  if (this.isCookie()){
      sessionStorage.setItem("email",this.cook.get("email"))
      sessionStorage.setItem("token",this.cook.get("token"))
    } */
  }

  isCookie(){
    if (this.cook.get('email') === '' || this.cook.get('token') === ''){
      return false;
    }
    return true;
  }

  isLogin(){
 //   return this.auth.isLogin()
  }

}

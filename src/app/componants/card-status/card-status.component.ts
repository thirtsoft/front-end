import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import {CartServiceService} from '../../service/cart-service.service';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.css']
})
export class CardStatusComponent implements OnInit {

  orderSize: number = 0;
  orderPrice: number = 0;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showAssocieBoard = false;
  showGerantBoard = false;
  showVendeurBoard = false;

  constructor(private cart: CartServiceService,
              private tokenService: TokenStorageService,
      //        private auth: AuthenticationServiceService
              ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showAssocieBoard = this.roles.includes('ROLE_ASSOCIE');
      this.showGerantBoard = this.roles.includes('ROLE_GERANT');
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');
    };
    
    this.getCartStatus()
  }

  getCartStatus(){
    this.cart.totalOrders.subscribe(
      data => {
        this.orderSize = data
      }
    )
    this.cart.totalPrice.subscribe(
      data => {
        this.orderPrice = data
      }
    )
  }
  isUserLogin(){
  //  return this.auth.isLogin()
  }

}

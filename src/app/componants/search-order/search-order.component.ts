import { Component, OnInit } from '@angular/core';
import {OrderServiceService} from '../../service/order-service.service';
import {Order} from '../../model/order';
import {Router} from '@angular/router';
import {CartServiceService} from '../../service/cart-service.service';
import { VenteService } from 'src/app/service/vente.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {

  sumVenteInMonth;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showVendeurBoard = false;

  constructor(private orderService: OrderServiceService,
              private ventService: VenteService,
              private tokenService: TokenStorageService,
              private router: Router,
//              private auth: AuthenticationServiceService,
              private card: CartServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');
    };
    this.getSumVenteInMonth();
  }

  getSumVenteInMonth() {
    this.ventService.sumTotaleOfCommandeInDay()
      .subscribe(response => {
        this.sumVenteInMonth = response;
      })
  }

  doSearch(value: string) {
    this.router.navigateByUrl('/orders/' + value)
  }

  isAuthenticatedUser(){
 //   return this.auth.isLogin();
  }

  logOut() {
    this.card.orders = [];
    this.card.totalOrders.next(0);
    this.card.totalPrice.next(0);
 //   this.auth.logOut()
    this.router.navigateByUrl("/login");
    window.location.reload();
  }

}

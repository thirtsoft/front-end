import { Component, OnInit } from '@angular/core';
import {CartOrder} from '../../model/cart-order';
import {CartServiceService} from '../../service/cart-service.service';
import {Router} from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PurchaseServiceService } from 'src/app/service/purchase-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { VenteService } from 'src/app/service/vente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  orders: CartOrder[] = [];
  totalOrder: number = 0;
  totalPrice: number = 0;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showVendeurBoard = false;


  checkoutParentGroup: FormGroup;
  totalSize: number = 0;

  constructor(private cart: CartServiceService,
              private ps: PurchaseServiceService,
              private tokenService: TokenStorageService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');
    };
    this.getAllOrders()
    this.getTotals()
    this.cart.calculateTotals();
  }

  getTotals(){
    this.cart.totalOrders.subscribe(
      data => {
        this.totalOrder = data
      }
    )
    this.cart.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    )
  }
  getAllOrders(){
    this.orders = this.cart.orders;
  }

  addOrder(temp: CartOrder) {
    this.cart.addOrderToCart(temp);
    this.toastr.success('au panier avec succès','Article Ajoutée', {
      timeOut: 1500,
      positionClass: 'toast-top-right',
    });
  }

  removeOrder(temp: CartOrder) {
    this.cart.removeOrder(temp);
    this.toastr.error('au panier avec succès','Article Diminué', {
      timeOut: 1500,
      positionClass: 'toast-top-right',
    });
  }

  remove(temp: CartOrder) {
    this.cart.remove(temp);
    this.toastr.error('au panier avec succès','Article Diminué', {
      timeOut: 1500,
      positionClass: 'toast-top-right',
    });
  }

  checkOut() {
    this.router.navigateByUrl('/checkout')
  }
}

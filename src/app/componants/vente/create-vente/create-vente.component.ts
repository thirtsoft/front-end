import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CartOrder } from 'src/app/model/cart-order';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { PurchaseServiceService } from 'src/app/service/purchase-service.service';
import { VenteService } from 'src/app/service/vente.service';

@Component({
  selector: 'app-create-vente',
  templateUrl: './create-vente.component.html',
  styleUrls: ['./create-vente.component.css']
})
export class CreateVenteComponent implements OnInit {

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
              private crudApi: VenteService,
              private router: Router,
              public fb: FormBuilder,
  ) { }

  get f() { return this.crudApi.formData.controls; }

  ngOnInit(): void {
    this.infoForm();
    this.orders = [];
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
    this.crudApi.getUserId();
    this.crudApi.getNumeroVente();
  }

  getTotals(){
    this.cart.totalOrders.subscribe(
      data => {
        this.totalOrder = data
      }
    )
    this.cart.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
        console.log(this.totalPrice);
      }
    )
  }
  getAllOrders(){
    this.orders = this.cart.orders;
    console.log(this.orders);
  }

  addOrder(temp: CartOrder) {
    this.cart.addOrderToCart(temp)
  }

  removeOrder(temp: CartOrder) {
    this.cart.removeOrder(temp)
  }

  remove(temp: CartOrder) {
    this.cart.remove(temp)
  }

  checkOut() {
    this.router.navigateByUrl('/checkout')
  }

  infoForm() {
    const numberRegEx = /\-?\d*\.?\d{1,2}/;
    this.crudApi.formData = this.fb.group({
      numeroVente: this.crudApi.NumVente,
      totalVente: [0, Validators.required],
      typeReglement: ['', Validators.required],
      montantReglement: [0, [Validators.required, Validators.pattern(numberRegEx)]],
      dateVente: [new Date(), Validators.required],
      ligneVentes: [[], Validators.required],


    });

  }

  onSubmit() {
      this.f['totalVente'].setValue(this.totalPrice);
      this.f['ligneVentes'].setValue(this.orders);
      console.log(this.crudApi.formData.value);
      console.log(this.crudApi.formData.value.numeroVente);
      console.log(this.crudApi.formData.value, this.crudApi.id);

      this.crudApi.saveVenteWithBarcode(this.crudApi.formData.value, this.crudApi.id)
        .subscribe(
          data => {
            console.log(data);
            window.alert("Vente Effectuée avec succès")
            this.router.navigate(['/ventes']);
          }
        );

  }


}

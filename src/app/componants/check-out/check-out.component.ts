import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartServiceService} from '../../service/cart-service.service';
import {RequestOrder} from '../../model/request-order';
import {PurchaseRequest} from '../../model/purchase-request';
import {Item} from '../../model/item';
import {CartOrder} from '../../model/cart-order';
import {PurchaseServiceService} from '../../service/purchase-service.service';
import {Router} from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  checkoutParentGroup: FormGroup;
  totalSize: number = 0;
  totalPrice: number= 0;

  isValid:boolean = true;
  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showVendeurBoard = false;

  constructor(private formChildGroup: FormBuilder,
              private card: CartServiceService,
              private ps: PurchaseServiceService,
              private tokenService: TokenStorageService,
              private toastr: ToastrService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.ps.getUserId();
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');
    };
    this.myForm()
    this.getTotals()
  }

  myForm(){
    this.checkoutParentGroup = this.formChildGroup.group({
      data: this.formChildGroup.group({
        typeReglement: new FormControl('',[
          Validators.required]),
        montantReglement: new FormControl('',[
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      }),
    })
  }
  get typeReglement() {
    return this.checkoutParentGroup.get('data.typeReglement')
  }
  get montantReglement() {
    return this.checkoutParentGroup.get('data.montantReglement')
  }
  
  done() {
    if (this.checkoutParentGroup.invalid) {
      this.checkoutParentGroup.markAllAsTouched()
    } else {
      /* #1 */      
      let requestOrder = new RequestOrder();
      requestOrder.totalPrice = this.totalPrice;
      requestOrder.totalQuantity = this.totalSize;
      requestOrder.typeReglement = this.checkoutParentGroup.controls['data'].value.typeReglement;
      requestOrder.montantReglement = this.checkoutParentGroup.controls['data'].value.montantReglement;
      /* #5 */
      let orders: CartOrder[] = this.card.orders;
      let items: Item[]  = orders.map(order => new Item(order));
      /* #6 */
      let purchaseRequest = new PurchaseRequest();     
      purchaseRequest.requestOrder = requestOrder;
      purchaseRequest.items = items;
      if (this.validateForm()) {
        this.ps.getOrderWithUser(purchaseRequest, this.ps.id).subscribe({
          next: response=> {
          //  alert("Votre Code est : " + response.code);
            this.toastr.success('avec succès ' + response.code,'Commande Validée', {
              timeOut: 1500,
              positionClass: 'toast-top-right',
            });
            this.clean()
          },
          error: error =>{
            console.log("Error is : " + error.message)
          }
         })
      }else {
        this.toastr.error('au montant total','Veuillez donner un montant reçu', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
      }
     
    }
  }

  validateForm() {
    this.isValid = false;
    if ((this.checkoutParentGroup.controls['data'].value.montantReglement)  < (this.totalPrice))
      this.isValid = false;
    else
      this.isValid = true;
    return this.isValid;
  }

  clean(){
    this.card.orders = [];
    this.card.totalOrders.next(0);
    this.card.totalPrice.next(0);
    this.checkoutParentGroup.reset();
  //  this.router.navigateByUrl("/orders")
    this.router.navigateByUrl("/ventes")

  }

  getTotals(){
    this.card.totalOrders.subscribe(
      data => {
        this.totalSize = data
      }
    )
    this.card.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }
    )
  }

}

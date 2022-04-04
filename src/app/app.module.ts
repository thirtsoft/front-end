import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination' ;
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {CookieService} from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { OrderItemsComponent } from './componants/order-items/order-items.component';
import { CategoryItemsComponent } from './componants/category-items/category-items.component';
import { DropdownMenuComponent } from './componants/dropdown-menu/dropdown-menu.component';
import { SearchOrderComponent } from './componants/search-order/search-order.component';
import { OrderDetailsComponent } from './componants/order-details/order-details.component';

import { CardStatusComponent } from './componants/card-status/card-status.component';
import { PurchasesComponent } from './componants/purchases/purchases.component';
import { CheckOutComponent } from './componants/check-out/check-out.component';

import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './componants/signup/signup.component';
import { CodeActivationComponent } from './componants/code-activation/code-activation.component';

import { ResetPasswordComponent } from './componants/reset-password/reset-password.component';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { ListCategoryComponent } from './componants/category/list-category/list-category.component';
import { CreateProductComponent } from './componants/product/create-product/create-product.component';
import { ListProductComponent } from './componants/product/list-product/list-product.component';
import { ChiffAffaireParmoisComponent } from './componants/chart/chiff-affaire-parmois/chiff-affaire-parmois.component';
import { ChiffAffaireParAnnesComponent } from './componants/chart/chiff-affaire-par-annes/chiff-affaire-par-annes.component';
import { ChartComponent } from './componants/chart/chart/chart.component';
import { ListVenteComponent } from './componants/vente/list-vente/list-vente.component';
import { DetailsVenteComponent } from './componants/vente/details-vente/details-vente.component';
import { ListUtilisateurComponent } from './componants/utilisateur/list-utilisateur/list-utilisateur.component';
import { CreateUtilisateurComponent } from './componants/utilisateur/create-utilisateur/create-utilisateur.component';
import { ViewVenteComponent } from './componants/vente/view-vente/view-vente.component';
import { AddCategoryComponent } from './componants/category/add-category/add-category.component';
import { ItemComponent } from './service/item/item.component';
import { ProfilComponent } from './authentication/profil/profil.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ActivatedUserComponent } from './authentication/activated-user/activated-user.component';
import { ListRegisterComponent } from './authentication/list-register/list-register.component';
import { UpdatePasswordComponent } from './authentication/update-password/update-password.component';
import { UpdateProfileComponent } from './authentication/update-profile/update-profile.component';
import { UpdateUsernameComponent } from './authentication/update-username/update-username.component';
import { CreateVenteComponent } from './componants/vente/create-vente/create-vente.component';

// http://localhost:4200/
const routes: Routes = [

  // http://localhost:4200/active
  {path: 'reset', component:ResetPasswordComponent},

  // http://localhost:4200/active
 // {path: 'active', component:CodeActivationComponent,canActivate: [LoginActiveService,AcountServiceService]},
  {path: 'active', component:CodeActivationComponent},
  // http://localhost:4200/login
//  {path: 'login', component:LoginComponent,canActivate: [LoginActiveService]},
  {path: 'login', component:LoginComponent},

  // http://localhost:4200/signup
 // {path: 'signup', component:SignupComponent,canActivate: [LoginActiveService]},
  {path: 'signup', component:RegisterComponent},

  // http://localhost:4200/checkout
//  {path: 'checkout', component:CheckOutComponent,canActivate: [RouteActivteService]},
  {path: 'checkout', component:CheckOutComponent},

  // http://localhost:4200/purchases
 // {path: 'purchases', component:PurchasesComponent,canActivate: [RouteActivteService]},
  {path: 'purchases', component:PurchasesComponent},

  // http://localhost:4200/order/id
 // {path: 'order/:id', component:OrderDetailsComponent,canActivate: [RouteActivteService]},
 {path: 'order/:id', component:OrderDetailsComponent},

  // http://localhost:4200/category/id
  {path: 'category/:id', component:OrderItemsComponent},

  // http://localhost:4200/category
  {path: 'category', component:OrderItemsComponent},

  // http://localhost:4200/orders/key
//  {path: 'orders/:key', component:OrderItemsComponent,canActivate: [RouteActivteService]},
  {path: 'orders/:key', component:OrderItemsComponent},

  // http://localhost:4200/orders
//  {path: 'orders', component:OrderItemsComponent,canActivate: [RouteActivteService]},
  {path: 'orders', component:OrderItemsComponent},

  // http://localhost:4200/categories/allByOrderIdDesc
  {path: 'categories', component:ListCategoryComponent},

  // http://localhost:4200/categories/allByOrderIdDesc
 // {path: 'categorie', component:AddCategoryComponent,canActivate: [RouteActivteService]},
  {path: 'categorie', component:AddCategoryComponent},

  // http://localhost:4200/categories/allByOrderIdDesc
//  {path: 'categorie/:id', component:AddCategoryComponent,canActivate: [RouteActivteService]},
  {path: 'categorie/:id', component:AddCategoryComponent},

  // http://localhost:4200/products/allByOrderIdDesc
//  {path: 'produits', component:ListProductComponent,canActivate: [RouteActivteService]},
  {path: 'produits', component:ListProductComponent},

  // http://localhost:4200/products/allByOrderIdDesc
 // {path: 'produit', component:CreateProductComponent,canActivate: [RouteActivteService]},
  {path: 'produit', component:CreateProductComponent},
  // http://localhost:4200/products/allByOrderIdDesc
//  {path: 'produit/:id', component:CreateProductComponent,canActivate: [RouteActivteService]},
  {path: 'produit/:id', component:CreateProductComponent},

  // http://localhost:4200/products/allByOrderIdDesc
  {path: 'ventes', component:ListVenteComponent},
  {
    path:'venteView/:id',
    component: ViewVenteComponent
  },
  {path: 'vendre', component:CreateVenteComponent},

  // http://localhost:4200/products/allByOrderIdDesc
 // {path: 'detail-Ventes', component:DetailsVenteComponent,canActivate: [RouteActivteService]},
  {path: 'detail-Ventes', component:DetailsVenteComponent},

  // http://localhost:4200/products/allByOrderIdDesc
//  {path: 'graphiques', component:ChartComponent,canActivate: [RouteActivteService]},
  {path: 'graphiques', component:ChartComponent},

  // http://localhost:4200/products/allByOrderIdDesc
//  {path: 'employes', component:ListUtilisateurComponent,canActivate: [RouteActivteService]},
  {path: 'employes', component:ListUtilisateurComponent},

  // http://localhost:4200/products/allByOrderIdDesc
//  {path: 'employe', component:CreateUtilisateurComponent,canActivate: [RouteActivteService]},
  {path: 'employe', component:CreateUtilisateurComponent},

  // http://localhost:4200/products/allByOrderIdDesc
 // {path: 'employe/:id', component:CreateUtilisateurComponent,canActivate: [RouteActivteService]},
  {path: 'employe/:id', component:CreateUtilisateurComponent},


  // http://localhost:4200/
 // {path: '', redirectTo: '/orders',pathMatch: 'full'},
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  // if user enter any thing without all routes
 // {path: '**', redirectTo: '/orders',pathMatch: 'full'}
  {path: '**', redirectTo: '/login', pathMatch: 'full'}

];

/*
*   // http://localhost:4200/
  {path: '', component:OrderItemsComponent}
* */
@NgModule({
  declarations: [
    AppComponent,
    OrderItemsComponent,
    CategoryItemsComponent,
    DropdownMenuComponent,
    SearchOrderComponent,
    OrderDetailsComponent,
    CardStatusComponent,
    PurchasesComponent,
    CheckOutComponent,
    LoginComponent,
    SignupComponent,
    CodeActivationComponent,
    ResetPasswordComponent,
    ListCategoryComponent,
    CreateProductComponent,
    ListProductComponent,
    ChiffAffaireParmoisComponent,
    ChiffAffaireParAnnesComponent,
    ChartComponent,
    ListVenteComponent,
    DetailsVenteComponent,
    ListUtilisateurComponent,
    CreateUtilisateurComponent,
    ViewVenteComponent,
    AddCategoryComponent,
    ItemComponent,
    ProfilComponent,
    RegisterComponent,
    ActivatedUserComponent,
    ListRegisterComponent,
    UpdatePasswordComponent,
    UpdateProfileComponent,
    UpdateUsernameComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    SocialLoginModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    //NgModule
  ],
 /*  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '998943596311-agii5b72rppsj1h1tdp5f75mhnfj22s7.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('224006282781296')
          }
        ]
      } as SocialAuthServiceConfig,
    },
 //   {provide: HTTP_INTERCEPTORS,useClass: HttpIntercepterBaseAuthService,multi: true},
 //   CookieService
  ], */
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateProfileComponent, UpdatePasswordComponent,
   ProfilComponent, UpdatePasswordComponent,
    ActivatedUserComponent, CreateUtilisateurComponent,
    UpdateUsernameComponent,
  
  ]
})
export class AppModule { }

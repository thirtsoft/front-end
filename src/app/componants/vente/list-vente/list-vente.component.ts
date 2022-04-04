import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { RequestOrder } from 'src/app/model/request-order';
import { VenteService } from 'src/app/service/vente.service';

@Component({
  selector: 'app-list-vente',
  templateUrl: './list-vente.component.html',
  styleUrls: ['./list-vente.component.css']
})
export class ListVenteComponent implements OnInit {

  commandeDTOList: RequestOrder[];
  sumVenteInMonth;
 
  id : number;
  p : number=1;
  searchText;

  info: any;
  roles: string[];

  isLoggedIn = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showVendeurBoard = false;


  constructor(private crudApi: VenteService,
              private tokenService: TokenStorageService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes("ROLE_MANAGER");
      this.showVendeurBoard = this.roles.includes('ROLE_VENDEUR');
    };
    this.getListRequestOrderDTOs();
    this.getSumVenteInMonth();
  }

  getListRequestOrderDTOs(): void {
    this.crudApi.getAllRequestOrdersRequestOrderByIdDesc().subscribe(
      (response: RequestOrder[]) => {
        this.commandeDTOList = response;
        console.log(this.commandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getSumVenteInMonth() {
    this.crudApi.sumTotaleOfCommandeInMonth()
      .subscribe(response => {
        this.sumVenteInMonth = response;
      })
  }

  viewVente(item: RequestOrder) {
    this.router.navigateByUrl('venteView/' + item.id);
  }

  confirmDialog(id: number) {
    alert("Etes-vous sur de supprimer supprimé");
    this.crudApi.deleteRequestOrder(id).subscribe(data => {
      alert("Menu supprimé");
      this.router.navigateByUrl("ventes").then(() => {
        window.location.reload();
      });
    });
  }


}

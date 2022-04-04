import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { DetailVenteService } from 'src/app/service/detail-vente.service';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-details-vente',
  templateUrl: './details-vente.component.html',
  styleUrls: ['./details-vente.component.css']
})
export class DetailsVenteComponent implements OnInit {

  commandeDTOList: Item[];
  sumVenteInMonth;
 
  id : number;
  p : number=1;
  searchText;

  constructor(private crudApi: ItemService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.getListItemDTOs();
  }

  public getListItemDTOs(): void {
    this.crudApi.getAllItemsItemByIdDesc().subscribe(
      (response: Item[]) => {
        this.commandeDTOList = response;
        console.log(this.commandeDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  confirmDialog(id: number) {
    alert("Etes-vous sur de supprimer supprimé");
    this.crudApi.deleteItem(id).subscribe(data => {
      alert("Menu supprimé");
      this.router.navigateByUrl("ventes").then(() => {
        window.location.reload();
      });
    });
  }


}

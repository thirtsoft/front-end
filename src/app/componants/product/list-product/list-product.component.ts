import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderServiceService } from 'src/app/service/order-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  articleDTOList: Order[];

  id : number;
  p : number=1;
  searchText;

  constructor(public crudApi: OrderServiceService,
              public router: Router,
              public toastr: ToastrService,
              public fb: FormBuilder,
             /*  @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef:MatDialogRef<UploadFileComponent>, */
  ){}

  ngOnInit(): void {
    this.getListArticleDTOs();
  }

  public getListArticleDTOs(): void {
    this.crudApi.getAllOrdersOrderByIdDesc().subscribe(
      (response: Order[]) => {
        this.articleDTOList = response;
        console.log(this.articleDTOList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onAddNewArticle() {
    this.router.navigateByUrl("/produit");
  }

  confirmDialog(id: number) {
    alert("Etes-vous sur de supprimer supprimé");
    this.crudApi.deleteOrder(id).subscribe(data => {
      this.toastr.error('avec succès','Article Supprimé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("produits").then(() => {
        window.location.reload();
      });
    });
  }

}

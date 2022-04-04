import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categoryListDTO: Category[];

  id : number;
  p : number=1;
  searchText;

  constructor(public crudApi: CategoryServiceService,
              private router: Router,
              public fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.getListCategoryDTOs();
  }

  public getListCategoryDTOs(): void {
    this.crudApi.getCategorieDTOsOrderByIdDesc().subscribe(
      (response: Category[]) => {
        this.categoryListDTO = response;
        console.log(this.categoryListDTO);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onCreateCategorie() {
    this.router.navigateByUrl("categorie");
  }

  public deleteCategory(id: number) {
    alert("Etes-vous sur de supprimer supprimé");
    this.crudApi.deleteCategory(id).subscribe(data => {
      alert("Category supprimé");
      this.router.navigateByUrl("categories").then(() => {
        window.location.reload();
      });
    });
  }

 

}

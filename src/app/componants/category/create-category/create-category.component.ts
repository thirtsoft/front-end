import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  addEditCategoryData: Category;

  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  id;

  userId;
  img: boolean;

  constructor(public crudApi: CategoryServiceService,
              public fb: FormBuilder,
              public router : Router,
              private actRoute: ActivatedRoute,
  ){
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    }); 
  }

  ngOnInit() {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getCategoryDTOById(this.paramId);
    }
  }

  public getCategoryDTOById(id: number) {
    console.log('getOne');
    this.crudApi.getCategoryById(id).subscribe(
      (response: Category) => {
        console.log('data--', response);
        this.addEditCategoryData = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
  
  saveCategorie() {
    this.crudApi.addCategory(this.addEditCategoryData)
      .subscribe(response => {
        alert("Categorie crée avec succès")
        this.router.navigateByUrl("categories").then(() => {

        });
      },
        (error: HttpErrorResponse) => {
         // this.toastr.error("Cette catgory exist déjà, veuillez changez de code");
        }
      );

  }

  updateCategorie(){
    this.crudApi.updateCategory(this.addEditCategoryData.id,this.addEditCategoryData).
    subscribe( data => {
      alert("Categorie modifé avec succès")
     /*  this.dialogRef.close();
      this.toastr.warning('avec succès','Categorie Modifier', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      }); */
      this.router.navigateByUrl("admin/accueil/categories").then(() => {
        window.location.reload();
      });
    });
  }

  goBack() {
    this.router.navigateByUrl("categories");
  }
  

}

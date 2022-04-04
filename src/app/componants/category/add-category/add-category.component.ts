import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/category';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addEditCategoryData: Category = new Category();

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
              private toastr: ToastrService
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
    console.log(this.addEditCategoryData);
    this.crudApi.addCategory(this.addEditCategoryData)
      .subscribe(response => {
        this.toastr.success('avec succès ','Categorie crée', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });
        console.log(response);
        this.router.navigateByUrl("categories").then(() => {

        });
      },
        (error: HttpErrorResponse) => {
          this.toastr.error("Cette catgory exist déjà, veuillez changez de code");
        }
      );

  }

  updateCategorie(){
    this.crudApi.updateCategory(this.addEditCategoryData.id,this.addEditCategoryData).
    subscribe( data => {
      alert("Categorie modifé avec succès")
      this.toastr.warning('avec succès','Categorie Modifier', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("categories").then(() => {
        window.location.reload();
      });
    });
  }

  goBack() {
    this.router.navigateByUrl("categories");
  }
  


}

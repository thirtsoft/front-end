import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/category';
import { Order } from 'src/app/model/order';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { OrderServiceService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  addEditArticleDTO: Order = new Order();
 
  categoryListDTO: Category[];

  addArticleForm: FormGroup;
  
  currentProduct;

  public articleFile: any = File;

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''};
  mySubscription: any;

  editPhoto: boolean;
  currentProfile: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  currentTime: number = 0;
  id;

  userId;
  img: boolean;

  constructor(private crudApi: OrderServiceService,
              private catService: CategoryServiceService,
      //        public catService: CatalogueService,
              private router: Router,
              private toastr: ToastrService,
              private actRoute: ActivatedRoute,
  ){
    //--for reload componant
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

  }

  ngOnInit(): void {
    this.paramId = this.actRoute.snapshot.paramMap.get('id');
    console.log('Param--', this.paramId);
    if(this.paramId  && this.paramId  > 0){
      this.getArticleDTOById(this.paramId);
    }

    this.getListCategoryDTOs();

  }

  public getTS() {
    return this.currentTime;
  }

  onEditPhoto(p) {
    if(this.paramId  && this.paramId  > 0){
      this.paramId = p;
      this.editPhoto=true;
    }
    this.editPhoto=false;
  }

  public onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  public processForm() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    console.log(this.currentFileUpload);
    console.log(this.paramId);
    this.crudApi.uploadPhotoOrderInFolder(this.currentFileUpload, this.addEditArticleDTO.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.editPhoto=false;
          this.currentTime = Date.now();
        }
      }, err => {
    //    this.toastr.warning("Problème de chargment de la photo");
      }
    );
    this.selectedFiles = undefined;
  }

  getListCategoryDTOs() {
    this.catService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categoryListDTO = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getArticleDTOById(id: number) {
    console.log('getOne');
    this.crudApi.getProductById(id).subscribe(
      (response: Order) => {
        console.log('data--', response);
        this.addEditArticleDTO = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public update() {
    console.log('Data send--', this.addEditArticleDTO);
    this.crudApi.updateOrder(this.addEditArticleDTO.id, this.addEditArticleDTO).subscribe(
      (response: Order) => {
        alert("Plat modifié avec succès")
        this.router.navigateByUrl("produits").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }


  onSelectFile(event) {
   // selectionner une image et la garder
    const file = event.target.files[0];
    this.articleFile = file;
  }

  public onSaveArticle() {
    let formData = new FormData();
    console.log('Data send--', this.addEditArticleDTO);
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    formData.append('article', JSON.stringify(this.addEditArticleDTO));
    formData.append('photoArticle', this.currentFileUpload);
    console.log(formData);
    this.crudApi.addOrderWithPhotoInFolder(formData)
      .subscribe((response: Order)=> {
        this.toastr.success('avec succès','Article Ajouté', {
          timeOut: 1500,
          positionClass: 'toast-top-right',
        });

        this.router.navigateByUrl("produits").then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  goBack() {
    this.router.navigate([`/produits`]);
  }

}

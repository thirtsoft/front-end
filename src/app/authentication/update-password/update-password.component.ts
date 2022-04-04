import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { UpdatePasswordInfo } from 'src/app/auth/profile-info';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  formDataProfile: UpdatePasswordInfo  = new UpdatePasswordInfo();

  constructor(public crudApi: AuthService, 
              public toastr: ToastrService, 
              public fb: FormBuilder,
              private router : Router, 
      /*         @Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef:MatDialogRef<UpdatePasswordComponent>, */
  ) { }

  ngOnInit() {}

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      username: '',
      oldPassword: '',
      newPassword: '',
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile);
    this.crudApi.updatePassword(this.formDataProfile).
    subscribe( data => {
      this.toastr.success("Mot de Passe Modifiée avec Succès");
    });

  }


}

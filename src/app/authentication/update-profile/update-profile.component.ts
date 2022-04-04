import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { UpdateProfilInfo } from 'src/app/auth/profile-info';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  formDataProfile: UpdateProfilInfo  = new UpdateProfilInfo();

  constructor(public crudApi: AuthService,
              public toastr: ToastrService,
              public fb: FormBuilder,
              private router : Router,
              private route: ActivatedRoute,
/*     @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<UpdateProfileComponent>, */
  ) { }

  ngOnInit() {}

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile.username);
    console.log(this.formDataProfile.name);
    this.crudApi.updateProfil(this.formDataProfile).
    subscribe( data => {
      this.toastr.success("Vote profile a été Modifiée avec Succès");
    });
  }



}

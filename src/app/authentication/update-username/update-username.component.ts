import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { UpdateUsernameInfo } from 'src/app/auth/profile-info';

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.css']
})
export class UpdateUsernameComponent implements OnInit {
  
  formDataProfile: UpdateUsernameInfo  = new UpdateUsernameInfo();

  constructor(public crudApi: AuthService, 
              public toastr: ToastrService, 
              public fb: FormBuilder,
              private route: ActivatedRoute,
              private router : Router, 
        /*       @Inject(MAT_DIALOG_DATA)  public data,  
              public dialogRef:MatDialogRef<UpdateUsernameComponent>, */
  ) { }

  ngOnInit() {}

  infoForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.formDataProfile = {
      username: '',
      newUsername: '',
    };
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }

  onSubmit() {
    console.log(this.formDataProfile.username);
    console.log(this.formDataProfile.newUsername);
    this.crudApi.updateUsername(this.formDataProfile).
    subscribe( data => {
      this.toastr.success("Vote nom utilisateur a été Modifiée avec Succès");
    });
  }

}

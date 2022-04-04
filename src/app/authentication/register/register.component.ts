import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Register } from 'src/app/auth/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user = new Register('','','','',[]);
  submitted = false;
  isRegistered = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: any = [
    { name: 'Vendeur', id:1, selected: true },
    { name: 'Manager', id:2, selected: false },
  ];

  selectedRoles: string[];

  constructor(private authService: AuthService,
              private toastr :ToastrService,
              private router : Router
  ) { }

ngOnInit() {
  this.registrationForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    roleSelection: this.createRoles(this.roles),
  });
}

createRoles(rolesList): FormArray {
  const arr = rolesList.map(role => {
    return new FormControl(role.selected)
  });
  console.log("CreateRole:" +arr);
  return new FormArray(arr);
}

onSubmit() {
  this.submitted = true;
  this.user.name = this.registrationForm.value.name;
  this.user.username = this.registrationForm.value.username;
  this.user.email = this.registrationForm.value.email;
  this.user.password = this.registrationForm.value.password;
  console.log("SelectedRole: " +this.getSelectedRoles());
  this.user.roles = this.getSelectedRoles();
  this.registerUser();
  this.toastr.error('crée avec succès','Compte employé', {
    timeOut: 1500,
    positionClass: 'toast-top-right',
  });
}

registerUser() {
  console.log(this.user);
  this.authService.signUp(this.user)
  .subscribe(response=> {
    console.log(response);
    this.isRegistered = true;
    this.isSignUpFailed = false;
    console.log("User register Succeffuly");
 //   this.toastr.warning("User register Succeffuly");
    this.router.navigateByUrl("/login");
  },
  error => {
    this.errorMessage = error.error.message;
    this.isSignUpFailed = true;
  }
  );

}

getSelectedRoles():string[]  {
  this.selectedRoles = this.registrationForm.value.roleSelection.map((selected:any, i) => {
    console.log("IsSelected: " +selected);
    if(selected){
      return this.roles[i].name;
    }else {
      return '';
    }
  });
  // return selected roles
  return this.selectedRoles.filter(function (element) {
    if (element !== '') {
      console.log("ElementReturn: " +element);
      return element;
    }
  });
}


}

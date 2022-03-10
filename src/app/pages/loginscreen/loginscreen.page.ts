import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  ////initialize an FormGroup object call myForm
  myForm: FormGroup;
  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your email!' },
      { type: 'pattern', message: 'Email entered is incorrect.Try Again!' },
    ],
    password: [
      { type: 'required', message: 'Please enter your password!' },
      {
        type: 'minlength',
        message: 'The password must be at least 5 characters or more',
      },
    ],
  };
  //dependency injection of FormBuilder as an object call formbuilder.
  constructor(
    public formbuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    // constructing the formGroup object using formBuilder.
    this.myForm = this.formbuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  loginUser() {
    console.log('Am Logged In ');
    //using authService to login via firebase.
    this.authService.loginAuth(
      this.myForm.value.email,
      this.myForm.value.password
    );
  }
  // we dont want a menu to be slideable in the loginscreen SO using menu controller to enable side menu to false.
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  //if user clicks on forgotpassword ==> direct to forgot password page.
  goRecover() {
    this.router.navigate(['/forgotpassword']);
  }
}

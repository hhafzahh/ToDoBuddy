import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  //validation msgs or prompts that shows when user doesnt meet the criteria.
  validationMessages ={
    fName: [{type:"required",message:"Please enter your first Name"}],
    fLast: [{type:"required",message:"Please enter your last Name"}],
    email: [{type:"required",message:"Please enter your email"},{
      type:"pattern",message:"The email entered is incorrect,Try again.."
    }],
    mobileNum: [{type:"required",message:"Please enter your mobile number!"}],
    password: [{type:"required",message:"Password is required!!"},{
      type:"minLength",message:"Password must be at least 6 characters"
    }],
    username: [{type:"required",message:"Please enter your username"}],

  }
  //initialize an FormGroup object call validationFormUser
  validationFormUser:FormGroup;
  
  constructor(private menuCtrl:MenuController,private authService:AuthService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    // for validation msgs to show, below must be done! 
    this.validationFormUser = this.formBuilder.group({
      email:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      fName: new FormControl('',Validators.compose([
        Validators.required
      ])),
      fLast: new FormControl('',Validators.compose([
        Validators.required
      ])),
      mobileNum: new FormControl('',Validators.compose([
        Validators.required
      ])),
      username: new FormControl('',Validators.compose([
        Validators.required
      ])),
       
    })
}
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  signUpUser(){
   // console.log('sign up please');
    // using authService to register user into the firebase and set data into the firestore
    this.authService.register(this.validationFormUser.value.fName,this.validationFormUser.value.fLast,this.validationFormUser.value.mobileNum,this.validationFormUser.value.username,this.validationFormUser.value.email,this.validationFormUser.value.password);

  }

}

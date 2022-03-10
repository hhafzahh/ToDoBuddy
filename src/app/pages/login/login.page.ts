import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  
    constructor(public router:Router,private menuCtrl:MenuController) { }

  ngOnInit() {
   
     
    }
  
  //when user clicks login --> route the user to loginscreen
  goLogin(){
    this.router.navigate(['/loginscreen']);
  }
  //when user clicks sign up  --> route the user to sign up page.
  goRegister(){
    this.router.navigate(['/signup']);
   
  }

  // we dont want menu to show up in the login --> using the menucontroller to enable side menu false.
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
  

}

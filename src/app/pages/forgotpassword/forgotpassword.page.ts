import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  email:any;
  userid:any;
  constructor(private authService:AuthService,private auth:AngularFireAuth,private fs:AngularFirestore,private userService:UserServiceService) { }

  ngOnInit() {
  }
  reset(){
    //if user clicks reset password button then , reset email, using method foumd in AngularFireAuth
    // sendsPasswordResetEmail to user.
    if(this.email){
    this.auth.sendPasswordResetEmail(this.email).then((res)=>{
      // if successful
     
      console.log("email reset");
  
    }).catch(e =>{ //else 
      console.log(e);
    })
  }
}

}

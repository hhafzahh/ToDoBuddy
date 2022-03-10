import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import {AngularFireAuth} from '@angular/fire/auth'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

export interface User{
  username: string;
  uid: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  email:any;
  private user : User;
  currentUser: any = null;
  constructor(public auth:AngularFireAuth,private toastCtrl:ToastController,private router:Router,private firestore:AngularFirestore) {

   
   }
  // to validate users creditionals in Firebase Authentication.
  loginAuth(email,password){
    return this.auth.signInWithEmailAndPassword(email,password).then((user) =>{
      
      if(user){
        console.log(user);
        console.log(user.user.uid);
        //show toast upon successful
        const toast = this.toastCtrl.create({
          message:'success',
          duration:3000,
          position:'bottom'
        }).then(alert => alert.present());
        //if user is login , navigate to home page
        this.router.navigate(['/members']);
      }
    }).catch((error)=>{})
  }
  // logout() is to sign the user out of their account in Firebase Authentication.
  logout(){
    return this.auth.signOut().then(()=>{
      this.currentUser = null;
     // localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }
  getUid(){
    return this.user.uid;
  }
  resetPassword() {
    return this.auth.sendPasswordResetEmail(this.email).then((res)=>{
      console.log("email reset");
    }).catch(e =>{
      console.log(e);
    })
  }
 // register function is to add a user to firebase Authentication & firestore
  register(firstName,lastName,mobileNum,username,email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
     .then((newUser:any) => {
    console.log(newUser.user.uid)
    console.log(newUser.user.password)
    let userId = newUser.user.uid;
    //creating a user in firestore.
    let userDoc = this.firestore.doc<any>('users/' + userId);
        userDoc.set({
          firstName: firstName,
          lastName: lastName,
          mobileNumber:mobileNum,
          username:username,
          email: email,
          password:password
        });
    //toast shown
    const toast = this.toastCtrl.create({
    message: 'User created!',
    duration: 3000,
    position: 'bottom'
    }).then(alert => alert.present());
    // navifate user to login screen if successfull
    this.router.navigate(['/loginscreen']);
    }).catch((error) => {})
    }



}





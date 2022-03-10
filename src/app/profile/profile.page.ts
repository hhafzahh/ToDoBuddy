import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import { UserServiceService } from '../services/user-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UpdateProfilePage } from '../update-profile/update-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId:any;
  fireStoreTaskList:any=[];
  fireStoreList:any=[];
  userData:any =[];
  email
  firstName
  lastName
  password
  mobileNumber
  username
  constructor(private menuCtrl:MenuController,private modalCtrl:ModalController,private authService:AuthService,private firestore:AngularFirestore,private activatedRoute:ActivatedRoute,private userService:UserServiceService,private fireAuth:AngularFireAuth) {
    
   }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user=>{
      console.log("AUTH_USER",user);
      console.log(user.uid);
      this.userId = user.uid;
      //get user from firestore through service
      this.userService.getProfile(user.uid).subscribe(result=>{
        this.userData = result;
        console.log(result);
        this.email = this.userData.email;
        this.firstName  =this.userData.firstName;
        this.lastName = this.userData.lastName;
      
        this.password = this.userData.password;
        this.mobileNumber = this.userData.mobileNumber;
        this.username = this.userData.username;
      })
    })
    
    
  }
  async update(userId){
    const modal = await this.modalCtrl.create({
      component: UpdateProfilePage,
      
     // componentProps: {user: userId}
     //passs the values into the update profile page so that the previous values are shown
      componentProps: {user: this.userData}
    })

    modal.onDidDismiss().then(()=>{
      this.userService.getProfile(userId)
    })
    
    return await modal.present()
  }
}
    
    


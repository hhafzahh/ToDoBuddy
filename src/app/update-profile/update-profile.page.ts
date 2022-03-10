import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  @Input() user;
  email:any;
  userId:any;
  fireStoreTaskList:any = []
  fireStoreList:any = []
  newUserObj = {}
  username
  firstName 
  lastName
  password
  mobileNumber

  constructor(private modalCtrl:ModalController,private fireAuth:AngularFireAuth,private firestore:AngularFirestore) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.email = user.email;
        this.userId = user.uid;
        this.fireStoreTaskList = this.firestore.doc<any>('users/' + this.userId)
        this.fireStoreList = this.firestore.doc<any>('users/' + this.userId)
  }
   })
  }

  ngOnInit() {
    //user is we got it from profile page through Input()
    this.username = this.user.username
    this.firstName = this.user.firstName
    this.lastName = this.user.lastName
    this.password = this.user.password
    this.mobileNumber = this.user.mobileNumber
    console.log(this.user.username);
  }

  async dismis(){
    await this.modalCtrl.dismiss()
  }

  async update(){
    let id = this.userId;

    this.newUserObj = ({username:this.username, firstName:this.firstName, lastName:this.lastName,password:this.password,mobileNumber:this.mobileNumber})
 
    console.log(id);
    this.fireStoreList.update({ 
      //update user profile in firestore.
      id:id,
      username: this.username,
      firstName:this.firstName,
      lastName:this.lastName,
      password:this.password,
      mobileNumber: this.mobileNumber,
     
     
    });
  
   this.dismis()
  }
  
 
  
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  currentUser: any = null;
  userId:any;
  constructor(public auth:AngularFireAuth,private toastCtrl:ToastController,private router:Router,private firestore:AngularFirestore,private authServ:AuthService) {
    // using the onAuthStateChanged to get the current user is by setting an observer on the Auth object
    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user; 
      this.userId = user.uid
         
    });
   }
   //get users profile based on id 
   getProfile(id){
    return this.firestore.collection('users').doc(id).valueChanges();
   }
   // to get all tasks by a specific user
   getAllTasks(){
    // get currentUser uid and set to userId. --> specific user - gets the correct user
    // get task from users collection -> userId-> tasks collection
    this.userId = firebase.auth().currentUser.uid
    console.log(this.userId)
    //return this.firestore.collection('users').doc('GIFo5ADcvnQFNL9uFOpclR8lT6J2').collection('tasks').valueChanges();
    //value changes is automatically fired whenever something changes in the database linked to that tasks collection 
    return this.firestore.collection('users').doc(this.userId).collection('tasks').valueChanges();
}
//if user wants to delete the speciific task. -> parameters as id
delete(id){
  return this.firestore.collection('users').doc(this.userId).collection('tasks').doc(id).delete();
}
//if user wants to update the specific task 
// values that needs to be changed as parameters.
update(id,date,dateline,description,task,email){
  return this.firestore.collection('users').doc(this.userId).collection('tasks').doc(id).update({date:date,dateline:dateline,description:description,task:task,email:email});

}
//get password of user based on userId.
getPassword(){
  return this.firestore.collection('users').doc(this.userId).snapshotChanges();
}
}

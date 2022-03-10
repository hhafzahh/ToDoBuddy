import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonDatetime, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  //initialise categories as array
  categories =[];
  userId:any;
  email:any;
  fireStoreTaskList:any=[];
  fireStoreList:any=[];
  categorySelectedCategory

  newTaskObj = {}
  //variables for all the fields. these are the ones in the html [(ngModel)]="itemName"
  itemName
  itemDueDate 
  itemPriority
  itemCategory
  itemHours


  constructor(public modalCtlr: ModalController,private fireAuth:AngularFireAuth,private firestore:AngularFirestore,private authService:AuthService) {
    //get current user
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.email = user.email;
        this.userId = user.uid;
        this.fireStoreTaskList = this.firestore.doc<any>('users/' + this.userId).collection('tasks').valueChanges();
        this.fireStoreList = this.firestore.doc<any>('users/' + this.userId).collection('tasks');
  }
  })
   }

  ngOnInit() {
    this.categories.push('work')
    this.categories.push('personal')
  }
  
  async add(){
    // we want to have all the fields to be in a object so declare an object "newTaskObj" so that we can push the obj.data in the home page.
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory,itemHours:this.itemHours})
    console.log(this.newTaskObj);
  
    // create a task id 
    let id = this.firestore.createId();
    //using the set() method of the tasks colllection to create a new task object

    this.fireStoreList.doc(id).set({
    id: id,
    //pushing the itemName that was inputted into the taskList
    task:this.itemName,
    dateline:this.itemDueDate,
    email: this.email,
    category: this.categorySelectedCategory,
    priority: this.itemPriority,
    description: this.itemHours,
    date: Date.now() 
});
    this.dismis()
  }
  //this method will show which category is selected
  //since catergories is an array, so [index]
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }
  
}
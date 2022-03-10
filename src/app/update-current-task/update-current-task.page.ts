import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-update-current-task',
  templateUrl: './update-current-task.page.html',
  styleUrls: ['./update-current-task.page.scss'],
})
export class UpdateCurrentTaskPage implements OnInit {
  // to get the information -> use the Input

  @Input() task;
  categories =[]
  userId:any;
  email:any;
  categorySelectedCategory
  fireStoreTaskList:any=[];
  fireStoreList:any=[];
  newTaskObj = {}
  itemName
  itemDueDate 
  itemPriority
  itemCategory
  itemHours
  constructor(public modalCtlr:ModalController, public userService:UserServiceService,private fireAuth:AngularFireAuth,private firestore:AngularFirestore) {  
    //get current user using authState and get detaills too
    this.fireAuth.authState.subscribe(user => {
    if (user) {
      this.email = user.email;
      this.userId = user.uid;
      this.fireStoreTaskList = this.firestore.doc<any>('users/' + this.userId).collection('tasks').valueChanges();
      this.fireStoreList = this.firestore.doc<any>('users/' + this.userId).collection('tasks');
}
})}

  ngOnInit() {
    this.categories.push('work')
    this.categories.push('personal')


    this.itemName = this.task.task
    this.itemDueDate = this.task.dateline
    this.itemPriority = this.task.priority
    this.categorySelectedCategory = this.task.category;
    this.itemHours = this.task.description;
    //task is the values in the firestore before UPDATE. we got this through the input() and the componentProps
   console.log(this.task);
   console.log(this.task.date);
   console.log(this.task.description);
    
    
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  async update(){
    //
    let id =this.task.id
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory,itemHours:this.itemHours})
    console.log(id);
    //update the task in the firestore based onn the document id which is the task id 
    this.fireStoreList.doc(id).update({ 
      id:id,
      //push the inputted data into firestore
      //task,date,dateline is the KEY naming in the firestore.
      //this.itemDueDate,this.itemHours,this.itemName , is the Value in the firestore.
      // push the inputted value as value in firestore.
      task: this.itemName,
      date: Date.now(),
      dateline:this.itemDueDate,
      description:this.itemHours,
      priority: this.itemPriority,
      category: this.categorySelectedCategory,
      email:this.email
    });
 
   this.dismis()
  }
  
}
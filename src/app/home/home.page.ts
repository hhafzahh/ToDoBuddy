import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserServiceService } from '../services/user-service.service';
import firebase from 'firebase/app'
import { UpdateCurrentTaskPage } from '../update-current-task/update-current-task.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
//varaiable for dates - today.
today:number = Date.now();
userId:any;
 //create a tasks array that will populate the tasks there.
tasks:any =[];
fireStoreTaskList:any=[];
fireStoreList:any=[];
userIdd:any;
 // inject modalcontroller.
  constructor(public modalCtrl:ModalController,private alertCtrl:AlertController,private menuCtrl:MenuController,private fireAuth:AngularFireAuth,private firestore:AngularFirestore,private userService:UserServiceService) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid
        // fireStoreTaskList holds the list that we view
        //.valueChanges() -> any changes will shoow in this view.
        this.fireStoreTaskList = this.firestore.doc<any>('users/' + this.userId).collection('tasks').valueChanges(); 
        // this firestoreList is the reference to the collection where we directly add the new tasks.
        this.fireStoreList = this.firestore.doc<any>('users/' + this.userId).collection('tasks');
      }
      
    });
   
   
  
  }
  ngOnInit(){
    //get all tasks from user service.
    this.userService.getAllTasks().subscribe((data) => {
      this.tasks = data;
      console.log(data)
    });
  }
  //this method will create a model - this model is from add-new-task page.
  async addNewItem(){
    //using modal controller to do this
    const modal = await this.modalCtrl.create({
      component:AddNewTaskPage
    })
    //exeecute immediately after modal is dismissed 
    // below codes  is how u can get the data from it 
    modal.onDidDismiss().then(newTaskObj=>{
      console.log(newTaskObj.data);
      //call the tasks array and push the data in
      this.tasks.push(newTaskObj.data)    
    
    })


    return await modal.present()
  }
 //  this method will delete the task in firestore and remove the item from the view
  delete(id){
    const alert = this.alertCtrl.create({
      header:'Alert!!',
      message:"Are you sure you want to delete this task?",
      buttons:[
        {text:'Cancel',role:'cancel'},
        {text:'Yes',handler:(alertData)=>{
          console.log(id);
          //using the service to delete the item from firestore.
          this.userService.delete(id);
          // use splic in a indexOf(id) and 1. 1 here means one item.
          this.tasks.splice(this.tasks.indexOf(id),1);
         
        }}
      ]

    }).then(alert=>alert.present());
   
  }
 
  //update method to open the component updateCurrentTaskpAGE
  async update(selectedTask){
    const modal = await this.modalCtrl.create({
      component: UpdateCurrentTaskPage,
      //this will show the fields into the modal. basically the previous inputs
      // pass the selectedTask as parameter
      
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.userService.getAllTasks()
    })
    
    return await modal.present()
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  getTasks(){
    this.userIdd = firebase.auth().currentUser.uid
    console.log(this.userIdd)
    //console.log( this.firestore.collection('users').doc(this.userIdd).collection('tasks')
  }
}

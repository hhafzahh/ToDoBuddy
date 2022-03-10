import { Component ,Input,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalNotificationRequest, LocalNotifications } from '@capacitor/local-notifications';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

const circleR  = 80;
const circleDasharray = 2 * Math.PI* circleR;
@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  // behaviour subject to record the timer we are at - > 00:00
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');

  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  
  //variable timer as number
  timer:number; //in seconds
  duration:number;
  interval;
  state:'start' | 'stop' ='stop';
  startDuration = 5;
  myForm:FormGroup;

  circleR = circleR;
  circleDasharray = circleDasharray;
  
  constructor(private menuCtrl:MenuController,private fb:FormBuilder) { 
    
  }

   ngOnInit() {
     LocalNotifications.requestPermissions();
    try {
      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Notification: ', notification);
      });

      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log('Notification action performed', notification);
      });

    } catch (e) {
      console.log(e);
    }
  
    LocalNotifications.registerActionTypes({
      types:[
        {
          id:'Respond_MSG',
          actions:[
            {
              id: 'view',
              title:'Open Reminder'
            },
            {
              id:'remove',
              title:'Dismiss',
              destructive:true
            },
            {
              id:'respond',
              title:'Respond',
              input:true
            }
          ]
        }
      ]
    });

    this.myForm = this.fb.group({
      itemSeconds:new FormControl('',Validators.compose([
        Validators.required,
      
      ])),
    })
  }
 // function startTimer with duration as minutes
  startTimer(duration:number){
   // console.log(this.y)
    //console.log(this.input)
    this.state = 'start';
    clearInterval(this.interval);

    this.timer=duration;
    this.updateTimeValue();
    // this is the interval to update every 1 second
    this.interval = setInterval(()=>{
      //1000 means every second
      this.updateTimeValue();},1000);
      this.scheduleAdvanced();
    }
    stopTimer(){
      clearInterval(this.interval);
      this.time.next('00:00')
      this.state = 'stop'
      //if user stops the timing , notification will be turned off 
      const notifications: LocalNotificationRequest[] = [{ id : 3}]; 
       LocalNotifications.cancel({notifications});
     
    }
    //this doesnt work so ignore! for the round colour to clear//but this is design so ignore:)
    percentageOffset(percent){
      const percentFloat = percent/100;
      return circleDasharray * (1 - percentFloat);
    }
    updateTimeValue(){
      // minutes is timer (secoonds) divide by 60
      let minutes:any=this.timer/60;
      let seconds:any = this.timer % 60;

      //seconds to have 2 characters so if 1 then 01
      // convert numbers with 0 infront if its solo
      minutes = String('0'+ Math.floor(minutes)).slice(-2);
      seconds = String('0'+ Math.floor(seconds)).slice(-2);
      const text = minutes + ':' + seconds;
      this.time.next(text);
      const totalTime = this.startDuration *5;
      const percentage = ((totalTime - this.timer) / totalTime) *100;
      this.percent.next(percentage);
      //every tick , minus timer
      --this.timer;
      if(this.timer < -1){
        this.time.next('00:00')
        this.state= 'stop'
      }
    }
    //set notification to ring after 25mins
    //works! yay 
     scheduleAdvanced(){
       //schedule for 5mins
       LocalNotifications.schedule({
        notifications:[{
          title:"Todo List Reminder",
          body:"Timer Ended! Get Back To work!",
          id:3,
          actionTypeId:'Respond_MSG',
          schedule:{
            //secudule today after the inputted timing
           at: new Date( Date.now() + 1000 * this.startDuration ),
         
          },
          
        }]
      })
    }
    enter(){
      console.log(this.myForm.value.itemSeconds)
      // putting the startDuration as inputted value
      this.startDuration = this.myForm.value.itemSeconds
    }

  }


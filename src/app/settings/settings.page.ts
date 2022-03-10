import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private renderer:Renderer2,private route:Router) { }

  async ngOnInit() {
    //this willl ask the user to allow notifications
    await LocalNotifications.requestPermissions();
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
   
  }

  async scheduleBasic(){
    // get the options from the definition of schedule.
    await LocalNotifications.schedule({
      //schedule expects an array of notifications 
      notifications:[{
        //here add the details
        title:"Friendly Reminder",
        body:"Complete at least 1 task before going for a break!",
        id:1,
        schedule:{
          //schedule the local notifications after 3 seconds.
          at: new Date( Date.now() + 1000 * 3),
        
         }
      }]
    })
  }


  async scheduleAdvanced(){
    await LocalNotifications.schedule({
      notifications:[{
        title:"Todo List Reminder",
        body:"Please complete your tasks!!",
        id:2,
        actionTypeId:'Respond_MSG',
        schedule:{
         at: new Date( Date.now() + 1000 * 3600 ),
       
        },
        
      }]
    })
  }
  onToggleColorTheme(event){
    console.log(event.detail.checked);
    if(event.detail.checked){
      //document.body.setAttribute('color-theme','dark')
      this.renderer.setAttribute(document.body,'color-theme','dark');
    } else{
      //document.body.setAttribute('color-theme','light')
      this.renderer.setAttribute(document.body,'color-theme','light');
    }
    

  }
  player(){
    //if user clicks on play music , route to songs page
    this.route.navigate(['/members/songs'])
  }
  getAuthors(){
    //if user clicks on authors , route to authors page
    this.route.navigate(['/members/authors'])
  }

}

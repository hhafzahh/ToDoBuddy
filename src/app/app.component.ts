import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor( private menuController: MenuController,private authService:AuthService) {}
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/members',
      icon: 'home'
    },
    {
      title: 'Settings',
      url: '/members/settings',
      icon: 'settings'
    },
    {
      title: 'Profile',
      url: '/members/profile',
      icon: 'person'
    },
   


  ];
  showTabs = true; // <-- show tabs by default
close() {
  this.menuController.close("main");
  }
  ngOnInit() {
       
      }
      userLogout(){
        this.authService.logout();
      }
    
  }
  
 
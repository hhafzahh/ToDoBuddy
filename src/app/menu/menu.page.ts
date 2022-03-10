import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
//import{IonicPage,NavController,NavParams,Nav} from 'ionic-angular';
export interface PageInterface{
  title:string;
  pageName:string;
  tabComponent?:any;
  index?:number;
  icon:string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  rootPage = 'TabsPage';


  pages =[
    {
      title:'First Page with tabs',
      url:'menu/home'
    },
    {
      title:'Second Page with tabs',
      url:'menu/settings'
    }
  ];
  selectedPath='';
  constructor(private router:Router) {
    this.router.events.subscribe((event:RouterEvent)=>
  {
    if(event && event.url){
      this.selectedPath = event.url
    }
  })
}

  ngOnInit() {
  }

}

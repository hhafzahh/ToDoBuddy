import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorsAPIService } from 'src/app/authors-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  selected:any={};
  constructor(private activatedRoute:ActivatedRoute,private authorsService:AuthorsAPIService) { }

  ngOnInit() {
    //get the name that wwas passed with the url
    let name = this.activatedRoute.snapshot.paramMap.get("name");
    //get the information of the author from the api
    this.authorsService.getDetails(name).subscribe(result=>{
    //  this.selected = result[0];
    this.selected = result
    console.log(this.selected.quotes)
    });
  }

  

}
import { Component, OnInit } from '@angular/core';
import { AuthorsAPIService } from '../authors-api.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  styleUrls: ['./authors.page.scss'],
})
export class AuthorsPage implements OnInit {
  results:any = [];
  constructor(private authorsService:AuthorsAPIService) {
    ///call the loadAll function in authorsService
    this.authorsService.loadAll().subscribe((data)=>{
     
      this.results = data
      //this.results has alot of other variables like message,succes.. but we want authors only so theres loop in this.result.authors instead of this.results
      console.log(this.results.authors)
    });
   }

  ngOnInit() {
  }
  
  }


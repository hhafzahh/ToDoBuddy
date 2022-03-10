import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorsAPIService {
  results:any;
  constructor(private http:HttpClient) { 
  }
  //getting data from here: https://goquotes.docs.apiary.io/#
  getDetails(name){
    //call this when author is clicked on
    //based on type as author and value as author's name
    return this.http.get("https://goquotes-api.herokuapp.com/api/v1/all?type=author&val="+name);
  }
  loadAll(){
    //calls when app loads to display all authors.
    return this.http.get("https://goquotes-api.herokuapp.com/api/v1/all/authors");
  }

 
}

import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,filter,map, mergeMap } from 'rxjs';
import { BookService } from './book.service';
import { Book } from './book';
import { HttpEventType, HttpResponse } from '@angular/common/http';


interface emp {
  Id: number;
  Name: string;
}

class Abc {
  constructor() {
    console.log('abc constructor called ..');
  }
  display(name: string) {
    console.log('Hello : ' + name + 'from Abc Class');
  }
}

class EmployeeSameAppComp {
  private empCode: String;
  empName: String;

  private fun() {
    let name = 'Ajeet';
    console.log(name);
  }
}

class MyClass {
  name1: String; //Here, name1 is public by default

  private name2: string;

  protected name3: string;

  fun3() {
    console.log(this.name2);
  }
}

class MySubClass extends MyClass {
  fun() {
    console.log(this.name1);
    //console.log(this.name2); //Give error because name2 is private
    console.log(this.name3);
  }
}

class MySubChildClass extends MySubClass {
  fun2() {
    console.log(this.name3);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true,
  viewProviders: [Abc, EmployeeSameAppComp], //viewProviders is for using class.
  encapsulation: ViewEncapsulation.None,

  providers: [], //Making service component level ; //21-March-2023
})


export class AppComponent {

  title="Angular Tutorial";

  //Variables for storing data returned from methods
  Allbooks:Book[];
  Allbooks$: Observable<Book[]>; //<------- for async pipe

  searchbook:Book[];
  searchbook1:Book[];

 Obfullresponse:Book[] ;
 REfullresponse:HttpResponse<Book[]>;

   
  constructor(private _bookService:BookService)
  {}

  ngOnInit()
  {
    this.getmyAllbooks();
    this.filterAllbooks('Angular Book','2020');
    this.filterAllbooks1('React Book','2019');
    this.OBgetfullbookresponse();
    this.REgetfullbookresponse();
    //below is for event optional parameter that only works with realtime api
    //this.getfullbookresponse();
  }

  getmyAllbooks()
  {
    this._bookService.getAllBooks().subscribe(response=>{
      this.Allbooks=response;
    })

    this.Allbooks$ = this._bookService.getAllBooks();
    
  }


  // Example Sending Header as optional parameter
  filterAllbooks(category:string,year:string)
  {

    this._bookService.filterbooks(category,year)
    .subscribe(response=>{
      this.searchbook=response;
    })

  }


  //Param Example
  filterAllbooks1(category: string, year: string) {
    this._bookService.filterbooks(category, year).subscribe(res => {
      this.searchbook1 = res;
    })
  }

//For debugging purpose we use Observe "body"
  OBgetfullbookresponse() {
    this._bookService.Obgetfullresponse().subscribe(res => {
    //  debugger;
       this.Obfullresponse=res;
    })
  }

//For debugging purpose we use Observe "response"
  REgetfullbookresponse() {
    this._bookService.REgetfullresponse().subscribe(res => {
    //  debugger;
       this.REfullresponse=res;

    })
  }


  getfullbookresponse() {
    this._bookService.getfullresponse().subscribe(res => {
      
     // debugger;
   
      if (res.type == HttpEventType.Sent) {
        console.log("Resquest has been sent to server");
      } else if (res.type == HttpEventType.UploadProgress) {
        console.log("upload in progress");
      } else if (res.type == HttpEventType.ResponseHeader) {
        console.log("Header received");
      } else if (res.type == HttpEventType.DownloadProgress) {
        console.log('download in progress');
      } else if (res.type == HttpEventType.Response) {
        console.log("full response obtained");
      }


      // if(res.status==200){
      //   this.fullresponse=res;
      // }else{
      //   console.log("No Data Found");
      // }

    })
  }

  
}





























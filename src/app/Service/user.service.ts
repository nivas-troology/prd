import { Injectable } from '@angular/core';
import { AppComponent } from './../app.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import{ RequestOptions,Headers } from '@angular/http';
import { Observable, observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//import { Server } from 'http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient) { }

  Token:any =(sessionStorage.getItem("UserToken"));
  
  SaveUser(user:any):Observable<any>
  {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.post<any>(AppComponent.apiUrl+"User",user,  {
      headers: headers,
      observe:"body"
    });
  }

  GetUsers():Observable<any>
  {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.get<any>(AppComponent.apiUrl+"User/GetUsers",{ headers: headers } );
  }

  DeleteUser(Id:number):Observable<any>
  {
    return this.httpclient.delete<any>(AppComponent.apiUrl+"User/"+Id);
  }
  Login(UserName:string,Password:string):Observable<any>
  {
    debugger
    return this.httpclient.get<any>(AppComponent.apiUrl+"User/VerifyLogin/"+UserName+"/"+Password+"");
  }

  GetLoginDetails(UserLoginId:any):Observable<any>
  {

  return this.httpclient.get<any>(AppComponent.apiUrl+"User/GetLoginDetails?UserLoginId="+UserLoginId);
  }

  
  ChangePassword(UserLoginId:any,NewPassword:any):Observable<any>
  {
   
    debugger;
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Auth-token', this.Token);
      const options = new RequestOptions({ headers: headers});
      console.log(options);
    return this.httpclient.post<any>(AppComponent.apiUrl+"User/ChangePassword?UserLoginId="+UserLoginId+"&NewPassword="+NewPassword, options);
    
  }
  InsertNotification(activity:any): Observable<any>
  {
    debugger
    console.log(activity);
    const body = JSON.stringify(activity);
    return this.httpclient.post<any>(AppComponent.apiUrl + 'MangalDal/MDActivities234/', activity, {   
     observe: 'body'     
    }
    ).pipe(
      catchError(err => {
          return throwError(err);
      })
    );
  }
}

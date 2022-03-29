import { AppComponent } from './../app.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpclient:HttpClient) { }

  // Get Registered Jawans Count
  GetRegisteredPRDJawanCount(ZoneId:number,DistId:number):Observable<any>
  {
return this.httpclient.get<any>(AppComponent.apiUrl+"Dashboard/GetRegisteredPRDJawanCount?ZoneId="+ZoneId+"&DistId="+DistId)
  }

   // Get Available Jawans Count
   GetAvailablePRDJawanCount(ZoneId:number,DistId:number):Observable<any>
   {
 return this.httpclient.get<any>(AppComponent.apiUrl+"Dashboard/GetAvailablePRDJawanCount?ZoneId="+ZoneId+"&DistId="+DistId)
   }
}

import { logging } from 'protractor';
import { AppComponent } from './../app.component';
import { policeStation } from './../Model/policestation';
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders,HttpRequest} from '@angular/common/http';
import{ RequestOptions,Headers } from '@angular/http';
import {district} from './../Model/district';
import { Observable, of, from} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PoliceStationService {
  http: any;
  Token:any =(sessionStorage.getItem("UserToken"));
  
  constructor(private httpClient:HttpClient) { }
  //getLoggedInUser(auth_token): Observable<any> 
  

  
  getDistrict(zoneId):Observable<any>{
    
    var districtlist= this.httpClient.get<any>(AppComponent.apiUrl+'District/GetDistrict?zoneId='
     );
     
     console.log(districtlist);
     return districtlist;

   }
   savePoliceStation(policestation:policeStation):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
  // const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer`+this.Token}) 
    return this.httpClient.post<any>(AppComponent.apiUrl+'Thana',policestation,
    {
      
      headers: headers,
      observe:"body"
   
    })    
 
   }
  
   getPoliceStation():Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})    
    var policestationList= this.httpClient.get<any>(AppComponent.apiUrl+'Thana', { headers: headers }
     );
     console.log(policestationList);
     return policestationList;
    
   }
   UpdatePoliceStation(policestation:policeStation):Observable<any>{
     console.log(policestation);
  
     const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpClient.post<any>(AppComponent.apiUrl+'Thana',policestation,
    {
      headers: headers,
      observe:"body"
    })
   }
   DeletePoliceStation(id)
   {
    console.log(id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
   
    return this.httpClient.delete<any>(AppComponent.apiUrl+'Thana/'+id, { headers: headers });
    
   }
}

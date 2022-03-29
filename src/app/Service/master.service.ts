import { AppComponent } from './../app.component';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BlockMaster, Site } from '../Model/master';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private httpclient:HttpClient) { }
  getDesignation():Observable<any>
  {
    var url=AppComponent.apiUrl+"Master/GetDesignation";
    var lst= this.httpclient.get<any>(url);
console.log(lst);
return lst;
  }
  getZone(zoneId):Observable<any>
  {
    var url=AppComponent.apiUrl+"Master/GetZone?zoneid="+zoneId;
    var lst= this.httpclient.get<any>(url,zoneId);

return lst;
  }
  getDistrict(zoneId,distId):Observable<any>{
    var url=AppComponent.apiUrl+"District/GetDistrict?zoneid="+zoneId+"&distId="+distId;
    var districtlist= this.httpclient.get<any>(url,zoneId
     );
  
     return districtlist;
    
   }
   getCompany(distId,blockId):Observable<any>{
    var url=AppComponent.apiUrl+"Master/GetCompany?distId="+distId+"&blockId="+blockId;
    var companylist= this.httpclient.get<any>(url,distId
     );
  
     return companylist;
    
   }
   getBlock(distId):Observable<any>{
    var url=AppComponent.apiUrl+"Master/GetBlock?distId="+distId;
    var Blocklist= this.httpclient.get<any>(url,distId
     );
  
     return Blocklist;
    
   }

   getThana(distId):Observable<any>{
    var url=AppComponent.apiUrl+"Master/GetThana?distId="+distId;
    var Thanalist= this.httpclient.get<any>(url,distId
     );
  
     return Thanalist;
    
   }
   getRole():Observable<any>
   {
     return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetRole");
   }

   Addsite(site:Site):Observable<any>
   {
     return this.httpclient.post<any>(AppComponent.apiUrl+"Master/Site",site,{headers:new HttpHeaders({
      'Content-type':'application/json'
    }
    ),observe:"body"
  });
   }
   GetSites(ThanaId:number):Observable<any>
   {
     return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetSites?ThanaId="+ThanaId);
   }
  
   GetYear():Observable<any>
   {
    return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetYear");
   }
 
   GetMonth(YearId:number):Observable<any>
   {
    return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetMonth?YearId="+YearId);
   }

   
   GetGramPanchayat(BlockId:number):Observable<any>
   {
    return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetGramPanchayat?BlockId="+BlockId);
   }
   GetTeamType():Observable<any>
   {
    return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetTeamType");
   }
   GetBlockDetails():Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetBlockDetails")
  }
  GetBlockDetailsById(BlockId: any): Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"Master/GetBlockDetailsById/" +BlockId).pipe(
      catchError(err => {
          return throwError(err);
      })
     );
  } 
 
   getDistrictDetails():Observable<any>{
    
    var districtlist= this.httpclient.get<any>(AppComponent.apiUrl+'District/GetDistrict?zoneId='
     );
     
     console.log(districtlist);
     return districtlist;

   }
   PostBlockDetails(blockMaster:BlockMaster):Observable<any>{  

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}) 
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer`+this.Token}) 
      return this.httpclient.post<any>(AppComponent.apiUrl+'Master/PostBlockDetails',blockMaster,
      {
        
        headers: headers,
        observe:"body"
     
      })
    
   
 
   }
   UpdateBlockDetails(blockMaster:BlockMaster):Observable<any>{
    console.log(blockMaster);
 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}) 
   return this.httpclient.post<any>(AppComponent.apiUrl+'Master/PostBlockDetails',blockMaster,
   {
     headers: headers,
     observe:"body"
   })
  }
  DeleteBlockDetails(blockId:number):Observable<any>
  {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}) 
    return this.httpclient.post<any>(AppComponent.apiUrl+"Master/DeleteBlockDetails?BlockId="+blockId,{
      headers:headers
    });
    
  }
  //#region Merge Code
  GetRegistrationDisabled(DistrictId: number): Observable<any> {
    return this.httpclient.get<any>(AppComponent.apiUrl + "Master/GetRegistrationDisabled?distId=" + DistrictId);
  }
  GetSitesByDistrict(DistId: number): Observable<any> {
    return this.httpclient.get<any>(AppComponent.apiUrl + "Master/GetSitesByDistrict?distId=" + DistId);
  }
  //#endregion
}

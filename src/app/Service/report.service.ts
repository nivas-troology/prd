import { AppComponent } from './../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  Token:any =(sessionStorage.getItem("UserToken"));
  constructor(private HttpClient:HttpClient) { }
  //GetJwanCountByZone
  GetJawanCountByZone(ZoneId:any):Observable<any>
  {
    
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetJawanCountByZone?ZoneId="+ZoneId);
  }
  GetJawanCountByDistrict(ZoneId:any):Observable<any>
  {
    
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetJawanCountByDistrict?ZoneId="+ZoneId);
  }
  
  GetJawanCountByCompany(DistId:any):Observable<any>
  {
    
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetJawanCountByCompany?DistId="+DistId);
  }
  GetJawansByDistrict(CompId:any):Observable<any>
  {

    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetJawanDetailByDistrict?CompId="+CompId);
  }

 /*  GetDutyAllocation(FromDate:string,ToDate:string,ServiceNo:string,ThanaId:number):Observable<any>
  {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetDutyAllocation?FromDate="+FromDate+"&ToDate="+ToDate+"&ServiceNo="+ServiceNo+"&ThanaId="+ThanaId,{headers:headers});
  } */
  GetDutyAllocation(FromDate: string, ToDate: string, ServiceNo: string, ThanaId: number, SiteId: number, UserLoginId: number): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}` })
    return this.HttpClient.get<any>(AppComponent.apiUrl + "Report/GetDutyAllocation?FromDate=" + FromDate + "&ToDate=" + ToDate + "&ServiceNo=" + ServiceNo + "&ThanaId=" + ThanaId + "&SiteId=" + SiteId + "&UserLoginId=" + UserLoginId, { headers: headers });
  }

  GetWagesDetail(YearId?:number,MonthId?:number,CompanyId?:number,residanceTypeCurrent?:string):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})   
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetWagesDetail/"+YearId+"/"+MonthId+"/"+CompanyId+"/"+residanceTypeCurrent,{headers:headers});
  }
   //get Punishment Jawan Service
   getPunishmentJawan(ZoneId:number,DistId:number,CompanyId:number,residanceTypeCurrent?:string):Observable<any>
   {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})  
     return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetPunishmentDetail/"+ZoneId+"/"+DistId+"/"+CompanyId+"/"+residanceTypeCurrent,{headers:headers});
 
   }
   
   //get Retirement Jawan Service
   getRetirementJawan(ZoneId:number,DistId:number,CompanyId:number,residanceTypeCurrent?:string):Observable<any>
   {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})  
     return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetRetirementDetail/"+ZoneId+"/"+DistId+"/"+CompanyId+"/"+residanceTypeCurrent,{headers:headers});
 
   }
        //get Attendance Jawan Service
        getJawanAttendance(ZoneId:number,DistId:number,CompanyId:number, YearId?:number, MonthId?:number):Observable<any>
        {
          const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})  
    
          return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetAttendanceReport/"+ZoneId+"/"+DistId+"/"+CompanyId+"/"+YearId+"/"+MonthId,{headers:headers});
      
        }
          //GetDutyLogService
       getJawanDutyLogStatus(ServiceNo:string):Observable<any>
       {
         const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})     
       return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetDutyLogReport/"+ServiceNo,{headers:headers});
       }
          //getJawanBioDataStatus
    
       GetBioDataResult(ServiceNo:string):Observable<any>
      {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})     
        return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetBioDataResult/"+ServiceNo,{headers:headers})
      }

    //-----------------------------Sushma---------------------------------------------
    getRegistrationLst(ZoneId):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})     
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/RegistrationRptLst/"+ZoneId,{headers:headers})
  }
  getPendingRTList(ZoneId,MRoleId):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})     
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/PendingRTList/"+ZoneId+"/"+MRoleId,{headers:headers})
  }
  getJwnRegistrationSummaryLst(ZoneId):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})     
    return this.HttpClient.get<any>(AppComponent.apiUrl+"Report/GetRegistrationSummaryLst/"+ZoneId,{headers:headers})
  }
  
}

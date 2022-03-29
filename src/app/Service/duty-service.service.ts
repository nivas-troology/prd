import { AppComponent } from './../app.component';
import { policeStation } from './../Model/policestation';
import { employee, EmployeeReg, empTraining } from './../Model/employee';
import { Observable, observable } from 'rxjs';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {dutyAllocation} from './../Model/duty';
@Injectable({
  providedIn: 'root'
})
export class DutyServiceService {
  Token:any =(sessionStorage.getItem("UserToken"));
  
  constructor(private httpclient:HttpClient) { }
  GetRegisterdJawansForAvailability(ZoneId:number,DistId:number,BlockId:number,CompanyId:number,ServiceNo:string):Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"DutyAvailability/GetJawanForAvailability?ZoneId="+ZoneId+"&DistId="+DistId+"&BlockId="+BlockId+"&CompanyId="+CompanyId+"&ServiceNo="+ServiceNo);
  }


  MakeJawanAvailableUnavailble(empList:[]):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.post<any>(AppComponent.apiUrl+"DutyAvailability/MakeJawanAvailableUnavailble",empList,
    {headers:headers,
      observe:"body"
  });
  }

  //Get Available For Duty
  GetAvailableJawanForDuty(Obj):Observable<any>
  {
return this.httpclient.post<any>(AppComponent.apiUrl+"DutyAllocation/GetAvailableJawanForDuty",Obj,{
  headers:new HttpHeaders({
    'Content-type':'application/json'
  }
  ),observe:"body"
});
  }
  GetAvailableJawanForDutyByServiceNo(DistId,ServiceNo)
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"DutyAllocation/GetAvailableJawanForDutyByServiceNo?DistId="+DistId+"&ServiceNo="+ServiceNo);
  }

  //DutyAllocation
  DutyAllocation(dutyallocation:dutyAllocation[]):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"DutyAllocation",dutyallocation,{headers:new HttpHeaders({
      'Content-type':'application/json'
    }
    ),observe:"body"
  })
  }

  //GetPreviousDuties
  GetPrevioustDuties(SiteId:number):Observable<any>
  {
   return this.httpclient.get<any>(AppComponent.apiUrl+"DutyAllocation/GetPrevioustDuties?SiteId="+SiteId);
  }

  //GetJwan For Swapping
  GetJawanForSwapping(ServiceNo:string):Observable<any>
  {
return this.httpclient.get<any>(AppComponent.apiUrl+"DutySwapping/GetJawanForSwapping?ServiceNo="+ServiceNo);
  }

  //Duty Swapping
  DutySwapping(Dutylst:any):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"DutySwapping/DutySwapping",Dutylst,{
      headers:new HttpHeaders({
        'Content-type':'application/json'
      }
      ),observe:"body"
    

    })
  }
//Get Jawan For Attendance

GetJawanForAttendace(SiteId:number,MonthId:number,DateFrom,DateTo):Observable<any>
{
  return this.httpclient.get<any>(AppComponent.apiUrl+"Attendance/GetJawanForAttendace?SiteId="+SiteId+"&MonthId="+MonthId+"&DateFrom="+DateFrom +"&DateTo="+DateTo);
}

//SaveAttendance
SaveAttendance(saveObj:any):Observable<any>
{
  return this.httpclient.post<any>(AppComponent.apiUrl+"Attendance/SaveAttendance",saveObj,{
    headers:new HttpHeaders({
      'Content-type':'application/json'
    }
    ),observe:"body"
  
  })
}

// Get Jawan for Wage Calculation
GetJawanAttendance(YearId:number,MonthId:number,SiteId:number,DateFrom:string,DateTo:string):Observable<any>
{
  return this.httpclient.get<any>(AppComponent.apiUrl+"Attendance/GetJawanAttendance?YearId="+YearId+"&MonthId="+MonthId+"&SiteId="+SiteId+"&DateFrom="+DateFrom+"&DateTo="+DateTo);
}

// Save Wages
SaveWages(Wagelst:any):Observable<any>
{
  return this.httpclient.post<any>(AppComponent.apiUrl+"Attendance/SaveWages",Wagelst,{
    headers:new HttpHeaders({
      'Content-type':'application/json'
    }
    ),observe:"body"
  
  })
}

// Get Jawan Wages

GetJawanWages(YearId:number,MonthId:number,SiteId:number):Observable<any>
{
  return this.httpclient.get<any>(AppComponent.apiUrl+"Attendance/GetJawanWages/"+YearId+"/"+MonthId+"/"+SiteId);
}

// Save Wages Settlement
SaveWagesSettlement(Settlement:any):Observable<any>
{
  return this.httpclient.post<any>(AppComponent.apiUrl+"Attendance/SaveWagesSettlement",Settlement,{
    headers:new HttpHeaders({
      'Content-type':'application/json'
    }
    ),observe:"body"
  
  })
}
 //GetMdutyAllocationService
 getMdutyAllocationStatus(ServiceNo:string):Observable<any>
 {
 return this.httpclient.get<any>(AppComponent.apiUrl+"DutyAllocation/GetMDutyAllocation/"+ServiceNo);
 }
 //Manual Duty Allocation
  
JawanMDutyAllocation(dutyAllocation:any):Observable<any>
{
 return this.httpclient.post<any>(AppComponent.apiUrl+"DutyAllocation/JawanMDutyAllocation",dutyAllocation,{headers:new HttpHeaders({ 'Content-type':'application/json'}),observe:"body"})
 }
}


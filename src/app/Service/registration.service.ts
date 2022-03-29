import { AppComponent } from './../app.component';
import { policeStation } from './../Model/policestation';
import { employee, EmployeeReg, empTraining, empContact } from './../Model/employee';
import { Observable, observable } from 'rxjs';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import{ RequestOptions,Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { JawanApprovalDTO} from './../Model/JawanApprovalDTO';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  Token:any =(sessionStorage.getItem("UserToken"));
  constructor(private httpclient:HttpClient) {
   this.defaultvalueset();
   }
   
  saveEmployee(employee:EmployeeReg):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
   
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg",employee, {
      headers:headers,
      observe:"body"
    })

  }
  errorHandler(error:HttpErrorResponse)
  {
    return Observable.throw(error.message || "Server Error");
  }
  
  getTrainingDetails(empid):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})   
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetTrainingDetails?EmpId="+empid,{headers:headers})
  }

  getBioData(empid):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})     
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetBioData?EmpId="+empid,{headers:headers})
  }
//get Jawan Service
  getJawan(ZoneId:number,DistId:number,BlockId:number,CompanyId:number,AppNo:string,Status:string):Observable<any>
  {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetJawans?ZoneId="+ZoneId+"&DistId="+DistId+"&BlockId="+BlockId+"&CompanyId="+CompanyId+"&AppNo="+AppNo+"&Status="+Status,{headers: headers});

  }
 
  //Jawan Approval Service
  JawanApproval(jawanApprovalDTO:JawanApprovalDTO):Observable<any>
  {
   var body= JSON.stringify(jawanApprovalDTO);
    console.log(body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
        return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/JawanApproval",body,{
        headers: headers,
        observe:"body"
    })
  }
  JawanRevert(jawanApprovalDTO:JawanApprovalDTO):Observable<any>
  {
    debugger;
   var body= JSON.stringify(jawanApprovalDTO);
    console.log(body);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
        return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/RevertJawan",body,{
        headers: headers,
        observe:"body"
    })
  }
  getDetailAppNo(AppNo):Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetDetailByAppNo?AppNo="+AppNo);
  }
  updateJawan(jawan:EmployeeReg):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'})    
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/UpdateJawan",jawan, {
      headers:headers,
      observe:"body"
    })

  }

  GetJawanForEdit(UserLoginId):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetJawanForEdit?UserLoginId="+UserLoginId,{ headers:headers});
  }
  GetHeadOfficeJawanForEdit(AppNo: string):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetHeadOfficeJawanForEdit?AppNo="+AppNo,{ headers:headers});
  }
 
  UpdateTraining(empTraining:empTraining):Observable<any>
  {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/UpdateTrainingDetails",empTraining,{headers:headers,observe:"body"
  }
    
    );
  }
  DeleteTraining(empTraining:empTraining):Observable<any>
  {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/DeleteTrainingDetails",empTraining,{
      headers:headers,
      observe:"body"
  }
    
    );
  }

  //Registered Jawan Detail
  GetRegisterdJawans(ZoneId:number,DistId:number,BlockId:number,CompanyId:number,ServiceNo:string,Status:string,Gender:string,EmpSkill:string,EmpCaste:string,residanceTypeCurrent:string)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetRegisterdJawans?ZoneId="+ZoneId+"&DistId="+DistId+"&BlockId="+BlockId+"&CompanyId="+CompanyId+"&ServiceNo="+ServiceNo+"&JawanStatus="+Status+"&Gender="+Gender+"&EmpSkill="+EmpSkill+"&EmpCaste="+EmpCaste+"&ResidanceTypeCurrent="+residanceTypeCurrent,{headers:headers});
  }

  //Update Document Details
  UpdateDocumentDetails(employee:any):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/UpdateDocumentDetails",employee,{
      headers:headers,
      observe:"body"})
  }

  //GetJawanForTransfer
  GetJawanForTransfer(ServiceNo:string):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
   
   return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetJawanForTransfer?ServiceNo="+ServiceNo,{ headers:headers});
  }
  //JawanTransfer
  JawanTransfer(empContact:any):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
   
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/JawanTransfer",empContact,{ 
      headers:headers,
      observe:"body"
    })
  }

  //Jawan Punishment
  JawanPunishment(Punishment:any):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
   
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/JawanPunishment",Punishment,{
      headers:headers,
      observe:"body"})
  }

  defaultvalueset(): void 
  {
   
  }
   //GetJawanForDelete
   GetJawanForDelete(ServiceNo:string):Observable<any>
   {
     const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    
    return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetJawanForTransfer?ServiceNo="+ServiceNo,{ headers:headers});
   }
  //---------------------
  DeleteJawanDetails(empId:number):Observable<any>
  {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/DeleteJawanDetails?EmpId="+empId,{
      headers:headers
    });
    
  }
  DeleteDeathJawan(employee:any):Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`}) 
   
    return this.httpclient.post<any>(AppComponent.apiUrl+"PRDReg/DeleteDeathJawan",employee,{
      headers:headers,
      observe:"body"})
  }
   //get Punishment Jawan Service
   GetDeleteDeathJawanDetail(ZoneId:number,DistId:number,CompanyId:number,residanceTypeCurrent?:string):Observable<any>
   {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})  
     return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetDeleteDeathJawanDetail/"+ZoneId+"/"+DistId+"/"+CompanyId+"/"+residanceTypeCurrent,{headers:headers});
 
   }
   GetJawanDeathCertificate(empid):Observable<any>
   {
     const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.Token}`})     
     return this.httpclient.get<any>(AppComponent.apiUrl+"PRDReg/GetJawanDeathCertificate?EmpId="+empid,{headers:headers})
   }
}

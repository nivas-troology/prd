import { AppComponent } from './../app.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { MdactivityImage } from '../mangal-dal/add-activities/add-activities.model';
import { AnyARecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class MangalDalService {


  constructor(private httpclient:HttpClient) { }

  Registration(User:any):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/MDRegistration",User,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
  Login(User:any):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/Login",User,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
  OrgRegistration(Team):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/SaveOrganisation",Team,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
  
  GetOrganisationDetails(UserLoginId):Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetOrganisationDetails?UserLoginId="+UserLoginId)
  }
  GetMemberDesignation():Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMemberDesignation")
  }

  MemberRegister(Member):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/MemberRegister",Member,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
  GetMemberDeailsByTeam(TeamId)
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMemberDeailsByTeam?TeamId="+TeamId)
  }

  UpdateMember(Member):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/UpdateMember",Member,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
  DeleteMember(Member):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/DeleteMember",Member,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
  AddAttachment(Attachments):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/AddAttachment",Attachments,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }

  
  GetAttachementDetails(TeamId)
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetAttachementDetails?TeamId="+TeamId)
  }

  //GetMangal Dal For Approval
  GetMangalDalDetailsForApproval(DistId,BlockId,GpId)
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMangalDalDetailsForApproval/"+DistId+"/"+BlockId+"/"+GpId);
  }

  ////Approval By District
  ApprovalTeam:any={
    TeamId:null,
    Remarks1:null,
    Status1:null,
    Remarks2:null,
    Status2:null,
    UserLoginId:null,
    ValidFrom:null,
    ValidTo:null,
    CertificateNo:null
  }
  ApprovalByDistrict(TeamId,Remark,Status,UserLoginId,ValidFrom,ValidTo,CertificateNo)
  {
this.ApprovalTeam.TeamId=TeamId;
this.ApprovalTeam.Remarks2=Remark;
this.ApprovalTeam.Status2=Status;
this.ApprovalTeam.UserLoginId=UserLoginId;
this.ApprovalTeam.ValidFrom=ValidFrom;
this.ApprovalTeam.ValidTo=ValidTo;
this.ApprovalTeam.CertificateNo=CertificateNo;


    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/ApprovalByDistrict",this.ApprovalTeam,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    });
  }

   ////Approval By Block
   ApprovalByBlock(TeamId,Remark,Status,UserLoginId)
   {
    this.ApprovalTeam.TeamId=TeamId;
    this.ApprovalTeam.Remarks1=Remark;
    this.ApprovalTeam.Status1=Status;
    this.ApprovalTeam.UserLoginId=UserLoginId;

     return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/ApprovalByBlock",this.ApprovalTeam,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    });
   }

   // For Manual Entry
   MangalDalEntry(Team):Observable<any>
  {
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/MangalDalEntry",Team,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
   GetMangalDalDetails():Observable<any>
   {
     return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMangalDalDetails")
   }
   UpdateMangalDalDetails(Team):Observable<any>
   {
     return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/UpdateMangalDalDetails",Team,{
       headers:new HttpHeaders({
         'Content-type':'application/json',
         'accept':'text/json'
       }
       ),observe:"body"
     
     })
   }
   DeleteMangalDalDetails(Team):Observable<any>
   {
     return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/DeleteMangalDalDetails",Team,{
       headers:new HttpHeaders({
         'Content-type':'application/json',
         'accept':'text/json'
       }
       ),observe:"body"
     
     })
   }
   //------------------------------------------------------------MangalDal---------------------------------------------------------------------
/*    InsertActivity(Activity): Observable<any>
   {
     debugger
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/MDActivities",Activity,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  } */
  InsertActivity(activity:any): Observable<any>
  {
    debugger
    console.log(activity);
    const body = JSON.stringify(activity);
 /*    const body2=JSON.stringify(RecordImg);
 
    console.log(body2); */
    return this.httpclient.post<any>(AppComponent.apiUrl + 'MangalDal/MDActivities/', activity, {   
     observe: 'body'     
    }
    ).pipe(
      catchError(err => {
          return throwError(err);
      })
    );
  }
  InsertImageActivity(activity: any,ActivityId): Observable<any>
  {
    console.log(activity);
    const body = JSON.stringify(activity);
    console.log(body);
    return this.httpclient.post<any>(AppComponent.apiUrl + 'MangalDal/UploadImage/'+ActivityId, activity, {
     
      observe: 'body'
      
    }
    ).pipe(
      catchError(err => {
          return throwError(err);
      })
    );
  }
  GetMDActivityDetails():Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMDActivityDetails")
  }
  DeleteMDActivityDetails(Activity):Observable<any>
  {
    debugger
    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/DeleteMDActivityDetails",Activity,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/json'
      }
      ),observe:"body"
    
    })
  }
  GetMDActivityDetailsById(ActvivtyId: any): Observable<any>
  {
    return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMDActivityDetailsById/" +ActvivtyId).pipe(
      catchError(err => {
          return throwError(err);
      })
     );
  }
 
  UpdateActivity(model:any): Observable<any>
  {
    debugger
    console.log(model);
    const body = JSON.stringify(model);
    console.log(body);
    return this.httpclient.post<any>(AppComponent.apiUrl + 'MangalDal/UpdateMDActivities/', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/json'
       
      }),
      observe: 'body'
    }
    ).pipe(
      catchError(err => {
          return throwError(err);
      })
    );
  }

  uploadFile(theFile: MdactivityImage) : Observable<any> {
    return this.httpclient.post<MdactivityImage>(AppComponent.apiUrl , theFile,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/json'
       
      }),
      observe: 'body'
    })
}

DeleteMDActivityImage(Activity):Observable<any>
{
  debugger
  return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/DeleteMDActivityImage",Activity,{
    headers:new HttpHeaders({
      'Content-type':'application/json',
      'accept':'text/json'
    }
    ),observe:"body"
  
  })
}
//------------------------------------------------------------ENd Add Activity-----------------------------------------------------------------------
GetMangaldalActivity(blockId:any):Observable<any>
{
  return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMangaldalActivity/"+blockId)
}
  ////Approval By Block
  MDActivityApprovedByBlock(ActivityId,Remark,Status,UserLoginId)
  {
    debugger
   this.ApprovalTeam.ActivityId=ActivityId;
   this.ApprovalTeam.Remarks2=Remark;
   this.ApprovalTeam.Status2=Status;
   this.ApprovalTeam.UserLoginId=UserLoginId;

    return this.httpclient.post<any>(AppComponent.apiUrl+"MangalDal/MDActivityApprovedByBlock",this.ApprovalTeam,{
     headers:new HttpHeaders({
       'Content-type':'application/json',
       'accept':'text/json'
     }
     ),observe:"body"
   
   });
  }
  GetMangaldalActivityPhoto(ActivityId:any):Observable<any>
{
  return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetMangaldalActivityPhoto/"+ActivityId)
}
GetApprovedMangaldalActivity(DistId:any):Observable<any>
{
  return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetApprovedMangaldalActivity/"+DistId)
}

GetAllMangaldalActivity():Observable<any>
{
  return this.httpclient.get<any>(AppComponent.apiUrl+"MangalDal/GetAllMangaldalActivity/")
}
  //---------------------------------------------------------------------------------------------------------------------------------------
}

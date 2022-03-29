import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { empTraining } from 'src/app/Model/employee';
import { RegistrationService } from 'src/app/Service/registration.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-ho-jawan-list',
  templateUrl: './ho-jawan-list.component.html',
  styleUrls: ['./ho-jawan-list.component.css']
})
export class HoJawanListComponent implements OnInit {

  
  //#region Data Table
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtInstance: DataTables.Api;
  public dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  //#endregion
UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
totalReords:string
result:any;
page:number=1
AppNo:any=null;
 constructor(private regservice:RegistrationService,private toasterservice:ToastrService, private spinner:NgxSpinnerService,private router:Router) { }
 Jawanlist:any;
 ngOnInit(): void {
  
 }
 
emptraining:empTraining={
 EmpTrainingId:null,
 EmpId:null,
 TrainingSession:null,
 CompId:null,
 DateFrom:null,
 DateTo:null,
 TrainingCertificate:null,
 CreatedBy:null,
 ModifiedBy:null,
 TrainingCertificatefile:null,
 FileExtention:null,
 MroleId:null,
 UserLoginId:null
}
GetJawanSearch(AppNo)
{
  debugger;
  this.spinner.show();
  this.regservice.GetHeadOfficeJawanForEdit(AppNo).subscribe((data:any)=>{
    this.Jawanlist=data;
    this.spinner.hide();
    if(this.Jawanlist.length==0)
    {
      this.toasterservice.success("No Record Found");
    }
    else
    {
     // this.divJawanDetail=true;
      //this.divPunishProcess=true;
    }
    this.spinner.hide();

  },(error)=>{
    
    this.error=error;
    this.spinner.hide();
  })
}
 
 error:any;

 getJawanByAppNo(AppNo)
 {
 this.router.navigate(['/PRDDepartment/Registration',AppNo])
 }
}

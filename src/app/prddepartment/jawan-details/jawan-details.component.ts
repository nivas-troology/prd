import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from './../../Service/registration.service';
import {Router} from '@angular/router'
import { AppComponent } from './../../app.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { empTraining } from 'src/app/Model/employee';
@Component({
  selector: 'app-jawan-details',
  templateUrl: './jawan-details.component.html',
  styleUrls: ['./jawan-details.component.css']
})
export class JawanDetailsComponent implements OnInit {
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
  constructor(private regservice:RegistrationService,private toasterservice:ToastrService, private spinner:NgxSpinnerService,private router:Router) { }
  Jawanlist:any;
  ngOnInit(): void {
    this.fillGrid();
    this.dtOptions = {
      dom: 'Bfrtip',      
      select: true,
      responsive: true,
       pagingType: 'full_numbers',
       pageLength: 10,
       processing: true,
       buttons: [
        'copy', 'excel','print'
       ]      
    };
  }
   //#region DataTable
   // tslint:disable-next-line: use-lifecycle-interface
   ngAfterViewInit(): void{
    // Define datatable
    this.dtTrigger.next();
    }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    try {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } catch (err) {
    }
  }
 //#endregion
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

  search(term: string) {
    if(term=="") {
      this.spinner.show();
      this.regservice.GetJawanForEdit(this.UserLoginId).subscribe((data:any)=>{this.Jawanlist=data;
        this.totalReords=this.Jawanlist.length;
      this.spinner.hide()
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    } else {
      var filterdata:any=null;
      filterdata = this.Jawanlist.filter(x => 
         x.regNo.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
      this.Jawanlist= filterdata;
    }
  }
  error:any;
getJawanByAppNo(AppNo)
{
this.router.navigate(['/PRDDepartment/Registration',AppNo])
}
data:any;
Biodatadiv:boolean=false;
GetBioData(EmpId)
{
  this.spinner.show();
  this.regservice.getBioData(EmpId).subscribe((data:any)=>{
    this.data=data;this.spinner.hide();
this.Biodatadiv=true;
this.data.Employee.EmpPic=AppComponent.documentUrl+this.data.Employee.empPic;
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
}

fillGrid():void{
  this.spinner.show();
  this.regservice.GetJawanForEdit(this.UserLoginId).subscribe((data:any)=>{
    this.Jawanlist=data;
    this.rerender();
    console.log(this.Jawanlist);
  this.spinner.hide()
  },(error)=>{
    
    this.error=error;
    this.spinner.hide();
  })
}
DeleteJawanDetails(empId)
{
  if(confirm ('Are You Sure To Delete This Record?.')) {
    {
      debugger
    this.emptraining.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    
    this.spinner.show();
    this.regservice.DeleteJawanDetails(empId).subscribe((data:any)=>{
      this.result=data;
      this.spinner.hide();
    if(this.result>0)
    {
      this.toasterservice.success("Jawan Detail Deleted","Success");
      this.fillGrid();
    }
    else{
      this.toasterservice.warning("Something went wrong","Warning");
    }
    
    })
    }
  }
  else {
    this.toasterservice.success("Your Data safe","Success");
     
  }
 
}
}

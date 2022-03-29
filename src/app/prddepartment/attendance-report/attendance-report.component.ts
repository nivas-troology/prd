import { Subject } from 'rxjs';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from './../../Service/master.service';
import { empContact } from './../../Model/employee';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportService } from './../../Service/report.service';
import { DataTableDirective } from 'angular-datatables'; 

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
 UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
 MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
 ZoneId:any=sessionStorage.getItem("ZoneId");
 DistId:any=sessionStorage.getItem("DistId");
 BlockId:any=sessionStorage.getItem("BlockId");
 disabledrpDivision:boolean=false;
disabledrpDistrict:boolean=false;
 totalReords:string
 page:number=1
 empcontact:empContact={
  EmpContactId:null,
   EmpId:null,
   ResidanceAddress:null,
   ResidanceDistId:"--Select--",
   ResidanceCityId:null,
   ResidanceMobile1:null,
   ResidanceEmpEmail:null,
   ResidanceEmpMohalla:null,
   ResidanceEmpPoliceStation:null,
   CurrentDistId:"--Select--",
   CurrentCityId:null,
   CurrentAddress:null,
   CurrentCompanyId:"--Select--",
   CurrentMobile1:null,
   CurrentEmpEmail:null,
   CurrentEmpMohalla:null,
   ResidanceBlockId:"--Select--",
   ResidanceThanaId:"--Select--",
   CurrentBlockId:"--Select--",
   CurrentThanaId:"--Select--",
   CreatedBy:null,
   ModifiedBy:null,
   residanceTypePerm:"Rural",
   residanceTypeCurrent:"Rural",
   CurrentEmpPoliceStation:null,
   ResidanceCompanyId:"--Select--",
   ResidancePincode:null,
   ResidanceZoneId:"--Select--",
   CurrentPincode:null,
   CurrentZoneId:"--Select--",
   empChkAddress:"Yes",
   MroleId:null,
   UserLoginId:null
 }

 error:any;
  constructor(private masterService:MasterService,private reportservice:ReportService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    if(this.MRoleId==2||this.MRoleId==3)
    {
      this.getZone(this.ZoneId);
    }
   else
   {
    this.getZone('');
   }
   
   //call getjawan method
   if(this.MRoleId==1)
    {
        this.ZoneId=0;
        this.DistId=0;        
        //this.getRetirementJawan(this.ZoneId, this.DistId,0);
            this.spinner.show();
            this.reportservice.getJawanAttendance(this.ZoneId,this.DistId,0).subscribe((data:any)=>{
            this.attendanceJawanlist=data;
            this.spinner.hide();
          debugger
            if(this.attendanceJawanlist.length==0)
            {
              this.toastr.error("No Record Found","Failed");
            }     
            },
            err => {
              if (err.status === 500) {
                this.toastr.error(err.error);
                this.spinner.hide();
              }
              else if (err.status === 400) {
                this.toastr.error(err.error);
                this.spinner.hide();
              }
              else if (err.status === 409) {
                this.toastr.error(err);
                this.spinner.hide();
              }
              else if (err.status === 406) {
                this.toastr.error(err.error);
                this.spinner.hide();
              }
              else {
                this.toastr.error(err.error);
                this.spinner.hide();
              }
            },
            () => { this.spinner.hide();  console.log('HTTP request completed.'); }
            );

   }
   else if(this.MRoleId==2)
   {
    this.DistId=0;
    this.disabledrpDivision=true;
   
   // this.getRetirementJawan(parseInt(this.ZoneId),this.DistId,0);
   this.spinner.show();
   this.reportservice.getJawanAttendance(parseInt(this.ZoneId),this.DistId,0).subscribe((data:any)=>{this.attendanceJawanlist=data;
     this.spinner.hide();
     this.totalReords=this.attendanceJawanlist.length;
     this.rerender();
     this.dtOptions = {
       dom: 'Bfrtip',
       
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        buttons: [
         'colvis','copy', 'excel','print'
        ],
        select: true,
     
       responsive: true,
     
     };
     if(this.attendanceJawanlist.length<0)
     {
       this.toastr.error("No Record Found","Failed");
     }
     
     }
     ,(error)=>{
   
       this.error=error
       this.spinner.hide();
     }
     )

   }
   else if(this.MRoleId==3)
   {
    this.disabledrpDivision=true;
    this.disabledrpDistrict=true;
   
    //this.getRetirementJawan(parseInt(this.ZoneId),parseInt(this.DistId),0);
  
    this.spinner.show();
      this.reportservice.getJawanAttendance(parseInt(this.ZoneId),parseInt(this.DistId),0).subscribe((data:any)=>{this.attendanceJawanlist=data;
        this.spinner.hide();
        this.totalReords=this.attendanceJawanlist.length;
      this.rerender();
      this.dtOptions = {
        dom: 'Bfrtip',
        
         pagingType: 'full_numbers',
         pageLength: 10,
         processing: true,
         buttons: [
          'colvis','copy', 'excel','print'
         ],
         select: true,
      
        responsive: true,
      
      };
        if(this.attendanceJawanlist.length<0)
        {
          this.toastr.error("No Record Found","Failed");
        }
        
        }
        ,(error)=>{
      
          this.error=error
          this.spinner.hide();
        }
        )

   }
    //datatable js code
    this.dtOptions = {
      dom: 'Bfrtip',
      
       pagingType: 'full_numbers',
       pageLength: 10,
       processing: true,
       buttons: [
        'colvis','copy', 'excel','print'
       ],
       select: true,
    
      responsive: true,
    
    };
    this.GetYear();
  }
  currentZonelist:any;
  
  getZone(zoneId)
  { 
    this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;
      this.spinner.hide();
      if(this.MRoleId==2||this.MRoleId==3)
      {
        
      this.empcontact.CurrentZoneId=this.currentZonelist[0].zoneId;
      }
     
       if(this.MRoleId==3){
       
        this.getdistrict(this.empcontact.CurrentZoneId,this.DistId);
      }
      else if(this.MRoleId==2){
       
        this.getdistrict(this.empcontact.CurrentZoneId,'');
      }
     
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    });
 

  }
  dtTrigger=new Subject();
  dtOptions:any={};
  currentdistlist:any;
  ngAfterViewInit(){
    //Define datatable 
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getdistrict(zoneId,distId)
  {this.spinner.show();
   this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{this.currentdistlist=data;
   this.spinner.hide();
  if(this.MRoleId==3){
    
    this.empcontact.CurrentDistId=this.currentdistlist[0].distId;
  }
 
 if(this.MRoleId==3)
 {
  
  this.getBlock(this.empcontact.CurrentDistId);
  this.getCompany(this.empcontact.CurrentDistId,'');
 }

 

},(error)=>{
      
  this.error=error
  this.spinner.hide();
})
 }

 blocklst:any;
 getBlock(distId)
 {this.spinner.show();
   this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data;this.spinner.hide();},(error)=>{
     
     this.error=error
     this.spinner.hide();
   })

 }
 companylst:any;
 getCompany(distId,blockId)
 {
  
   this.spinner.show();
   this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data; this.spinner.hide();
 
   
   },(error)=>{
     
     this.error=error
     this.spinner.hide();
   });
 }
 ClickUrbanRuralCurrent()
{
  if($("#radioCurrentUrban").prop("checked",true))
  {
    this.empcontact.CurrentCompanyId="--Select--";
    this.empcontact.CurrentBlockId="--Select--";
    this.getCompany(this.empcontact.CurrentDistId,'');
  }
 
}
Year:any={
  YearId:-1,
  Year1:null
}
Years:any;
GetYear()
{ this.spinner.show();
  this.masterService.GetYear().subscribe((data:any)=>{
    this.Years=data;
    this.spinner.hide();
  },(error)=>{
    
    this.error=error
    this.spinner.hide();
  })
}
Month:any={
  MonthId:-1,
  Month1:null,
  MonthDays:null
};
Months:any;
GetMonth(YearId)
{this.spinner.show();
  this.masterService.GetMonth(YearId).subscribe((data:any)=>{
    this.Months=data;
    this.spinner.hide();
  },(error)=>{
    
    this.error=error
    this.spinner.hide();
  })
}
  // Get All Jawans
  attendanceJawanlist:any;
 
  getJawanAttendance(ZoneId,DistId,CompanyId,YearId,MonthId)
  {  YearId=parseInt(YearId);
    MonthId=parseInt(MonthId);
    if(ZoneId=="--Select--")
    {
      ZoneId=0;
    }
    if(DistId=="--Select--")
    {
      DistId=0;
    }
   
    if(CompanyId=="--Select--")
    {
      CompanyId=0;
    }
    if (YearId=="--Select--" )
    {
      YearId=0;
    }
    if (MonthId=="--Select--" )
    {
      MonthId=0;
    }
   if(ZoneId>0 || DistId>0 ||CompanyId>0)
    {
      this.spinner.show();
      this.reportservice.getJawanAttendance(ZoneId,DistId,CompanyId,YearId,MonthId).subscribe((data:any)=>{this.attendanceJawanlist=data;
        this.spinner.hide();
        this.rerender();
        this.totalReords=this.attendanceJawanlist.length;
      
        if(this.attendanceJawanlist.length<0)
        {
          this.toastr.error("No Record Found","Failed");
        }
        
        }
        ,(error)=>{
      
          this.error=error
          this.spinner.hide();
        }
        )
    }
   else
   {
    this.spinner.show();
    this.reportservice.getJawanAttendance(0,0,0,0,0).subscribe((data:any)=>{this.attendanceJawanlist=data;
      
    this.spinner.hide();
    this.rerender();

    this.totalReords=this.attendanceJawanlist.length;
    if(this.attendanceJawanlist.length<0)
    {
      this.toastr.error("No Record Found","Failed");
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    }
    )
  
   }
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
      console.log(err);
    }
  }

}

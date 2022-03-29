import { Subject } from 'rxjs';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from './../../Service/master.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportService } from './../../Service/report.service';
import {DutyServiceService} from './../../Service/duty-service.service';
import { DataTableDirective } from 'angular-datatables'; 


@Component({
  selector: 'app-manual-duty-allocation',
  templateUrl: './manual-duty-allocation.component.html',
  styleUrls: ['./manual-duty-allocation.component.css']
})
export class ManualDutyAllocationComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  totalReords:string
 page:number=1
 ServiceNo="";
 ManualDutyDetailsdivshow:boolean=false;
 UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
 ZoneId=parseInt(sessionStorage.getItem("ZoneId"));
 DistId=parseInt(sessionStorage.getItem("DistId"));
 BlockId=parseInt(sessionStorage.getItem("BlockId"));
MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
disableZone:boolean=false;
disableDistrict:boolean=false;
 error:any;
  constructor(private masterService:MasterService,private reportservice:ReportService,private dutyservice:DutyServiceService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getZone('')
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
  }
  dutyAllocation:any={
    
    EmpId:null,
    CurrentZoneId:0,
    CurrentDistId:0,
    ThanaId:0,
    CurrentCompanyId:0,
    SiteId:0,
    PromisorName :null,
    DateFrom:null,
    DateTo:null,
    AllocatedOn:null,
    CreatedBy:null,
    ModifiedBy:null,
    UserLoginId:null
  }
  currentZonelist:any;
  getZone(zoneId)
  {this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;
      if(this.MRoleId==3)
      {
        this.dutyAllocation.CurrentZoneId=this.currentZonelist.find(a=>a.zoneId===this.ZoneId).zoneId;
        this.disableZone=true;
        this.getdistrict( this.dutyAllocation.CurrentZoneId,this.DistId);
      }
      this.spinner.hide();
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    });
   

  }
  
  getdistrict(zoneId,distId)
  {this.spinner.show();
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{this.currentdistlist=data;
  if(this.MRoleId==3)
  {
    this.dutyAllocation.CurrentDistId=this.currentdistlist.find(a=>a.distId===this.DistId).distId;
    this.disableDistrict=true;
    this.getThana(this.dutyAllocation.CurrentDistId);
  }
  this.spinner.hide();
},(error)=>{
      
  this.error=error
  this.spinner.hide();
})

  }
  thanalist:any;
  getThana(distId)
  {this.spinner.show();
    this.masterService.getThana(distId).subscribe((data:any)=>{this.thanalist=data;
      this.spinner.hide();
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    });
  }
  
  siteList:any;
  GetSites()
  {
  this.spinner.show();
    this.masterService.GetSites(parseInt(this.dutyAllocation.ThanaId)).subscribe((data:any)=>{this.siteList=data;this.spinner.hide();},(error)=>{
        
      this.error=error
      this.spinner.hide();
    })
  }
  ManualdutyAllocationlist:any;
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
  getMdutyAllocationStatus(ServiceNo)
  { 
    this.spinner.show();
    this.dutyservice.getMdutyAllocationStatus(ServiceNo).subscribe((data:any)=>{this.ManualdutyAllocationlist=data;
     this.spinner.hide();
 
     this.rerender();
     this.totalReords=this.ManualdutyAllocationlist.length;
  if(this.ManualdutyAllocationlist.length<0)
    {
      this.toastr.error("No Record Found","Failed");
     
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    }
    )
  
   
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

  MDutyAllocationResult:any;
  JawanMDutyAllocation(dutyAllocation)
  {  
    dutyAllocation.EmpId=parseInt(this.ManualdutyAllocationlist[0].empId);
    dutyAllocation.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    dutyAllocation.ThanaId=parseInt(this.dutyAllocation.ThanaId);
    dutyAllocation.SiteId=this.dutyAllocation.SiteId;
    dutyAllocation.PromisorName=this.dutyAllocation.PromisorName;
    dutyAllocation.DateFrom=this.dutyAllocation.DateFrom;
    dutyAllocation.DateTo=this.dutyAllocation.DateTo;
    dutyAllocation.AllocatedOn=this.dutyAllocation.AllocatedOn;
      this.spinner.show();
      this.dutyservice.JawanMDutyAllocation(dutyAllocation).subscribe((data:any)=>{ this.MDutyAllocationResult=data;
        this.spinner.hide();
        if(this.MDutyAllocationResult>0)
        {
          this.toastr.success("Jawan Manual Duty Allocation Successfully","Success");
         this.Reset();
        }
        else
        {
          this.toastr.error("Operation Failed","Failed");
        }
      },(error)=>{
      
        this.error=error
        this.spinner.hide();
      })
    

  }

  Reset()
  {
$("#ThanaId").val("0");
$("#SiteId").val("0");
$("#PromisorName").val("");
$("#DateFrom").val("");
$("#DateTo").val("");
$("#AllocatedOn").val("");

  }

}

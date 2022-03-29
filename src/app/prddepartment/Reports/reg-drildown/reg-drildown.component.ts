import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { ReportService } from './../../../Service/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reg-drildown',
  templateUrl: './reg-drildown.component.html',
  styleUrls: ['./reg-drildown.component.css']
})
export class RegDrildownComponent implements OnInit {
ZoneId:any=parseInt(sessionStorage.getItem("ZoneId"));
DistId:any=parseInt(sessionStorage.getItem("DistId"));
divZoneCount:boolean=true;
divDistCount:boolean=false;
divCompanyCount:boolean=false;

  constructor(private reportService:ReportService,private toastr:ToastrService,private spinner:NgxSpinnerService,private router:Router) { }

  ngOnInit(): void {
    this.GetJawanByZone(this.ZoneId);
  }

error:any;
//Get Jawan Count By Zone
JawanByZonelist:any
GetJawanByZone(ZoneId)
{
  if(isNaN(ZoneId))
  {
    ZoneId=0; 
  }
  this.spinner.show();
this.reportService.GetJawanCountByZone(ZoneId).subscribe((data:any)=>{
  this.JawanByZonelist=data;
  this.spinner.hide();
  if(this.JawanByZonelist.length==0)
  {
this.toastr.error("No Record Found");
  }
},(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })

}
JawanByDistrictlist:any
GetJawanCountByDistrict(ZoneId)
{

 this.spinner.show();
this.reportService.GetJawanCountByDistrict(ZoneId).subscribe((data:any)=>{
  this.JawanByDistrictlist=data;
  this.spinner.hide();
  this.divDistCount=true;
  if(this.JawanByDistrictlist.length==0)
  {
this.toastr.error("No Record Found");
  }
},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})

}
countbyCompanylst:any
GetJawanCountByCompany(DistId)
{ this.spinner.show();
  this.reportService.GetJawanCountByCompany(DistId).subscribe((data:any)=>{
    this.countbyCompanylst=data;
    this.divCompanyCount=true;
    this.spinner.hide();
    if(this.countbyCompanylst.length==0)
    {
  this.toastr.error("No Record Found");
    }
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
}
Jawanlist:any;
GetJawansByDistrict(CompId)
{
  var Flag="1";
sessionStorage.setItem("CompId",CompId);
sessionStorage.setItem("Flag",Flag);
this.router.navigateByUrl("/PRDDepartment/ReportDetail");
}

}

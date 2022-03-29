import { Subject } from 'rxjs';
import { DutyServiceService } from './../../Service/duty-service.service';
import { Site } from './../../Model/master';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';

import { MasterService } from './../../Service/master.service';
import { employee,empContact } from './../../Model/employee';
import { strict } from 'assert';

@Component({
  selector: 'app-wage-calculation',
  templateUrl: './wage-calculation.component.html',
  styleUrls: ['./wage-calculation.component.css']
})
export class WageCalculationComponent implements OnInit {

  UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  BlockId:any=sessionStorage.getItem("BlockId");
  divJawanlst:boolean=false;
  DateFrom:string;
  DateTo:string;
  site:Site={
    SiteId:-1,
   SiteName:null,
   DistId:null,
   BlockId:null,
   ThanaId:null
  }
  employee:employee=
  {
    EmpId:null,
    EmpName:null,
    EmpGender:"--Select--",
    EmpCaste:"--Select--",
    EmpDob:null,
    FatherName:null,
    MotherName:null,
    Height:null,
    EmpEdu:"--Select--",
    EmpDesigId:"--Select--",
    IdProof1Type:null,
    IdProof1No:null,
    IdProof1Pic:null,
    IdProof2Type:null,
    IdProof2No:null,
    IdProof2Pic:null,
    IdProof3Type:null,
    IdProof3No:null,
    IdProof3Pic:null,
    RegistrationStatus1:null,
    RegistrationRemarks1:null,
    RegistrationStatus2:null,
    RegistrationRemarks2:null,
    RegistrationStatusFinal:null,
    RegistrationRmarksFinal:null,
    EmpOfficialId:null,
    EmpPic:null,
    EmpSplSkill:"--Select--",
    Chest:null,
    CreatedBy:null,
    ModifiedBy:null,
    FileExtention1:null,
    FileExtention2:null,
    FileExtention3:null,
    FileExtention4:null,
    FileExtention5:null,
    BirthCerName:null,
    BirthCerNo:null,
    BirthCerPic:null,
    MroleId:null,
    UserLoginId:null,
    AadharNo:null,
    PanNo:null,
    OtherSplSkill:null,
    NominalRegNo:null,
    IsAvailableForDuty:null,
    OldServiceNo:null,
Status:null,
NewJawanStatus:null,
TransCert:null,
FileExtention6:null,
IsTrained:null
  }
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
    residanceTypePerm:"Urban",
    residanceTypeCurrent:"Urban",
    CurrentEmpPoliceStation:null,
    ResidanceCompanyId:"--Select--",
    ResidancePincode:null,
    ResidanceZoneId:"--Select--",
    CurrentPincode:null,
    CurrentZoneId:"--Select--",
    empChkAddress:"Yes",
    MroleId:null,
    UserLoginId:null,

  }
  constructor(private masterService:MasterService,private toastr:ToastrService,private spinner:NgxSpinnerService,private dutyservice:DutyServiceService) { }

  ngOnInit(): void {
    if(this.MRoleId==2||this.MRoleId==3)
    {
      this.getZone(this.ZoneId);
    }
   else
   {
    this.getZone('');
   }
   this.GetYear();
  }
  currentZonelist:any;
  error:any;
  getZone(zoneId)
  { this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;
      
      if(this.MRoleId==2||this.MRoleId==3)
      {this.spinner.hide();
      this.empcontact.CurrentZoneId=this.currentZonelist[0].zoneId;
      }
      if(this.MRoleId==3){
        this.spinner.hide();
        this.getdistrict(this.empcontact.CurrentZoneId,this.DistId);
      }
      else if(this.MRoleId==2){
        this.spinner.hide();
        this.getdistrict(this.empcontact.CurrentZoneId,'');
      }
     
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    });
 

  }
  currentdistlist:any;
  getdistrict(zoneId,distId)
  {
    this.spinner.show();
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{this.currentdistlist=data;
  if(this.MRoleId==3){
    this.spinner.hide();
    this.empcontact.CurrentDistId=this.currentdistlist[0].distId;
    this.getThana(this.currentdistlist[0].distId);
    this.getCompany(this.empcontact.CurrentDistId,'');
  }
this.spinner.hide();

},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})

  }
  blocklst:any;
  getBlock(distId)
  {this.spinner.show();
    this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data;this.spinner.hide();},(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })

  }
  companylst:any
  getCompany(distId,blockId)
  { this.spinner.show();
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data;
  this.spinner.hide();
    
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
siteList:any;
GetSites()
{
this.spinner.show();
  this.masterService.GetSites(parseInt(this.empcontact.CurrentThanaId)).subscribe((data:any)=>{this.siteList=data;this.spinner.hide();},(error)=>{
      
    this.error=error
    this.spinner.hide();
  })
}
thanalist:any;
getThana(distId)
{ this.spinner.show();
  this.masterService.getThana(distId).subscribe((data:any)=>{this.thanalist=data;
    this.spinner.hide();

  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  });
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
      
    this.error=error;
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
{ this.spinner.show();
  this.masterService.GetMonth(YearId).subscribe((data:any)=>{
    this.Months=data;
    this.spinner.hide();
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
}

//Get Jawan For Attendance
savediv:boolean=false
jawanForAttlst:any

GetJawanAttendance(YearId,MonthId,SiteId,DateFrom,DateTo)
{

  this.Year.Year1=$("#Year option:selected").text();
  this.Month.Month1=$("#Month option:selected").text();
  DateFrom=$("#DateFrom").val();
  DateTo=$("#DateTo").val();
this.spinner.show();
  this.dutyservice.GetJawanAttendance(YearId,MonthId,SiteId,DateFrom,DateTo).subscribe((data:any)=>{
    
    this.jawanForAttlst=data;
    if(this.jawanForAttlst.length==0)
    {
      this.toastr.error("No Record Found");
    }
    else
    {
      this.divJawanlst=true;
      this.savediv=true;
    }
    this.spinner.hide();
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })

}
// Get Total Wage
FinalValue:any;
GetTotalWage(empId)
{
 
  var value=$("#Allnc_"+empId).val();
  var wage=this.jawanForAttlst.find(id=>id.empId===empId);
var FinalValue=Number(value)+Number(wage.wages);
  $("#TotalWage_"+empId).val(FinalValue);
}

//Save Wages
SageWagelst:any=[];
wageresult:any;
SaveWages()
{
var c=confirm("Do You Want To Save This Record??");
if(c==true)
{
  for(var i=0;i<this.jawanForAttlst.length;i++)
  {
    var Wage={
      YearId:null,
  MonthId:null,
  EmpId:null,
  WorkingDays:null,
  TotalWage:null,
  TotalAllowance:null,
  UserLoginId:null,
  SiteId:null,
  DateFrom:null,
  DateTo:null
    }
    Wage.YearId=parseInt(this.Year.YearId);
    Wage.MonthId=parseInt(this.Month.MonthId);
    Wage.SiteId=this.site.SiteId;
    Wage.SiteId=parseInt(Wage.SiteId);
   Wage.EmpId=this.jawanForAttlst[i].empId;
    Wage.WorkingDays=this.jawanForAttlst[i].workingDays;
    Wage.TotalAllowance=Number($("#Allnc_"+this.jawanForAttlst[i].empId).val());
    Wage.TotalWage=Number( $("#TotalWage_"+this.jawanForAttlst[i].empId).val());
    Wage.UserLoginId=this.UserLoginId;
    Wage.DateFrom=$("#DateFrom").val();
    Wage.DateTo=$("#DateTo").val();
    this.SageWagelst.push(Wage);
 
  }
  this.spinner.show();

  this.dutyservice.SaveWages(this.SageWagelst).subscribe((data:any)=>{this.wageresult=data;
    if(this.wageresult>0)
    {
      this.toastr.success("Wages Saved Successfully");
      this.spinner.hide();
      this.divJawanlst=false;
      this.savediv=false;
      this.jawanForAttlst=null;
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    })
}
 
}
}

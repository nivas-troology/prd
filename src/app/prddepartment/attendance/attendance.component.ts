import { DutyServiceService } from './../../Service/duty-service.service';
import { Subject } from 'rxjs';

import { Site } from './../../Model/master';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';

import { MasterService } from './../../Service/master.service';
import { employee,empContact } from './../../Model/employee';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  BlockId:any=sessionStorage.getItem("BlockId");
  divJawanlst:boolean=false;
  DateFrom:string=null;
  DateTo:string=null;
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
    UserLoginId:null
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
  {this.spinner.show();
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
  currentdistlist:any;
  getdistrict(zoneId,distId)
  {this.spinner.show();
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{this.currentdistlist=data;
  this.spinner.hide();
  if(this.MRoleId==3){
    this.empcontact.CurrentDistId=this.currentdistlist[0].distId;
    this.getThana(this.currentdistlist[0].distId);
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
  companylst:any
  getCompany(distId,blockId)
  {this.spinner.show();
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
{this.spinner.show();
  this.masterService.getThana(distId).subscribe((data:any)=>{this.thanalist=data;
    this.spinner.hide();

  },(error)=>{
      
    this.error=error
    this.spinner.hide();
  });
}
Year:any={
  YearId:-1,
  Year1:null
}
Years:any;
GetYear()
{this.spinner.show();
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

//Get Jawan For Attendance
savediv:boolean=false
jawanForAttlst:any

GetJawanForAttendace(SiteId,MonthId,DateFrom,DateTo)
{

  this.Year.Year1=$("#Year option:selected").text();
  this.Month.Month1=$("#Month option:selected").text();
  DateFrom=$("#DateFrom").val();
  DateTo=$("#DateTo").val();
this.spinner.show();
  this.dutyservice.GetJawanForAttendace(SiteId,MonthId,DateFrom,DateTo).subscribe((data:any)=>{
    
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
    this.toastr.error(this.error.error);
    this.spinner.hide();
  })

}

//Upload Attendance Document
Attdoc:any={
  FileExtention:null,
  UploadFile:null,
  AttendanceUploadId:null,
  YearId:null,
  MonthId:null,
  SiteId:null,
  UserLoginId:null
}

UploadAttdoc(e) {
  if(e.target.files)
  {
    this.Attdoc={
      FileExtention:null,
      UploadFile:null,
      AttendanceUploadId:null,
      YearId:null,
      MonthId:null,
      SiteId:null,
      UserLoginId:null
    }
    var reader=new FileReader();
    var splitImage:string[]=e.target.files[0].name.split('.');
    var FileExtention=splitImage[1];
    this.Attdoc.FileExtention=FileExtention;
    if(splitImage[splitImage.length-1]!="xls" && splitImage[splitImage.length-1]!="xlsx")
    {
     this.toastr.error("The photo must be in .xls/.xlsx","Image format error!")
     return false;
    }
    if(e.target.files[0].size>1048576)
    {
      this.toastr.error("The photo must not be greater than 1MB","Image size error!")
      return false;
    }
    
 
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      var UploadFile=(reader.result).toString();
      this.Attdoc.UploadFile=UploadFile;
      
    }
  }

 
 }
  //Save Attendance
  Attendance:any={
    YearId:null,
    EmpId:null,
    MonthId:null,
    WorkingDays:null,
    SiteId:null,
    UserLoginId:null,
    AbsentDays:null
  }
  saveAttlst:any=[];
  saveResult:any;
  saveObj:any={
    Attlst:[],
    Attdocument:null
  }

  SaveAttendance()
  {
   var c= confirm("Do You Want to Save This Attendance Finally??");
   if(c==true)
    {
for(let i=0;i<this.jawanForAttlst.length;i++)
{
  this.Attendance={
    YearId:null,
    EmpId:null,
    MonthId:null,
    WorkingDays:null,
    SiteId:null,
    UserLoginId:null,
    AbsentDays:null,
    DateFrom:null,
    DateTo:null
  }
  this.Attendance.YearId=parseInt(this.Year.YearId);
  this.Attendance.MonthId=parseInt(this.Month.MonthId);
  this.Attendance.EmpId=parseInt(this.jawanForAttlst[i].empId);
  this.Attendance.SiteId=this.site.SiteId;
  this.Attendance.SiteId=parseInt(this.Attendance.SiteId);
  this.Attendance.WorkingDays=$("#presentD_"+this.jawanForAttlst[i].empId).val();
  this.Attendance.WorkingDays=parseInt( this.Attendance.WorkingDays);
  this.Attendance.AbsentDays=$("#AbsentD_"+this.jawanForAttlst[i].empId).val();
this.Attendance.UserLoginId=this.UserLoginId;
this.Attendance.DateFrom=$("#DateFrom").val();
this.Attendance.DateTo=$("#DateTo").val();
this.saveAttlst.push(this.Attendance);
}

if(this.Attdoc.UploadFile!=null)
{
this.Attdoc.YearId=parseInt(this.Year.YearId);
this.Attdoc.MonthId=parseInt(this.Month.MonthId);
this.Attdoc.SiteId=this.site.SiteId;
this.Attdoc.SiteId=parseInt(this.Attdoc.SiteId);
this.Attdoc.UserLoginId=this.UserLoginId;
this.saveObj.Attdocument=this.Attdoc;
}
else
{
  this.Attdoc.UploadFile=null;
}
this.saveObj.Attlst=this.saveAttlst;
this.spinner.show();
this.dutyservice.SaveAttendance(this.saveObj).subscribe((data:any)=>{this.saveResult=data;
  if(this.saveResult>0)
  {
    this.toastr.success("Data Saved Successfully");
    //this.divJawanlst=false;
    this.saveObj={
      savelst:[],
      doc:null
    }
    this.Attendance={
      YearId:null,
      EmpId:null,
      MonthId:null,
      WorkingDays:null,
      SiteId:null,
      UserLoginId:null
    }
    //this.savediv=false;
    this.saveAttlst=[];
    this.jawanForAttlst=null;
    $("#Attdoc").val("");
    this.spinner.hide();
    this.Attdoc={
      FileExtention:null,
      UploadFile:null,
      AttendanceUploadId:null,
      YearId:null,
      MonthId:null,
      SiteId:null,
      UserLoginId:null
    }
  }
  else
  {
    this.toastr.error("Attendance Already Exists");
    this.spinner.hide();
  }
 
},(error)=>{
      
  this.error=error;

  this.spinner.hide();
})
    }

  }
MusterRolelst:any;
YearName:any;
MonthName:any;
btnPrint:boolean=false;
  GenerateMusterRole(YearId,MonthId,SiteId,DateFrom,DateTo)
  {
    DateFrom=$("#DateFrom").val();
DateTo=$("#DateTo").val();
this.spinner.show();
  this.dutyservice.GetJawanAttendance(YearId,MonthId,SiteId,DateFrom,DateTo).subscribe((data:any)=>{
    
    this.MusterRolelst=data;
    
    if(this.MusterRolelst.length==0)
    {
      this.toastr.error("No Record Found");
    }
    else
    {
      this.YearName=this.MusterRolelst[0].year;
      this.MonthName=this.MusterRolelst[0].month;
      this.toastr.success("Muster Role Generated, Please Print");
      this.btnPrint=true;
    }
    this.spinner.hide();
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
  }

}

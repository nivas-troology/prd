import { Subject } from 'rxjs';
import { DutyServiceService } from './../../Service/duty-service.service';
import { Site } from './../../Model/master';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';

import { MasterService } from './../../Service/master.service';
import { employee,empContact } from './../../Model/employee';

@Component({
  selector: 'app-wage-settlement',
  templateUrl: './wage-settlement.component.html',
  styleUrls: ['./wage-settlement.component.css']
})
export class WageSettlementComponent implements OnInit {
  UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  BlockId:any=sessionStorage.getItem("BlockId");
  divJawanlst:boolean=false;
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
      
      this.error=error;
      this.spinner.hide();
    });
 

  }
  currentdistlist:any;
  getdistrict(zoneId,distId)
  { this.spinner.show();
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{this.currentdistlist=data;
  this.spinner.hide();
  if(this.MRoleId==3){
    this.empcontact.CurrentDistId=this.currentdistlist[0].distId;
    this.getThana(this.currentdistlist[0].distId);
    this.getCompany(this.empcontact.CurrentDistId,'');
  }


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
      
      this.error=error;
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
      
    this.error=error;
    this.spinner.hide();
  })
}
thanalist:any;
getThana(distId)
{this.spinner.show();
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
GrandTotalOfwages:number=0.00;
GetJawanWages(YearId,MonthId,SiteId)
{

this.spinner.show();
  this.dutyservice.GetJawanWages(YearId,MonthId,SiteId).subscribe((data:any)=>{
    
    this.jawanForAttlst=data;


    if(this.jawanForAttlst.length==0)
    {
      this.toastr.error("No Record Found");
    }
    else
    {
      this.divJawanlst=true;
      this.savediv=true;
      for(var i=0;i<this.jawanForAttlst.length;i++)
      {
        this.GrandTotalOfwages+=Number(this.jawanForAttlst[i].totalWage);
      }
    }
   
    this.spinner.hide();
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })

}

//Upload Attendance Document
Settlement:any={
  FileExtention:null,
  UploadFile:null,
  YearId:null,
  MonthId:null,
  SiteId:null,
  UserLoginId:null,
  RefNo:null,
  Remarks:null,
  Date:null,
  GranTotalWage:null
}

UploadwSettlementdoc(e) {
  if(e.target.files)
  {
  
    var reader=new FileReader();
    var splitImage:string[]=e.target.files[0].name.split('.');
    var FileExtention=splitImage[1];
    this.Settlement.FileExtention=FileExtention;
    if(splitImage[splitImage.length-1]!="xls" && splitImage[splitImage.length-1]!="xlsx")
    {
     this.toastr.error("The photo must be in .xls/.xlsx format","File format error!")
     return false;
    }
    if(e.target.files[0].size>1048576)
    {
      this.toastr.error("The photo must not be greater than 1MB","File size error!")
      return false;
    }
    
 
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      var UploadFile=(reader.result).toString();
      this.Settlement.UploadFile=UploadFile;
    }
  }

 
 }
// Save Wage Settlement
wsResult:any;
SaveWageSettlement()
{
  confirm("Do You Want Save This Record")
  {
    if(this.Settlement.UploadFile==null||this.Settlement.UploadFile=="")
    {
      this.toastr.error("Please Upload Document");
      return false;
    }
    if(this.Settlement.RefNo==null||this.Settlement.RefNo=="")
    {
      this.toastr.error("Please Enter Reference No.");
      return false;
    }
    if(this.Settlement.Remarks==null||this.Settlement.Remarks=="")
    {
      this.toastr.error("Please Enter Remarks");
      return false;
    }
    if(this.Settlement.Date==null||this.Settlement.Date=="")
    {
      this.toastr.error("Please Enter Date");
      return false;
    }
    this.Settlement.YearId=parseInt(this.Year.YearId);
    this.Settlement.MonthId=parseInt(this.Month.MonthId);
    this.Settlement.SiteId=this.site.SiteId;
    this.Settlement.SiteId=parseInt(this.Settlement.SiteId);
    this.Settlement.Date=$("#Date").val();
    this.Settlement.GranTotalWage=this.GrandTotalOfwages;
    this.Settlement.UserLoginId=this.UserLoginId;
    this.spinner.show();
    this.dutyservice.SaveWagesSettlement(this.Settlement).subscribe((data:any)=>{
  this.wsResult=data;
  if(this.wsResult>0)
  {
    this.toastr.success("Data Saved Successfully");
    this.spinner.hide();
    this.jawanForAttlst=null;
    this.divJawanlst=false;
    this.savediv=false;
  }
  
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })
  }
  }
  

 

}

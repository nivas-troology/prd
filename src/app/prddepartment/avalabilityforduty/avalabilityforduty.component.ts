import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import {DutyServiceService} from './../../Service/duty-service.service';
import { MasterService } from './../../Service/master.service';
import { employee,empContact } from './../../Model/employee';
import { from } from 'rxjs';

@Component({
  selector: 'app-avalabilityforduty',
  templateUrl: './avalabilityforduty.component.html',
  styleUrls: ['./avalabilityforduty.component.css']
})
export class AvalabilityfordutyComponent implements OnInit {
  UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  BlockId:any=sessionStorage.getItem("BlockId");
  CompanyId:number;
  ServiceNo:any=null;
  totalReords:string;
   page:number=1;
   rowCheck=false;
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
  constructor(private masterService:MasterService,private DutyServiceService:DutyServiceService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }
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
     this.BlockId=0;
    this.getJawanForAvailability(this.ZoneId, this.DistId, this.BlockId,this.CompanyId,this.ServiceNo);
   }
  
   else if(this.MRoleId==2)
   {
    this.DistId=0;
    this.BlockId=0;
    this.getJawanForAvailability(parseInt(this.ZoneId),this.DistId,this.BlockId,this.CompanyId,this.ServiceNo);
   }
   
   else if(this.MRoleId==3)
   {
    this.BlockId=0;
    this.getJawanForAvailability(parseInt(this.ZoneId),parseInt(this.DistId),this.BlockId,0,this.ServiceNo);
   }
  }
  currentZonelist:any;
  error:any;
  getZone(zoneId)
  {this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;this.spinner.hide();
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
    this.getCompany(this.empcontact.CurrentDistId,'');
  }
 
 if(this.MRoleId==3)
 {
  this.getBlock(this.empcontact.CurrentDistId);
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
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data;this.spinner.hide();
  
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    });
  }
  // Get All Jawans
  Jawanlist:any;
  getJawanForAvailability(ZoneId,DistId,BlockId,CompanyId,ServiceNo)
  { 
    if(ZoneId=="--Select--")
    {
      ZoneId=0;
    }
    if(DistId=="--Select--")
    {
      DistId=0;
    }
    if(this.empcontact.CurrentBlockId=="--Select--")
    {
      BlockId=0;
    }
    if(this.empcontact.CurrentCompanyId=="--Select--")
    {
      CompanyId=0;
    }
   if(ServiceNo==undefined)
   {
    ServiceNo==null;
   }
    if(ServiceNo==null||ServiceNo=="")
    {
      this.spinner.show();
      this.DutyServiceService.GetRegisterdJawansForAvailability(ZoneId,DistId,BlockId,CompanyId,ServiceNo).subscribe((data:any)=>{this.Jawanlist=data;
        this.spinner.hide();
        this.totalReords=this.Jawanlist.length;
        if(this.Jawanlist.length<0)
        {
          this.toastr.error("No Record Found","Failed");
        }
        
        },(error)=>{
      
          this.error=error
          this.spinner.hide();
        }
        )
    }
   else
   {
    this.spinner.show();
    this.DutyServiceService.GetRegisterdJawansForAvailability(0,0,0,0,ServiceNo).subscribe((data:any)=>{this.Jawanlist=data;
    this.spinner.hide();
    this.totalReords=this.Jawanlist.length;
    if(this.Jawanlist.length<0)
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
  bulkList:any=[];
  bulkCheck(e)
  {
if(e.target.checked)
{
  this.rowCheck=true;
for(let i=0;i<this.Jawanlist.length;i++)
{
  this.PushDataBulkForAvailability(this.Jawanlist[i].empId);
}

}
else
{
  this.rowCheck=false;
  this.bulkList=[];
}
  }
  PushDataBulkForAvailability(empId)
  {
   
    var obj=this.Jawanlist.find(EmpId=>EmpId.empId===empId);
    obj.UserLoginId=this.UserLoginId;
    if(obj.availabilityStatus=="AVAILABLE")
    {
      obj.IsAvailableForDuty=0;
    }
    else if(obj.availabilityStatus=="UNAVAILABLE")
    {
      obj.IsAvailableForDuty=1;
    } 
    if(this.rowCheck==true)
    {
      this.bulkList.push(obj);
    }
    else
    {
     this.bulkList.pop(obj);
    }
  
  }
  PushDataForAvailability(empId)
  {
   
    var obj=this.Jawanlist.find(EmpId=>EmpId.empId===empId);
    obj.UserLoginId=this.UserLoginId;
    if(obj.availabilityStatus=="AVAILABLE")
    {
      obj.IsAvailableForDuty=0;
    }
    else if(obj.availabilityStatus=="UNAVAILABLE")
    {
      obj.IsAvailableForDuty=1;
    } 
    if($("#empCheck_"+empId).prop("checked")==true)
    {
      this.bulkList.push(obj);
    }
    else
    {
     this.bulkList.pop(obj);
    }
  
  }
AvailabilityResult:number;
  MakeJawanAvailableUnavailble()
  {
    this.spinner.show();
    this.DutyServiceService.MakeJawanAvailableUnavailble(this.bulkList).subscribe((data:any)=>{this.AvailabilityResult=data;this.spinner.hide();
    if(this.AvailabilityResult>0)
    {
      this.toastr.success("Action Completed","Success");
      this.spinner.hide();
      this.getJawanForAvailability(this.ZoneId,this.DistId,this.BlockId,this.CompanyId,this.ServiceNo);
      this.rowCheck=false;
      this.bulkList=[];
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    })
  }
}

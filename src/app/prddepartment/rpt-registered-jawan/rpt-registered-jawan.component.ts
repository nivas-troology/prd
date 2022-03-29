import { Router } from '@angular/router';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from './../../Service/registration.service';
import { MasterService } from './../../Service/master.service';
import { employee,empContact } from './../../Model/employee';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-rpt-registered-jawan',
  templateUrl: './rpt-registered-jawan.component.html',
  styleUrls: ['./rpt-registered-jawan.component.css']
})
export class RptRegisteredJawanComponent implements OnInit {
 
  UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  BlockId:any=sessionStorage.getItem("BlockId");
  ServiceNo:any=null;

  totalReords:string
   page:number=1
  employee:employee=
  {
    EmpId:null,
    EmpName:null,
    EmpGender:null,
    EmpCaste:null,
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
    EmpSplSkill:null,
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
    Status:"",
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
  constructor(private masterService:MasterService,private regservice:RegistrationService,private toastr:ToastrService,private spinner:NgxSpinnerService,private router:Router) { }

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
     //this.getJawan(parseInt(this.ZoneId),parseInt(this.DistId),this.BlockId,this.empcontact.CurrentCompanyId,this.ServiceNo,this.employee.Status,this.employee.EmpGender,this.employee.EmpSplSkill,this.employee.EmpCaste);
   }
  
   else if(this.MRoleId==2)
   {
    this.DistId=0;
    this.BlockId=0;
    //this.getJawan(parseInt(this.ZoneId),parseInt(this.DistId),this.BlockId,this.empcontact.CurrentCompanyId,this.ServiceNo,this.employee.Status,this.employee.EmpGender,this.employee.EmpSplSkill,this.employee.EmpCaste);
   }
   
   else if(this.MRoleId==3)
   {
    this.BlockId=0;
    //this.getJawan(parseInt(this.ZoneId),parseInt(this.DistId),this.BlockId,this.empcontact.CurrentCompanyId,this.ServiceNo,this.employee.Status,this.employee.EmpGender,this.employee.EmpSplSkill,this.employee.EmpCaste);
   }
   
  
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
      
      this.error=error
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
  }
 
 if(this.MRoleId==3)
 {
  this.getCompany(this.empcontact.CurrentDistId,'');
  this.getBlock(this.empcontact.CurrentDistId);
 }

 

},(error)=>{
      
  this.error=error
  this.spinner.hide();
})

  }
  blocklst:any;
  getBlock(distId)
  { this.spinner.show();
    this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data; this.spinner.hide();},(error)=>{
      
      this.error=error
      this.spinner.hide();
    })

  }
  companylst:any;
  getCompany(distId,blockId)
  {
    if(this.empcontact.residanceTypeCurrent=="Urban")
    {
      this.empcontact.CurrentBlockId="--Select--";
      this.empcontact.CurrentCompanyId="--Select--";
    }
    if(this.empcontact.residanceTypeCurrent=="Rural")
    {
      this.empcontact.CurrentBlockId="--Select--";
    }
    this.spinner.show();
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data; this.spinner.hide();
  
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    });
  }
  // Get All Jawans
  Jawanlist:any;
  // getJawan(ZoneId,DistId,BlockId,CompanyId,ServiceNo,Status,Gender,EmpSkill,EmpCaste)
  // { 
  //   if(ZoneId=="--Select--")
  //   {
  //     ZoneId=0;
  //   }
  //   if(DistId=="--Select--")
  //   {
  //     DistId=0;
  //   }
  //   if(BlockId=="--Select--")
  //   {
  //     BlockId=0;
  //   }
  //   if(CompanyId=="--Select--")
  //   {
  //     CompanyId=0;
  //   }
  //   if(ServiceNo==null||ServiceNo=="")
  //   {
  //     this.spinner.show();
  //     this.regservice.GetRegisterdJawans(ZoneId,DistId,BlockId,CompanyId,ServiceNo,Status,Gender,EmpSkill,EmpCaste).subscribe((data:any)=>{this.Jawanlist=data;
  //       this.spinner.hide();
  //       this.totalReords=this.Jawanlist.length;
  //       this.router.navigate(['/Report',this.Jawanlist]);
  //       if(this.Jawanlist.length==0)
  //       {
  //         this.toastr.error("No Record Found","Failed");
  //       }
        
  //       }
  //       )
  //   }
  //  else
  //  {
  //   this.spinner.show();
  //   this.regservice.GetRegisterdJawans(0,0,0,0,ServiceNo,Status,Gender,EmpSkill,EmpCaste).subscribe((data:any)=>{this.Jawanlist=data;
  //   this.spinner.hide();
  //   this.totalReords=this.Jawanlist.length;
  //   if(this.Jawanlist.length==0)
  //   {
  //     this.toastr.error("No Record Found","Failed");
  //   }
    
  //   }
  //   )
  
  //  }
  // }
  getJawan(ZoneId,DistId,BlockId,CompanyId,ServiceNo,Status,Gender,EmpSkill,EmpCaste,residanceTypeCurrent)
  { 
    if(ZoneId=="--Select--")
    {
      ZoneId=0;
    }
    if(DistId=="--Select--")
    {
      DistId=0;
    }
    if(BlockId=="--Select--")
    {
      BlockId=0;
    }
    if(CompanyId=="--Select--")
    {
      CompanyId=0;
    }
sessionStorage.setItem("zoneId",ZoneId);
sessionStorage.setItem("distId",DistId);
sessionStorage.setItem("blockId",BlockId);
sessionStorage.setItem("companyId",CompanyId);
sessionStorage.setItem("serviceNo",ServiceNo);
sessionStorage.setItem("status",Status);
sessionStorage.setItem("gender",Gender);
sessionStorage.setItem("empSkill",EmpSkill);
sessionStorage.setItem("empCaste",EmpCaste);
sessionStorage.setItem("residanceTypeCurrent",residanceTypeCurrent);

this.router.navigateByUrl("Report");
  }

  Age:any="--Select--";

  ClickUrbanRuralCurrent()

{
  if($("#radioCurrentUrban").prop("checked",true))
  {
    this.empcontact.CurrentCompanyId="--Select--";
    this.empcontact.CurrentBlockId="--Select--";
    this.getCompany(this.empcontact.CurrentDistId,'');
  }
 
}
  
}

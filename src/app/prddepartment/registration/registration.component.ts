import { AppComponent } from './../../app.component';

import { RegistrationService } from './../../Service/registration.service';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from './../../Service/master.service';
import { employee, empContact, empAccount, empTraining, EmployeeReg } from './../../Model/employee';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router'
import { Identifiers, IfStmt, ThrowStmt } from '@angular/compiler';
import{BsDatepickerConfig} from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  zoneId:any=parseInt(sessionStorage.getItem("ZoneId"));
  distId:any=parseInt(sessionStorage.getItem("DistId"));

  title = 'FormValidation';  
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  
  isValidFormSubmitted = false;  
  isValidEmailFormSubmitted = false;  
  ContactNext:boolean=false;
  AccountNext:boolean=false;
  TrainingNext:boolean=false;
  FinalSaveNext:boolean=false;
  BioDataNext:boolean=false;
  btnSaveBasicDetails:boolean=true;
  btnSaveContactDetails:boolean=true;
  btnSaveAccountDetails:boolean=true;
  btnSaveTraniningDetails:boolean=true;
  btnSaveFinalDetails:boolean=true;
  btnUpdateBasicDetails:boolean=false;
  btnUpdateContactDetails:boolean=false;
  btnUpdateAccountDetails:boolean=false;
  btnUpdateTraniningDetails:boolean=false;
  btnUpdateDocumentDetails:boolean=false;
btnAddTraining:boolean=true;
  biodatadivshow:boolean=false;
  btnUpdateTraining=false;
  AppNo:string=null;
  rdOldNewJawan:string="OLD";
  IsTrained:string="No";
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
Status:"Old",
NewJawanStatus:null,
TransCert:null,
FileExtention6:null,
IsTrained:null
  }
empReg:EmployeeReg={
  Employee:null,
  EmployeeAccount:null,
    EmployeeContact:null,
    EmployeeTraining:null
}

  empcontact:empContact={

    EmpContactId:null,
    EmpId:null,
    ResidanceAddress:null,
    ResidanceDistId:"--Select--",
    ResidanceCityId:null,
    ResidanceMobile1:null,
    ResidanceEmpEmail:'',
    ResidanceEmpMohalla:null,
    ResidanceEmpPoliceStation:null,
    CurrentDistId:"--Select--",
    CurrentCityId:null,
    CurrentAddress:null,
    CurrentCompanyId:"--Select--",
   
    CurrentMobile1:null,
    CurrentEmpEmail:'',
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
  empAcc:empAccount={
    EmpAccDetailD:null,
    EmpOfficialId:null,
    AccNo:null,
    AccName:null,
    Bank:null,
    Branch:null,
    Ifsc:null,
    CreatedBy:null,
    ModifiedBy:null,
    MroleId:null,
    UserLoginId:null
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
 
  datePickerConfig:Partial<BsDatepickerConfig>;
  DOBReadonly: boolean;
  constructor(private masterService:MasterService,private regservice:RegistrationService,private toasterservice:ToastrService,private spinnersirvice:NgxSpinnerService,private route:ActivatedRoute,private router:Router) {

    this.datePickerConfig=Object.assign({},{dateInputFormat:"DD/MM/YYYY",containerClass:"theme-dark-blue"});              
   }
  designationLst:any;

  ngOnInit(): void {
    this.spinnersirvice.show();
sessionStorage.setItem("EmpId",null);
    this.masterService.getDesignation().subscribe((data:any)=>{this.designationLst=data,this.spinnersirvice.hide();},(error)=>{
      
      this.error=error;
     
    });
    this.masterService.getZone('').subscribe((data:any)=>{
      this.resZonelist=data;this.spinnersirvice.hide(); },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    });
    this.getZone(this.zoneId)
   this.AppNo=this.route.snapshot.params['AppNo'];
   this.getDetailByAppNo(this.AppNo)
  
  }
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  currentZonelist:any;
  resZonelist:any;
  error:any;
  
  getZone(zoneId)
  {
   
    this.spinnersirvice.show();
    debugger
    if(isNaN(zoneId))
    {
      this.zoneId='';
    }
    else{
      this.zoneId=zoneId
    }
    this.masterService.getZone(this.zoneId).subscribe((data:any)=>{
      this.currentZonelist=data;
      this.spinnersirvice.hide();
      
      //this.empcontact.CurrentZoneId=this.currentZonelist[0].zoneId;
      this.getdistrict(this.empcontact.CurrentZoneId,this.distId);
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    });
   

  }
  currentdistlist:any;
  resdistlist:any;
  getdistrict(zoneId,distId)
  {this.spinnersirvice.show();
    if(isNaN(distId) || isNaN(zoneId) )
    {
      this.distId='';
      this.zoneId='';
    }
    else{
      this.distId=distId;
      this.zoneId=zoneId;
    }
    
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{
  this.currentdistlist=data;this.spinnersirvice.hide();
 this.empcontact.CurrentDistId=this.currentdistlist[0].distId;
 if(this.empcontact.residanceTypeCurrent=='Urban')
 {
   this.getCompany(this.empcontact.CurrentDistId,'');
 }
 else
 {
  this.getBlock(this.empcontact.CurrentDistId);
 }
 this.getThana(this.empcontact.CurrentDistId);
},(error)=>{
  this.spinnersirvice.hide();
  this.error=error;
 
})

  }
  companylst:any;
  regcompanylst:any;
  getCompany(distId,blockId)
  {this.spinnersirvice.show();
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data;this.spinnersirvice.hide();
  
    
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    });
  }
  getregCompany(distId,blockId)
  {this.spinnersirvice.show();
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.regcompanylst=data;this.spinnersirvice.hide();
      if(this.empchkadd=="Yes")
      {
          this.empcontact.ResidanceCompanyId=this.regcompanylst.find(resp=>resp.compId===parseInt(this.empcontact.CurrentCompanyId)).compId;
      }
    else if(this.jawanDetails.value.EmployeeContact.residanceCompanyId!=null)
    {
      this.empcontact.ResidanceCompanyId=this.regcompanylst.find(Id=>Id.compId===this.jawanDetails.value.EmployeeContact.residanceCompanyId).compId;
    }
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error
     
    })

  }
  blocklst:any;
  regblocklst:any;

  getBlock(distId)
  {this.spinnersirvice.show();
    this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data;this.spinnersirvice.hide();

    
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    });


  }
  getregBlock(distId)
  {this.spinnersirvice.show();
    this.masterService.getBlock(distId).subscribe((data:any)=>{this.regblocklst=data;this.spinnersirvice.hide();
      if(this.empchkadd=="Yes")
      {
this.empcontact.ResidanceBlockId=this.regblocklst.find(resp=>resp.blockId===parseInt(this.empcontact.CurrentBlockId)).blockId;
this.getregCompany(this.empcontact.ResidanceDistId,this.empcontact.ResidanceBlockId)
      }
      else if(this.jawanDetails.value.EmployeeContact.residanceBlockId!=null)
      {
        var resblock=this.regblocklst.find(Id=>Id.blockId===this.jawanDetails.value.EmployeeContact.residanceBlockId)
        this.empcontact.ResidanceBlockId=resblock.blockId;
        this.getregCompany(distId,this.empcontact.ResidanceBlockId);
      }
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    })
  }
  getresdistrict(zoneId)
  {this.spinnersirvice.show();
    this.masterService.getDistrict(zoneId,'').subscribe((data:any)=>{this.resdistlist=data;this.spinnersirvice.hide();
if(this.empchkadd=="Yes")
{
  this.empcontact.ResidanceDistId=this.resdistlist.find(resp=>resp.distId===this.empcontact.CurrentDistId).distId;
  if(this.empcontact.residanceTypePerm=="Urban")
  {
    this.getregCompany(this.empcontact.ResidanceDistId,'');
  }
  else if(this.empcontact.residanceTypePerm=="Rural")
{
  this.getregBlock(this.empcontact.ResidanceDistId)
}
this.reggetThana(this.empcontact.ResidanceDistId)
  // this.empcontact.ResidanceBlockId=this.regblocklst.find(resp=>resp.blockId===this.empcontact.CurrentBlockId).blockId;
  // this.empcontact.ResidanceThanaId=this.regthanalst.find(resp=>resp.thanaId===this.empcontact.ResidanceThanaId).thanaId;
}
else if(this.jawanDetails.value.EmployeeContact.residanceDistId!=null)
{
  var resdist=this.resdistlist.find(Id=>Id.distId===this.jawanDetails.value.EmployeeContact.residanceDistId)
  this.empcontact.ResidanceDistId=resdist.distId;
  if(this.empcontact.residanceTypePerm=="Urban")
  {
    this.getregCompany(this.empcontact.ResidanceDistId,'');
  }
  else
  {
    this.getregBlock(this.empcontact.ResidanceDistId);
  }
  this.reggetThana(this.empcontact.ResidanceDistId);
}
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    })
  }
  thanalist:any;
  regthanalst:any;
  getThana(distId)
  {this.spinnersirvice.show();
    this.masterService.getThana(distId).subscribe((data:any)=>{this.thanalist=data;this.spinnersirvice.hide();
    if(this.jawanDetails.value.EmployeeContact.currentThanaId!=null)
    {
      var currthana=this.thanalist.find((Id:any)=>Id.thanaId===this.jawanDetails.value.EmployeeContact.currentThanaId);
this.empcontact.CurrentThanaId=currthana.thanaId;
    }
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    });
  }
  reggetThana(distId)
  {this.spinnersirvice.show();
    this.masterService.getThana(distId).subscribe((data:any)=>{this.regthanalst=data;this.spinnersirvice.hide();
      if(this.empchkadd=="Yes")
      {
        this.empcontact.ResidanceThanaId=this.regthanalst.find(resp=>resp.thanaId===parseInt(this.empcontact.CurrentThanaId)).thanaId;
      }
      else if(this.jawanDetails.value.EmployeeContact.residanceThanaId!=null)
      {
        var resthana=this.regthanalst.find(Id=>Id.thanaId===this.jawanDetails.value.EmployeeContact.residanceThanaId);
  this.empcontact.ResidanceThanaId=resthana.thanaId;
      }
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error;
     
    })
  }

 
// check current and permanent address equal
empchkadd:any;
ChkAddress()
{
  
  var element = <HTMLInputElement> document.getElementById("empChkAddress");
 
var isChecked = element.checked;


if(isChecked)
{
  this.empchkadd="Yes";
  this.empcontact.residanceTypePerm=this.empcontact.residanceTypeCurrent;
this.empcontact.ResidanceAddress=this.empcontact.CurrentAddress;
this.empcontact.ResidanceZoneId=this.empcontact.CurrentZoneId;
this.getresdistrict(this.empcontact.ResidanceZoneId);

// this.empcontact.ResidanceCompanyId=this.empcontact.CurrentCompanyId;
// this.empcontact.ResidanceBlockId=this.empcontact.CurrentBlockId;
// this.empcontact.ResidanceThanaId=this.empcontact.CurrentThanaId;
this.empcontact.ResidanceEmpEmail=this.empcontact.CurrentEmpEmail;
this.empcontact.ResidancePincode=this.empcontact.CurrentPincode;
this.empcontact.ResidanceMobile1=this.empcontact.CurrentMobile1;

}
else
{
this.empcontact.residanceTypePerm="Urban";
this.empcontact.ResidanceAddress='';
this.empcontact.ResidanceEmpEmail='';
this.empcontact.ResidanceMobile1='';
this.empcontact.ResidancePincode='';
this.empcontact.ResidanceDistId='--Select--';
this.empcontact.ResidanceZoneId='--Select--';
this.empcontact.ResidanceCompanyId='--Select--';
this.empcontact.ResidanceThanaId='--Select--';
this.empcontact.ResidanceBlockId='--Select--';

}
}

//Save Basic Details
result:any;
SaveBasicDetails(BasicForm:NgForm)
{
  debugger
  var Dob:any;
   Dob=document.getElementById('EmpDob') as HTMLInputElement;
   BasicForm.value.EmpDob=Dob.value;
   BasicForm.value.EmpDesigId=parseInt(BasicForm.value.EmpDesigId);
   if(this.employee.Status=="Old")
   {
    BasicForm.value.Status="Old";
    BasicForm.value.NewJawanStatus=null;
   }
   else
   {
    BasicForm.value.Status="New";
    BasicForm.value.OldServiceNo=null;
   }
this.empReg.Employee=BasicForm.value;
if(BasicForm.value.EmpSplSkill=="OTHER")
{
  BasicForm.value.EmpSplSkill=this.employee.OtherSplSkill;
}
this.empReg.Employee.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
this.empReg.Employee.IsTrained=this.IsTrained;
this.spinnersirvice.show();
this.regservice.saveEmployee(this.empReg).subscribe((data:any)=>{this.result=data;
  this.spinnersirvice.hide();
  if(this.result!=null)
{
this.toasterservice.success("Basic Details Saved","Your Application No. is: "+this.result.regNo,{timeOut:10000});
this.ContactNext=true;
this.btnSaveBasicDetails=false;
this.ResetBasicDetailForm();
this.btnUpdateBasicDetails=true;

sessionStorage.setItem("EmpId",this.result.empId);
}
else
{
this.toasterservice.error("Some Error Occurred!!","Error");
}  
},(error)=>{
      this.spinnersirvice.hide();
  this.error=error
 
}

)
}
//Reset Basic Form
ResetBasicDetailForm()
{
  // this.employee=
  // {
  //   EmpId:null,
  //   EmpName:null,
  //   EmpGender:"--Select--",
  //   EmpCaste:"--Select--",
  //   EmpDob:null,
  //   FatherName:null,
  //   MotherName:null,
  //   Height:null,
  //   EmpEdu:"--Select--",
  //   EmpDesigId:"--Select--",
  //   IdProof1Type:null,
  //   IdProof1No:null,
  //   IdProof1Pic:null,
  //   IdProof2Type:null,
  //   IdProof2No:null,
  //   IdProof2Pic:null,
  //   IdProof3Type:null,
  //   IdProof3No:null,
  //   IdProof3Pic:null,
  //   RegistrationStatus1:null,
  //   RegistrationRemarks1:null,
  //   RegistrationStatus2:null,
  //   RegistrationRemarks2:null,
  //   RegistrationStatusFinal:null,
  //   RegistrationRmarksFinal:null,
  //   EmpOfficialId:null,
  //   EmpPic:null,
  //   EmpSplSkill:"--Select--",
  //   Chest:null,
  //   CreatedBy:null,
  //   ModifiedBy:null,
  //   FileExtention1:null,
  //   FileExtention2:null,
  //   FileExtention3:null,
  //   MroleId:null,
  //   UserLoginId:null
  // }
  this.empReg={
    Employee:null,
    EmployeeAccount:null,
      EmployeeContact:null,
      EmployeeTraining:null
  }
}

// Save Contact Details
SaveContactForm(ContactForm:NgForm)
{
  if(this.empcontact.residanceTypeCurrent=='Urban')
  {
    ContactForm.value.CurrentBlockId=null;
  }
  else
  {
    ContactForm.value.CurrentBlockId=parseInt(this.empcontact.CurrentBlockId);
  }
  if(this.empcontact.residanceTypePerm=='Urban')
  {
    ContactForm.value.ResidanceBlockId=null;
  }
  else
  {
    ContactForm.value.ResidanceBlockId=parseInt(this.empcontact.ResidanceBlockId);
  }

  ContactForm.value.CurrentZoneId=parseInt(this.empcontact.CurrentZoneId)
  ContactForm.value.CurrentDistId=parseInt(this.empcontact.CurrentDistId)
  ContactForm.value.CurrentCompanyId=parseInt(this.empcontact.CurrentCompanyId)
  ContactForm.value.CurrentThanaId=parseInt(this.empcontact.CurrentThanaId)
  ContactForm.value.ResidanceZoneId=parseInt(this.empcontact.ResidanceZoneId)
  ContactForm.value.ResidanceDistId=parseInt(this.empcontact.ResidanceDistId)
  ContactForm.value.ResidanceCompanyId=parseInt(this.empcontact.ResidanceCompanyId)
  ContactForm.value.ResidanceThanaId=parseInt(this.empcontact.ResidanceThanaId)
  this.empReg.EmployeeContact=ContactForm.value;
  this.empReg.EmployeeContact.EmpId=parseInt(sessionStorage.getItem("EmpId"));
  this.empReg.EmployeeContact.residanceTypeCurrent=this.empcontact.residanceTypeCurrent;
  this.empReg.EmployeeContact.residanceTypePerm=this.empcontact.residanceTypePerm;
  this.empReg.EmployeeContact.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  debugger
  this.spinnersirvice.show();
  
  this.regservice.saveEmployee(this.empReg).subscribe((data:any)=>{this.result=data;
    this.spinnersirvice.hide();
    if(this.result>0)
  {
this.toasterservice.success("Contact Details Saved","Success");
this.ResetContactDetails();
this.AccountNext=true;
this.btnUpdateContactDetails=true;
this.btnSaveContactDetails=false;

  }
  else
{
  this.toasterservice.error("Some Error Occurred!!","Error");
}  
  },(error)=>{
      this.spinnersirvice.hide();
    this.error=error;
   
  }

  )
}
//Reset Contact Form
ResetContactDetails()
{
// this.empcontact={
//   EmpContactId:null,
//   EmpId:null,
//   ResidanceAddress:null,
//   ResidanceDistId:"--Select--",
//   ResidanceCityId:null,
//   ResidanceMobile1:null,
//   ResidanceEmpEmail:null,
//   ResidanceEmpMohalla:null,
//   ResidanceEmpPoliceStation:null,
//   CurrentDistId:"--Select--",
//   CurrentCityId:null,
//   CurrentAddress:null,
//   CurrentCompanyId:"--Select--",
 
//   CurrentMobile1:null,
//   CurrentEmpEmail:null,
//   CurrentEmpMohalla:null,
//   ResidanceBlockId:"--Select--",
//   ResidanceThanaId:"--Select--",
//   CurrentBlockId:"--Select--",
//   CurrentThanaId:"--Select--",
//   CreatedBy:null,
//   ModifiedBy:null,
//   residanceTypePerm:"Urban",
//   residanceTypeCurrent:"Urban",
//   CurrentEmpPoliceStation:null,
//   ResidanceCompanyId:"--Select--",
//   ResidancePincode:null,
//   ResidanceZoneId:"--Select--",
//   CurrentPincode:null,
//   CurrentZoneId:"--Select--",
//   empChkAddress:"Yes",
//   MroleId:null,
//   UserLoginId:null
// }
this.empReg={
  Employee:null,
  EmployeeAccount:null,
    EmployeeContact:null,
    EmployeeTraining:null
}
}

SaveAccountDetails(AccForm:NgForm)
{
this.empReg.EmployeeAccount=AccForm.value;
this.empReg.EmployeeAccount.EmpOfficialId=parseInt(sessionStorage.getItem("EmpId"));
this.empReg.EmployeeAccount.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
this.spinnersirvice.show();
this.regservice.saveEmployee(this.empReg).subscribe((data:any)=>{this.result=data;
  this.spinnersirvice.hide();
  if(this.result>0)
{
this.toasterservice.success("Account Details Saved","Success");
this.ResetAccountForm();
this.TrainingNext=true;
this.btnSaveAccountDetails=false;
this.btnUpdateAccountDetails=true;
}
else
{
this.toasterservice.error("Some Error Occurred!!","Error");
}  
},(error)=>{
     this.spinnersirvice.hide(); 
  this.error=error;
 
}

)
}
//Reset Account Form
ResetAccountForm()
{
  // this.empAcc={
  //   EmpAccDetailD:null,
  //   EmpOfficialId:null,
  //   AccNo:null,
  //   AccName:null,
  //   Bank:null,
  //   Branch:null,
  //   Ifsc:null,
  //   CreatedBy:null,
  //   ModifiedBy:null,
  //   MroleId:null,
  //   UserLoginId:null
  // }
  this.empReg={
    Employee:null,
    EmployeeAccount:null,
      EmployeeContact:null,
      EmployeeTraining:null
  }
}

//Upload Training Certificate
url:string='';
UploadCertificate(e) {
  debugger
  if(e.target.files)
  {
    var reader=new FileReader();
    var splitImage:string[]=e.target.files[0].name.split('.');
    this.emptraining.FileExtention=splitImage[1];
    if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="pdf" && splitImage[splitImage.length-1]!="png")
    {
     this.toasterservice.error("The photo must be in .jpg/.png/.pdf format","Image format error!")
     return false;
    }
    if(e.target.files[0].size>1048576)
    {
      this.toasterservice.error("The photo must not be greater than 1MB","Image size error!")
      return false;
    }
    
 
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      
      this.emptraining.TrainingCertificate=(reader.result).toString();
      console.log(this.emptraining.TrainingCertificate+"___1");
    }
  }
 }
 SaveTrainingDetails(TrainingForm:NgForm)
 {
  var Datefrom:any;
  var DateTo:any;
  Datefrom=document.getElementById('DateFrom') as HTMLInputElement;
  DateTo=document.getElementById('DateTo') as HTMLInputElement;
  TrainingForm.value.CompId= this.emptraining.CompId;
   this.empReg.EmployeeTraining=TrainingForm.value;
   this.emptraining.DateFrom=Datefrom.value;
   this.emptraining.DateTo=DateTo.value;
   this.empReg.EmployeeTraining.DateFrom=this.emptraining.DateFrom;
   this.empReg.EmployeeTraining.DateTo= this.emptraining.DateTo;
this.empReg.EmployeeTraining.FileExtention=this.emptraining.FileExtention;
   this.empReg.EmployeeTraining.EmpId=parseInt(sessionStorage.getItem("EmpId"));
   this.empReg.EmployeeTraining.TrainingCertificate=this.emptraining.TrainingCertificate;
   this.empReg.EmployeeTraining.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
   console.log( this.empReg.EmployeeTraining.TrainingCertificate+"__________2")
   this.spinnersirvice.show();
   this.regservice.saveEmployee(this.empReg).subscribe((data:any)=>{this.result=data;
    this.spinnersirvice.hide();
    if(this.result>0)
  {
  this.toasterservice.success("Training Detail Added","Success");
  this.GetTrainingDetails();
  this.ResetTrainingForm();
 this.FinalSaveNext=true;

  }
  else
  {
  this.toasterservice.error("Some Error Occurred!!","Error");
  }  
  },(error)=>{
    this.spinnersirvice.hide();
    this.error=error
   
  }
  
  )
 }
 //Reset Training Form
 ResetTrainingForm()
 {
  this.emptraining={
    EmpTrainingId:null,
    EmpId:null,
    TrainingSession:null,
    CompId:null,
    DateFrom:null,
    DateTo:null,
    TrainingCertificate:'',
    CreatedBy:null,
    ModifiedBy:null,
    TrainingCertificatefile:null,
    FileExtention:null,
    MroleId:null,
    UserLoginId:null
  }
  this.empReg={
    Employee:null,
    EmployeeAccount:null,
      EmployeeContact:null,
      EmployeeTraining:null
  } 
 }
 //Get Training Details
 traininglst:any=null;

 GetTrainingDetails()
 {
   debugger
   this.spinnersirvice.show();
   var empid=parseInt(sessionStorage.getItem("EmpId"));
   this.regservice.getTrainingDetails(empid).subscribe((data:any)=>{this.traininglst=data;this.spinnersirvice.hide();},(error)=>{
    this.spinnersirvice.hide();
    this.error=error;
   
  })
 }

 // Save ID Proof Details
 // file upload for Id proof1
 UploadIDProof1(e) {
  if(e.target.files)
  {
    var reader=new FileReader();
    var splitImage:string[]=e.target.files[0].name.split('.');
    this.employee.FileExtention1=splitImage[1];
    if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="pdf" && splitImage[splitImage.length-1]!="png")
    {
     this.toasterservice.error("The photo must be in .jpg/.png/.pdf format","Image format error!")
     return false;
    }
    if(e.target.files[0].size>1048576)
    {
      this.toasterservice.error("The photo must not be greater than 1MB","Image size error!")
      return false;
    }
    
 
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
   
      this.employee.IdProof1Pic=(reader.result).toString();
    }
  }
 }
  // file upload for Id proof2
  UploadIDProof2(e) {
    if(e.target.files)
    {
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      this.employee.FileExtention2=splitImage[1];
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="pdf" && splitImage[splitImage.length-1]!="png")
      {
       this.toasterservice.error("The photo must be in .jpg/.png/.pdf format","Image format error!")
       return false;
      }
      if(e.target.files[0].size>1048576)
      {
        this.toasterservice.error("The photo must not be greater than 1MB","Image size error!")
        return false;
      }
      
   
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
    
        this.employee.IdProof2Pic=(reader.result).toString();
      }
    }
   }
   UploadEduCer(e) {
    if(e.target.files)
    {
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      this.employee.FileExtention4=splitImage[1];
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="pdf" && splitImage[splitImage.length-1]!="png")
      {
       this.toasterservice.error("The photo must be in .jpg/.png/.pdf format","Image format error!")
       return false;
      }
      if(e.target.files[0].size>1048576)
      {
        this.toasterservice.error("The photo must not be greater than 1MB","Image size error!")
        return false;
      }
      
   
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
    
        this.employee.IdProof3Pic=(reader.result).toString();
      }
    }
   }
   UploadBirthCer(e) {
    if(e.target.files)
    {
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      this.employee.FileExtention5=splitImage[1];
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="pdf" && splitImage[splitImage.length-1]!="png")
      {
       this.toasterservice.error("The photo must be in .jpg/.png/.pdf format","Image format error!")
       return false;
      }
      if(e.target.files[0].size>1048576)
      {
        this.toasterservice.error("The photo must not be greater than 1MB","Image size error!")
        return false;
      }
      
   
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
    
        this.employee.BirthCerPic=(reader.result).toString();
      }
    }
   }
   UploadTrnsCer(e) {
    if(e.target.files)
    {
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      this.employee.FileExtention6=splitImage[1];
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="pdf" && splitImage[splitImage.length-1]!="png")
      {
       this.toasterservice.error("The photo must be in .jpg/.png/.pdf format","Image format error!")
       return false;
      }
      if(e.target.files[0].size>1048576)
      {
        this.toasterservice.error("The photo must not be greater than 1MB","Image size error!")
        return false;
      }
      
   
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
    
        this.employee.TransCert=(reader.result).toString();
      }
    }
   }
     // file upload for Id proof2
   UploadEmpPic(e) {
    if(e.target.files)
    {
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      this.employee.FileExtention3=splitImage[1];
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="png")
      {
       this.toasterservice.error("The photo must be in .jpg/.jpeg/.png format","Image format error!")
       return false;
      }
      if(e.target.files[0].size>1048576)
      {
        this.toasterservice.error("The photo must not be greater than 1MB","Image size error!")
        return false;
      }
      
   
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
        this.employee.EmpPic=(reader.result).toString();
      }
    }
   }

   SaveIdProofDetails(IdProofForm:NgForm)
   {
//      if(this.employee.IdProof1Pic==null||this.employee.IdProof1Pic=="")
//      {
// this.toasterservice.error("कृपया विभागीय पहचान पत्र की फोटो अपलोड करें","Failed");
// return false;
//      }
     if(this.employee.IdProof3Pic==null||this.employee.IdProof3Pic=="")
     {
      this.toasterservice.error("कृपया शैक्षिक प्रमाण पत्र की फोटो अपलोड करें","Failed");
      return false;
     }
     if(this.employee.BirthCerPic==null||this.employee.BirthCerPic=="")
     {
      this.toasterservice.error("कृपया जन्म प्रमाण पत्र की फोटो अपलोड करें","Failed");
      return false;
     }
     if(this.employee.EmpPic==null||this.employee.EmpPic=="")
     {
      this.toasterservice.error("कृपया स्वयंसेवक की फोटो अपलोड करें","Failed");
      return false;
     }
     if(this.employee.NewJawanStatus=="TRANSFERABLE")
     {
      if(this.employee.TransCert==null||this.employee.TransCert=="")
      {
        this.toasterservice.error("कृपया स्थानांतरित प्रमाण पत्र अपलोड करें","Failed");
          return false;
      }
     }
  
this.empReg.Employee=IdProofForm.value;
this.empReg.Employee.IdProof1Pic=this.employee.IdProof1Pic;
this.empReg.Employee.IdProof2Pic=this.employee.IdProof2Pic;
this.empReg.Employee.EmpPic=this.employee.EmpPic;
this.empReg.Employee.FileExtention1=this.employee.FileExtention1;
this.empReg.Employee.FileExtention2=this.employee.FileExtention2;
this.empReg.Employee.FileExtention3=this.employee.FileExtention3;
this.empReg.Employee.FileExtention4=this.employee.FileExtention4;
this.empReg.Employee.FileExtention5=this.employee.FileExtention5;
this.empReg.Employee.FileExtention6=this.employee.FileExtention6;
this.empReg.Employee.EmpId=parseInt(sessionStorage.getItem("EmpId"));
this.empReg.Employee.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
this.spinnersirvice.show();
this.regservice.saveEmployee(this.empReg).subscribe((data:any)=>{this.result=data;
  this.spinnersirvice.hide();
  if(this.result>0)
{
this.toasterservice.success("Document Detail Saved","Success");
//this.GetTrainingDetails();
//this.ResetDocumentForm();
this.BioDataNext=true;
this.btnSaveFinalDetails=false;
this.traininglst=null;
this.btnUpdateDocumentDetails=true;
$("#IdProof1Pic").val('');
$("#IdProof2Pic").val('');
$("#IdProof3Pic").val('');
$("#BirthCerPic").val('');
$("#TransCert").val('');
$("#EmpPic").val('');


}
else
{
this.toasterservice.error("Some Error Occurred!!","Error");
}  
},(error)=>{
    this.spinnersirvice.hide();  
  this.error=error
 
}

)
   }
   ResetDocumentForm()
   {
    this.employee=
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
       Status:"Old",
       NewJawanStatus:null,
       TransCert:null,
       FileExtention6:null,
       IsTrained:null
    }
    this.empcontact={

      EmpContactId:null,
      EmpId:null,
      ResidanceAddress:null,
      ResidanceDistId:"--Select--",
      ResidanceCityId:null,
      ResidanceMobile1:null,
      ResidanceEmpEmail:'',
      ResidanceEmpMohalla:null,
      ResidanceEmpPoliceStation:null,
      CurrentDistId:"--Select--",
      CurrentCityId:null,
      CurrentAddress:null,
      CurrentCompanyId:"--Select--",
     
      CurrentMobile1:null,
      CurrentEmpEmail:'',
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
    this.empAcc={
      EmpAccDetailD:null,
      EmpOfficialId:null,
      AccNo:null,
      AccName:null,
      Bank:null,
      Branch:null,
      Ifsc:null,
      CreatedBy:null,
      ModifiedBy:null,
      MroleId:null,
      UserLoginId:null
    }
  this.empReg={
    Employee:null,
    EmployeeAccount:null,
      EmployeeContact:null,
      EmployeeTraining:null
  }
   }

   //Get Bio Data
data:any;
   GetBioData()
   {
     var EmpId=parseInt(sessionStorage.getItem("EmpId"));
     this.spinnersirvice.show();
     this.regservice.getBioData(EmpId).subscribe((data:any)=>{
       this.data=data;
       this.spinnersirvice.hide();
       this.biodatadivshow=true;
      this.btnSaveBasicDetails=true;
      this.btnSaveContactDetails=true;
      this.btnSaveAccountDetails=true;
      this.btnSaveTraniningDetails=true;
      this.btnSaveFinalDetails=true;
      this.data.Employee.EmpPic=AppComponent.documentUrl+this.data.Employee.empPic;
      this.data.Employee.BirthCerPic=AppComponent.documentUrl+this.data.Employee.BirthCerPic;
     },(error)=>{
      this.spinnersirvice.hide();
      this.error=error
     
    })
   }
   jawanDetails:any;
   form: FormGroup;
   
   getDetailByAppNo(AppNo)
   {
    
    this.spinnersirvice.show();
    
     this.regservice.getDetailAppNo(AppNo).subscribe((data:any)=>{
       this.jawanDetails=data;
       debugger;
      this.spinnersirvice.hide();
    if(this.jawanDetails!=null)
    {
      if(this.jawanDetails.value.Employee!=null)
      {
        debugger;
        if(this.MRoleId==1)
        {
        this.DOBReadonly=false;
        }
       else
        {
        this.DOBReadonly=true;
        }
        sessionStorage.setItem("EmpId",this.jawanDetails.value.Employee.empId);
        this.employee.EmpName=this.jawanDetails.value.Employee.empName;
        this.employee.FatherName=this.jawanDetails.value.Employee.fatherName;
        this.employee.MotherName=this.jawanDetails.value.Employee.motherName;
        this.employee.EmpDob=this.jawanDetails.value.Employee.empDob;
        this.employee.EmpGender=this.jawanDetails.value.Employee.empGender;
        this.employee.EmpCaste=this.jawanDetails.value.Employee.empCaste;
        this.employee.Height=this.jawanDetails.value.Employee.height;
        this.employee.Chest=this.jawanDetails.value.Employee.chest;
        this.employee.EmpEdu=this.jawanDetails.value.Employee.empEdu;
        if(this.jawanDetails.value.Employee.empSplSkill!="COMPUTOR OPERATOR" && this.jawanDetails.value.Employee.empSplSkill!="DRIVER")
        {
          this.employee.EmpSplSkill="OTHER";
          this.employee.OtherSplSkill=this.jawanDetails.value.Employee.empSplSkill;

        }
        else
        this.employee.EmpSplSkill=this.jawanDetails.value.Employee.empSplSkill;
        this.employee.EmpDesigId=this.jawanDetails.value.Employee.empDesgId;
       this.employee.AadharNo=this.jawanDetails.value.Employee.aadharNo;
       this.employee.PanNo=this.jawanDetails.value.Employee.panNo;
       this.employee.NominalRegNo=this.jawanDetails.value.Employee.nominalRegNo;
       this.employee.Status=this.jawanDetails.value.Employee.status;
       this.employee.OldServiceNo=this.jawanDetails.value.Employee.oldServiceNo;
       this.employee.NewJawanStatus=this.jawanDetails.value.Employee.newJawanStatus;
       this.IsTrained=this.jawanDetails.value.Employee.isTrained;
        this.btnSaveBasicDetails=false;
        this.btnUpdateBasicDetails=true;
        this.ContactNext=true;

      }
      if(this.jawanDetails.value.EmployeeContact!=null)
      {
        this.empcontact.residanceTypeCurrent=this.jawanDetails.value.EmployeeContact.residanceTypeCurrent;
        this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.residanceTypePerm;
        this.empcontact.CurrentAddress=this.jawanDetails.value.EmployeeContact.currentAddress;
        this.empcontact.ResidanceAddress=this.jawanDetails.value.EmployeeContact.residanceAddress;
     
        this.empcontact.ResidanceEmpEmail=this.jawanDetails.value.EmployeeContact.residanceEmpEmail;
        this.empcontact.CurrentEmpEmail=this.jawanDetails.value.EmployeeContact.currentEmpEmail;
        this.empcontact.ResidanceMobile1=this.jawanDetails.value.EmployeeContact.residanceMobile1;
        this.empcontact.CurrentMobile1=this.jawanDetails.value.EmployeeContact.currentMobile1;
        this.empcontact.ResidancePincode=this.jawanDetails.value.EmployeeContact.residancePincode;
        this.empcontact.CurrentPincode=this.jawanDetails.value.EmployeeContact.currentPincode;
        this.empcontact.CurrentDistId=this.jawanDetails.value.EmployeeContact.currentDistId;
        this.empcontact.CurrentZoneId=this.jawanDetails.value.EmployeeContact.currentZoneId;
        console.log(this.empcontact.CurrentDistId);
        this.getdistrict(this.empcontact.CurrentZoneId,this.empcontact.CurrentDistId)
          //this.getCompany(this.empcontact.CurrentDistId,'');
         this.empcontact.CurrentCompanyId=this.jawanDetails.value.EmployeeContact.currentCompanyId;
        
       
          //this.getBlock(this.jawanDetails.value.EmployeeContact.currentDistId)
          this.empcontact.CurrentBlockId=this.jawanDetails.value.EmployeeContact.currentBlockId;
        this.getCompany(this.empcontact.CurrentDistId,this.empcontact.CurrentBlockId)
       //this.getThana(this.empcontact.CurrentDistId);
       this.empcontact.CurrentThanaId=this.jawanDetails.value.EmployeeContact.currentThanaId;
       
        this.empcontact.ResidanceZoneId=this.jawanDetails.value.EmployeeContact.residanceZoneId;
        this.getresdistrict(this.empcontact.ResidanceZoneId);
       
         
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
        // this.empcontact.residanceTypePerm=this.jawanDetails.value.EmployeeContact.ResidanceTypePerm;
       
        this.btnSaveContactDetails=false;
        this.btnUpdateContactDetails=true;
        this.AccountNext=true;
      }
      if(this.jawanDetails.value.EmployeeAccount!=null)
      {
        this.empAcc.AccName=this.jawanDetails.value.EmployeeAccount.accName;
        this.empAcc.AccNo=this.jawanDetails.value.EmployeeAccount.accNo;
        this.empAcc.Bank=this.jawanDetails.value.EmployeeAccount.bank;
        this.empAcc.Branch=this.jawanDetails.value.EmployeeAccount.branch;
        this.empAcc.Ifsc=this.jawanDetails.value.EmployeeAccount.ifsc;
        
        this.btnSaveAccountDetails=false;
        this.btnUpdateAccountDetails=true;
        this.TrainingNext=true;
      }
      if(this.jawanDetails.value.EmpTraining.length>0)
      {
        this.traininglst=this.jawanDetails.value.EmpTraining;
       
        this.btnSaveTraniningDetails=false;
        this.FinalSaveNext=true;
      }
      this.GetTrainingDetails();
      if(this.jawanDetails.value.EmployeeDocument.idProof1Type!=null)
      {
        this.employee.IdProof1No=this.jawanDetails.value.EmployeeDocument.idProof1No;
        this.employee.IdProof1Type=this.jawanDetails.value.EmployeeDocument.idProof1Type;
        this.employee.IdProof2No=this.jawanDetails.value.EmployeeDocument.idProof2No;
        this.employee.IdProof2Type=this.jawanDetails.value.EmployeeDocument.idProof2Type;
        this.employee.IdProof3No=this.jawanDetails.value.EmployeeDocument.idProof3No;
        this.employee.IdProof3Type=this.jawanDetails.value.EmployeeDocument.idProof3Type;
        this.employee.BirthCerName=this.jawanDetails.value.EmployeeDocument.birthCerName;;
        this.employee.BirthCerNo=this.jawanDetails.value.EmployeeDocument.birthCerNo;
        this.url=AppComponent.documentUrl+this.jawanDetails.value.EmployeeDocument.empPic;
      //  this.employee.BirthCerPic=AppComponent.documentUrl+this.jawanDetails.value.EmployeeDocument.birthCerPic;
       // console.log(this.employee.BirthCerPic);
        this.btnUpdateDocumentDetails=true;
        this.btnSaveFinalDetails=false;
        this.BioDataNext=true;
      }
    }
    
    },(error)=>{
      this.spinnersirvice.hide();
      this.error=error
     
    })
   }
   keydownFunction(event)
{
  if(event.keyCode==13)
  {
    this.getDetailByAppNo(this.AppNo);
  }
}
//Update Basic Details
UpdateBasicDetails(employee)
{
  debugger
  var Dob:any;
   Dob=document.getElementById('EmpDob') as HTMLInputElement;
   employee.EmpDob=Dob.value;
   employee.EmpDesigId=parseInt(employee.EmpDesigId);
   if(this.employee.EmpSplSkill=="OTHER")
   {
    this.employee.EmpSplSkill=this.employee.OtherSplSkill;
   }
   if(this.employee.Status=="Old")
   {
    this.employee.Status="Old";
    this.employee.NewJawanStatus=null;
   }
   else
   {
    this.employee.Status="New";
    this.employee.OldServiceNo=null;
   }
this.empReg.Employee=employee;
this.empReg.Employee.EmpId=parseInt(sessionStorage.getItem("EmpId"));
this.empReg.Employee.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
this.empReg.Employee.IsTrained=this.IsTrained;
this.spinnersirvice.show();
this.regservice.updateJawan(this.empReg).subscribe((data:any)=>{this.result=data;
  this.spinnersirvice.hide();
  if(this.result!=null)
{
this.toasterservice.success("Basic Details Updated","Success",{timeOut:10000});
this.ContactNext=true;
this.ResetBasicDetailForm();

}
else
{
this.toasterservice.error("Some Error Occurred!!","Error");
}  
},(error)=>{
  this.spinnersirvice.hide();
  this.error=error
 
}

)
}
//Update Contact Details
UpdateContactDetails(empcontact)
{
  if(this.empcontact.residanceTypeCurrent=='Urban')
  {
    empcontact.CurrentBlockId=null;
  }
  else
  {
    empcontact.CurrentBlockId=parseInt(this.empcontact.CurrentBlockId);
  }
  if(this.empcontact.residanceTypePerm=='Urban')
  {
    empcontact.ResidanceBlockId=null;
  }
  else
  {
    empcontact.ResidanceBlockId=parseInt(this.empcontact.ResidanceBlockId);
  }
  empcontact.CurrentZoneId=parseInt(this.empcontact.CurrentZoneId)
  empcontact.CurrentDistId=parseInt(this.empcontact.CurrentDistId)
  empcontact.CurrentCompanyId=parseInt(this.empcontact.CurrentCompanyId)
  empcontact.CurrentThanaId=parseInt(this.empcontact.CurrentThanaId)
  empcontact.ResidanceZoneId=parseInt(this.empcontact.ResidanceZoneId)
  empcontact.ResidanceDistId=parseInt(this.empcontact.ResidanceDistId)
  empcontact.ResidanceCompanyId=parseInt(this.empcontact.ResidanceCompanyId)
  empcontact.ResidanceThanaId=parseInt(this.empcontact.ResidanceThanaId)
  this.empReg.EmployeeContact=empcontact;
  this.empReg.EmployeeContact.EmpId=parseInt(sessionStorage.getItem("EmpId"));
  this.empReg.EmployeeContact.residanceTypeCurrent=this.empcontact.residanceTypeCurrent;
  this.empReg.EmployeeContact.residanceTypePerm=this.empcontact.residanceTypePerm;
  this.empReg.EmployeeContact.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  this.spinnersirvice.show();
  this.regservice.updateJawan(this.empReg).subscribe((data:any)=>{this.result=data;
    this.spinnersirvice.hide();
    if(this.result>0)
  {
this.toasterservice.success("Contact Details Updated","Success");
this.ResetContactDetails();

  }
  else
{
  this.toasterservice.error("Some Error Occurred!!","Error");
}  
  },(error)=>{
    this.spinnersirvice.hide();
    this.error=error
   
  }

  )
}
//Update Account Details
UpdateAccountDetails(empAcc)
{
  this.empReg.EmployeeAccount=empAcc;
  this.empReg.EmployeeAccount.EmpOfficialId=parseInt(sessionStorage.getItem("EmpId"));
  this.empReg.EmployeeAccount.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  this.spinnersirvice.show();
  this.regservice.updateJawan(this.empReg).subscribe((data:any)=>{this.result=data;
    this.spinnersirvice.hide();
    if(this.result>0)
  {
  this.toasterservice.success("Account Details Updated","Success");
  this.ResetAccountForm();
  
  }
  else
  {
  this.toasterservice.error("Some Error Occurred!!","Error");
  }  
  },(error)=>{
    this.spinnersirvice.hide();
    this.error=error
   
  }
  
  )
}
// Update Document Details
UpdateDocumentDetails(employee)
{
this.employee=employee;
  this.employee.EmpId=parseInt(sessionStorage.getItem("EmpId"));
  this.employee.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  this.spinnersirvice.show();
  this.regservice.UpdateDocumentDetails(this.employee).subscribe((data:any)=>{this.result=data;
    this.spinnersirvice.hide();
    if(this.result>0)
  {
  this.toasterservice.success("Document Details Updated","Success");
  $("#IdProof1Pic").val('');
  $("#IdProof2Pic").val('');
  $("#IdProof3Pic").val('');
  $("#BirthCerPic").val('');
  $("#TransCert").val('');
  $("#EmpPic").val('');
  }
  else
  {
  this.toasterservice.error("Some Error Occurred!!","Error");
  }  
  }
  
  )
}
//EditTraining

EditTraining(empTrainingId)
{
  debugger
  this.btnAddTraining=false
  this.btnUpdateTraining=true;
  var training=this.traininglst.find(Id=>Id.empTrainingId===empTrainingId);
  this.emptraining.EmpTrainingId=empTrainingId;
  this.emptraining.TrainingSession=training.trainingSession;
  this.emptraining.DateFrom=training.dateFrom;
  this.emptraining.DateTo=training.dateTo;
  this.emptraining.CompId=training.compId;
  this.emptraining.TrainingCertificate=training.trainingCertificate;

  this.emptraining.FileExtention=this.emptraining.FileExtention;
  
      var reader=training.trainingCertificate
      var splitImage:string[]=reader.split('.');
      this.emptraining.FileExtention=splitImage[1];
  
}
//UpdateTraining
UpdateTraining()
{
 
  this.spinnersirvice.show();
/*   var Datefrom:any;
  var DateTo:any;
  Datefrom=document.getElementById('DateFrom') as HTMLInputElement;
  DateTo=document.getElementById('DateTo') as HTMLInputElement;
  this.emptraining.DateFrom=Datefrom.value;
  this.emptraining.DateTo=DateTo.value;
   */
  this.emptraining.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  this.regservice.UpdateTraining(this.emptraining).subscribe((data:any)=>{this.result=data;
    this.spinnersirvice.hide();
  if(this.result>0)
  {
    this.btnUpdateTraining=false;
    this.btnAddTraining=true;
    this.toasterservice.success("Training Detail Updated","Success");
    this.ResetTrainingForm();
    
    this.GetTrainingDetails();
  }
  })
}
DeleteTraining(empTrainingId)
{
  debugger
  confirm("Are You Sure To Delete This Record??")
  {
    
  this.emptraining.EmpTrainingId=empTrainingId
  this.emptraining.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  
  this.spinnersirvice.show();
  this.regservice.DeleteTraining(this.emptraining).subscribe((data:any)=>{this.result=data;
    this.spinnersirvice.hide();
  if(this.result>0)
  {
    this.toasterservice.success("Training Detail Deleted","Success");
    this.GetTrainingDetails();
  }
  })
  }
}
GotoBasicPage()
{
  if(this.jawanDetails.value.Employee==null)
  {
    sessionStorage.setItem("EmpId",null);
    window.location.reload()
  }
else
{
  sessionStorage.setItem("EmpId",null);
  this.router.navigateByUrl("/PRDDepartment/Registration");
}
}

//Change Calender by traning year

// DateValue:Date;
// ChangeCalender(event:any)
// {
//   if(event.keyCode==13||event.keyCode==9)
//   {
//      var trainingYr=parseInt(event.target.value);
//      var value =new Date(trainingYr,1,1)
//      this.DateValue=value;
//     // this.minDate=new Date(trainingYr);
//     // //this.minDate.setDate(1);


//   }


// }

ClickUrbanRuralCurrent()

{
  if($("#radioCurrentUrban").prop("checked",true))
  {
    this.empcontact.CurrentCompanyId="--Select--";
    this.empcontact.CurrentBlockId="--Select--";
    this.getCompany(this.empcontact.CurrentDistId,'');
  }
 
}
ClickUrbanRuralResidance()

{
  if($("#radioPermUrban").prop("checked",true))
  {
    this.empcontact.ResidanceCompanyId="--Select--";
    this.empcontact.ResidanceBlockId="--Select--";
    this.getregCompany(this.empcontact.ResidanceDistId,'');
  }
 
}

}
import { NgForm } from '@angular/forms';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../../Service/mangal-dal.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent implements OnInit {
TeamType=parseInt(sessionStorage.getItem("TeamType"))
MemDocUrl=AppComponent.MemberDocURl;
btnSave:boolean=true;
btnUpdate:boolean=false;
ResetGender:any;
  constructor(private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.GetMemberDesignation();
    if(this.TeamType==1)
    {
  this.Member.Gender="MALE";
  this.ResetGender="MALE";
     }
     else if(this.TeamType==2)
     {
   this.Member.Gender="FEMALE";
   this.ResetGender="FEMALE";
      }
      this.GetMemberDeailsByTeam();
  }
  Desglst:any;
  error:any;
  Member:any={
    MemberId:null,
    TeamId:null,
    MemberName:null,
    FatherName:null,
    MotherName:null,
    Dob:null,
    Gender:"0",
    ContactNo:null,
    Height:null,
    Chest:null,
    EduCert:null,
    IdCard:null,
    MemberPic:null,
    UserLoginId:null,
    FileExtention:null,
    FileExtention1:null,
    FileExtention2:null,
    MemberDesignationId:0
  }
  GetMemberDesignation()
  {
    this.spinner.show();
    return this.mangaldalService.GetMemberDesignation().subscribe(data=>{
      this.Desglst=data;
      this.spinner.hide();
    },(error)=>{this.error=error
    this.spinner.hide();
    } )
  }
  UploadEduCert(e) {
    if(e.target.files)
    {
     
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      var FileExtention=splitImage[1];
      this.Member.FileExtention=FileExtention;
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="png" && splitImage[splitImage.length-1]!="pdf")
      {
       this.toastr.error("The photo must be in .jpg/.jpeg/.png/pdf format","Image format error!")
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
        this.Member.EduCert=UploadFile;
      }
    }
  
   
   }
   UploadIdCard(e) {
    if(e.target.files)
    {
    
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      var FileExtention=splitImage[1];
      this.Member.FileExtention1=FileExtention;
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="png" && splitImage[splitImage.length-1]!="pdf")
      {
       this.toastr.error("The photo must be in .jpg/.jpeg/.png/pdf format","Image format error!")
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
        this.Member.IdCard=UploadFile;
      }
    }
  
   
   }
   UploadMemberPic(e) {
    if(e.target.files)
    {
 
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      var FileExtention=splitImage[1];
      this.Member.FileExtention2=FileExtention;
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="png")
      {
       this.toastr.error("The photo must be in .jpg/.jpeg/.png format","Image format error!")
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
        this.Member.MemberPic=UploadFile;
      }
    }
  
   
   }
   memberResult:any;
   MemberRegister(form:NgForm)
   {
     var c=confirm("Are you Sure To Add this Member??");
     if(c==true)
     {
       this.Member.MemberDesignationId=parseInt(form.value.Designation);
       this.Member.TeamId=parseInt(sessionStorage.getItem("TeamId"));
       this.Member.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
       this.Member.Dob=$("#Dob").val();
       var age=this.GetAgeOfMember(this.Member.Dob);
       if(age<15 ||age>35)
       {
         this.toastr.error("सदस्य की आयु 15 से 35 वर्ष के बीच होनी चाहिए ")
         return false;
       }
       this.spinner.show();
      this.mangaldalService.MemberRegister(this.Member).subscribe(data=>{
        this.memberResult=data;

 this.toastr.success(this.memberResult);
//  this.Member={
//   MemberId:null,
//   TeamId:null,
//   MemberName:null,
//   FatherName:null,
//   MotherName:null,
//   Dob:null,
//   Gender:this.Member.Gender,
//   ContactNo:null,
//   Height:null,
//   Chest:null,
//   EduCert:null,
//   IdCard:null,
//   MemberPic:null,
//   UserLoginId:null,
//   FileExtention:null,
//   FileExtention1:null,
//   FileExtention2:null,
//   MemberDesignationId:0
// }
form.resetForm();
this.Member.MemberDesignationId=0;
$("#Gender").val(this.ResetGender);
this.GetMemberDeailsByTeam();
 this.spinner.hide();
       },error=>{this.error=error
        this.spinner.hide();
        this.toastr.error(this.error.error);
        
      
      })
     }
  
   }
   Memberlst=[];
   MemPic="";
   EduCert="";
   IdCard="";
   GetMemberDeailsByTeam()
   {
     var TeamId=parseInt(sessionStorage.getItem("TeamId"));
     this.spinner.show();
     this.mangaldalService.GetMemberDeailsByTeam(TeamId).subscribe(data=>{
this.Memberlst=data;

this.spinner.hide();
     },error=>{
       this.error=error;
       this.spinner.hide();
       this.toastr.error(this.error.error);
     })
   }

   DownloadEduCert(eduCert)
   {
     window.open(this.MemDocUrl+eduCert);
   }
   DownloadIdCard(IdCard)
   {
     window.open(this.MemDocUrl+IdCard);
   }


   EditMember(MemId)
   {

    var pipe = new DatePipe('en-US');

    
 
     var MemObj=this.Memberlst.find(memId=>memId.memberId===MemId);
     this.Member.MemberName=MemObj.memberName;
     this.Member.FatherName=MemObj.fatherName;
     this.Member.MotherName=MemObj.motherName;
     var mySimpleFormat = pipe.transform(MemObj.dob, 'dd/MM/yyyy');
     this.Member.Dob=mySimpleFormat;
     this.Member.ContactNo=MemObj.contactNo;
     this.Member.Height=MemObj.height;
     this.Member.Chest=MemObj.chest;
     this.Member.MemberDesignationId=MemObj.memberDesignationId;
     this.Member.MemberId=MemObj.memberId;
     this.btnSave=false;
     this.btnUpdate=true;
   }

   UpdateResult:any;
   UpdateMember(Member)
   {
     var c=confirm("Are You Sure Want to Update This Record??");
     if(c==true)
     {
      Member.MemberDesignationId=parseInt(Member.MemberDesignationId);
      Member.TeamId=parseInt(sessionStorage.getItem("TeamId"));
      Member.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      Member.Dob=$("#Dob").val();
      var age=this.GetAgeOfMember(Member.Dob);
      if(age<15 ||age>35)
      {
        this.toastr.error("सदस्य की आयु 15 से 35 वर्ष के बीच होनी चाहिए ")
        return false;
      }
      this.spinner.show();
      this.mangaldalService.UpdateMember(Member).subscribe(data=>{
  this.UpdateResult=data;
  this.toastr.success(this.UpdateResult);
  this.GetMemberDeailsByTeam();
  this.btnSave=true;
  this.btnUpdate=false;
  this.spinner.hide();
  this.Member={
    MemberId:null,
    TeamId:null,
    MemberName:null,
    FatherName:null,
    MotherName:null,
    Dob:null,
    Gender:this.Member.Gender,
    ContactNo:null,
    Height:null,
    Chest:null,
    EduCert:null,
    IdCard:null,
    MemberPic:null,
    UserLoginId:null,
    FileExtention:null,
    FileExtention1:null,
    FileExtention2:null,
    MemberDesignationId:0
  }
  
      },error=>{
        this.error=error;
        this.spinner.hide();
        this.toastr.error(this.error.error);
      })
     }
  
   }
   DeleteResult:any;
   DeleteMember(Id)
   {
    confirm("Are You Sure Want to Delete This Record??")
    {
    this.Member.MemberId=Id;
    this.Member.TeamId=parseInt(sessionStorage.getItem("TeamId"));
    this.Member.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
   
    this.spinner.show();
    this.mangaldalService.DeleteMember(this.Member).subscribe(data=>{
this.DeleteResult=data;
this.GetMemberDeailsByTeam();
this.spinner.hide();

    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
   }
  }

  ///Get Age Of Member
  GetAgeOfMember(dateSent){
    var pipe = new DatePipe('en-US');
    let currentDate = new Date();
  
    dateSent=pipe.transform(dateSent, 'dd/MM/yyyy');
    dateSent = new Date(dateSent);

    return Math.floor(currentDate.getFullYear()- dateSent.getFullYear());
}
}

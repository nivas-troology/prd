import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../../Service/mangal-dal.service';
import { MasterService } from './../../Service/master.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-mangaldal-entry',
  templateUrl: './mangaldal-entry.component.html',
  styleUrls: ['./mangaldal-entry.component.css']
})
export class MangaldalEntryComponent implements OnInit {
  error:any;
  teamDiv:boolean=true;
  memberDiv:boolean=false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  dtTrigger=new Subject();
  dtOptions:any={};
  
  ngAfterViewInit(){
    //Define datatable 
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  btnSave:boolean=true;
btnUpdate:boolean=false;
  constructor(private masterService:MasterService,private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService,private route:Router) { }

  ngOnInit(): void {
    this.getdistrict('','');
    this.GetTeamType();
    this.GetMangalDalDetails();
    this.GetMemberDesignation();
   
  }
  Desglst:any;
  Team:any={
    DistId:0,
    BlockId:0,
    Gpid:0,
    TeamName:null,
    TeamTypeId:0,
    UserLoginId:null,
    CertificateNo:null,
    ValidFrom:null,
    ValidTo:null,
    TeamId:null
  }
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
  memberResult:any;
  MemberRegister(form:NgForm)
  {
    var c=confirm("Are you Sure To Add this Member??");
    if(c==true)
    {
      this.Member.MemberDesignationId=parseInt(form.value.Designation);
      this.Member.TeamId=parseInt(localStorage.getItem("TeamId"));
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
this.GetMemberDeailsByTeam();
$("#Gender").val(this.GenderValue);
this.Member.Gender=this.GenderValue;
this.spinner.hide();
      },error=>{this.error=error
       this.spinner.hide();
       this.toastr.error(this.error.error);
       
     
     })
    }
 
  }
  Memberlst=[];
  btnMemberSave:boolean=true;
  btnMemberUpdate:boolean=false;
   distlist:any;
   GetMemberDeailsByTeam()
   {
     var TeamId=parseInt(localStorage.getItem("TeamId"));
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
    getdistrict(zoneId,distId)
    {
      this.spinner.show();
  this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{
    this.distlist=data;
    this.spinner.hide();
  },error=>{
    this.error=error;
    this.spinner.hide();
    
  })
  
    }
    blocklst:any;
    getBlock(distId)
    {
      this.spinner.show();
      this.masterService.getBlock(distId).subscribe((data:any)=>{
        this.blocklst=data;
        if(this.teamObj!=null)
        {
          this.Team.BlockId=this.teamObj.blockId;
        }
        this.spinner.hide();
      }
       ,error=>{
        this.error=error;
        this.spinner.hide();
        
      } )
  
    }
    Gplst:any;
    getGP(BlockId)
    {
      this.spinner.show();
      this.masterService.GetGramPanchayat(BlockId).subscribe(data=>{
        
        this.Gplst=data;
        if(this.teamObj!=null)
        {
          this.Team.Gpid=this.teamObj.gpId;
        }
        this.spinner.hide();
      },error=>{
        this.error=error;
        this.spinner.hide();
        
      })
    }
    TeamTypelst:any;
    GetTeamType()
    {
      this.spinner.show();
      this.masterService.GetTeamType().subscribe(data=>{
        
        this.TeamTypelst=data;
        this.spinner.hide();
      },error=>{
        this.error=error;
        this.spinner.hide();
        
      })
    }
  regResult:any;
    OrgRegistration(form:NgForm)
    {
      if(this.Team.TeamId==null){
        var c=confirm("Do You Want to Save this Record Finally??")
        if(c==true)
        {
          this.Team.TeamId=0;
          this.Team.DistId=parseInt(form.value.District);
          this.Team.BlockId=parseInt(form.value.Block);
          this.Team.Gpid=parseInt(form.value.GP);
          this.Team.TeamTypeId=parseInt(form.value.TeamType);
          this.Team.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
        this.Team.ValidFrom=$("#ValidFrom").val();
        this.Team.ValidTo=$("#ValidTo").val();
        
          this.spinner.show();
        this.mangaldalService.MangalDalEntry(this.Team).subscribe(data=>{
        this.regResult=data;
        this.toastr.success("Record Saved Successfully");
        this.GetMangalDalDetails();
        this.spinner.hide();
        
        form.resetForm();
        this.Team.DistId=0;
        this.Team.BlockId=0;
        this.Team.Gpid=0;
        this.Team.TeamTypeId=0;
        this.Team.TeamId=null;
        },error=>{
        this.error=error;
        this.spinner.hide();
        this.toastr.error(this.error.error);
        })
        }
      }
else
{
  var c=confirm("Do You Want to Update this Record Finally??")
  if(c==true)
  {
        this.Team.TeamId=this.teamObj.teamId;
        this.Team.DistId=parseInt(form.value.District);
        this.Team.BlockId=parseInt(form.value.Block);
        this.Team.Gpid=parseInt(form.value.GP);
        this.Team.TeamTypeId=parseInt(form.value.TeamType);
        this.Team.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
        this.Team.ValidFrom=$("#ValidFrom").val();
        this.Team.ValidTo=$("#ValidTo").val();
  
        this.spinner.show();
    this.mangaldalService.UpdateMangalDalDetails(this.Team).subscribe(data=>{
      this.regResult=data;
      this.toastr.success("Data Updated Successfully");
      this.rerender();
      this.GetMangalDalDetails();
  this.btnSave=true;
  this.btnUpdate=false;
  this.teamObj=null;
      this.spinner.hide();
      form.resetForm();
      this.Team.DistId=0;
      this.Team.BlockId=0;
      this.Team.Gpid=0;
      this.Team.TeamTypeId=0;
      this.Team.TeamId=null;
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
}
   
    }
  }
  
    Orglst:any;
    GetMangalDalDetails()
    {
      this.spinner.show();
   
      this.mangaldalService.GetMangalDalDetails().subscribe(data=>{
        this.Orglst=data;
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
        this.spinner.hide();
      },error=>{
        this.error=error;
        this.spinner.hide();
        this.toastr.error(this.error.error);
      })
    }
   
 
    
    
    teamObj:any=null;
    Edit(TeamId)
    {
      
      this.teamObj=this.Orglst.find(team=>team.teamId===TeamId);
      this.Team.TeamId= this.teamObj.teamId;
      this.Team.DistId=this.teamObj.distId;
      this.getBlock( this.Team.DistId);
      this.Team.BlockId=this.teamObj.blockId;
      this.getGP(this.Team.BlockId);
      this.Team.Gpid=this.teamObj.gpId;
      this.Team.TeamTypeId=this.teamObj.teamTypeId;
      this.Team.CertificateNo=this.teamObj.certificateNo;
      this.Team.ValidFrom=this.teamObj.validFrom;
      this.Team.ValidTo=this.teamObj.validTo;
      this.Team.TeamName=this.teamObj.teamName;
      this.btnSave=false;
      this.btnUpdate=true;
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
     this.btnMemberSave=false;
     this.btnMemberUpdate=true;
   }

   UpdateResult:any;
   UpdateMember(Member)
   {
     var c=confirm("Are You Sure Want to Update This Record??");
     if(c==true)
     {
      Member.MemberDesignationId=parseInt(Member.MemberDesignationId);
      Member.TeamId=parseInt(localStorage.getItem("TeamId"));
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
  this.btnMemberSave=true;
  this.btnMemberUpdate=false;
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
    var c=confirm("Are You Sure Want to Delete This Record??");
    if(c==true)
    {
    this.Member.MemberId=Id;
    this.Member.TeamId=parseInt(localStorage.getItem("TeamId"));
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
DeleteOrgResult:any;
DeleteTeam(TeamId)
{
  var c=confirm("Are You Sure Want to Delete This Record??");
  if(c==true)
  {
    this.Team.TeamId=TeamId;
    this.Team.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
   
    this.spinner.show();
    this.mangaldalService.DeleteMangalDalDetails(this.Team).subscribe(data=>{
  this.DeleteOrgResult=data;
  this.toastr.success("Record Deleted Successfully");
  this.rerender();
  this.GetMangalDalDetails();
  this.spinner.hide();
  
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }
  
 }
 TeamNameHeader:any;
 GenderValue:any;
 getMemberRegDiv(TeamId)
 {
   localStorage.setItem("TeamId",TeamId);
   var obj=this.Orglst.find(team=>team.teamId===TeamId);
   this.TeamNameHeader=obj.teamName;
   if(obj.teamTypeId==1)
   {
     this.Member.Gender="MALE";
     this.GenderValue= this.Member.Gender;
   }
   if(obj.teamTypeId==2)
   {
     this.Member.Gender="FEMALE";
     this.GenderValue= this.Member.Gender;
   }
   this.teamDiv=false;
   this.memberDiv=true;
   this.GetMemberDeailsByTeam();
 }
Back()
{
this.teamDiv=true;
this.memberDiv=false;
}

}

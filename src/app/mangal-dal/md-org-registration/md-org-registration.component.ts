import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../../Service/mangal-dal.service';
import { MasterService } from './../../Service/master.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-md-org-registration',
  templateUrl: './md-org-registration.component.html',
  styleUrls: ['./md-org-registration.component.css']
})
export class MdOrgRegistrationComponent implements OnInit {
error:any;
  constructor(private masterService:MasterService,private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService,private route:Router) { }
Team:any={
  DistId:0,
  BlockId:0,
  Gpid:0,
  TeamName:null,
  TeamTypeId:0,
  UserLoginId:null
}
  ngOnInit(): void {
    this.getdistrict('','');
    this.GetTeamType();
    this.GetOrganisationDetails();
  }
 distlist:any;
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
  OrgRegistration(Team)
  {
    Team.DistId=parseInt(Team.DistId);
    Team.BlockId=parseInt(Team.BlockId);
    Team.Gpid=parseInt(Team.Gpid);
    Team.TeamTypeId=parseInt(Team.TeamTypeId);
    Team.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));

    this.spinner.show();
this.mangaldalService.OrgRegistration(Team).subscribe(data=>{
  this.regResult=data;
  this.toastr.success("Data Registered Successfully");
  this.GetOrganisationDetails();
  this.spinner.hide();
  this.Team={
    DistId:0,
    BlockId:0,
    Gpid:0,
    TeamName:null,
    TeamTypeId:0,
    UserLoginId:null
  }
},error=>{
  this.error=error;
  this.spinner.hide();
  this.toastr.error(this.error.error);
})
  }

  Orglst:any;
  GetOrganisationDetails()
  {
    this.spinner.show();
    var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    this.mangaldalService.GetOrganisationDetails(UserLoginId).subscribe(data=>{
      this.Orglst=data;
      this.spinner.hide();
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }
  AddMember()
  {
    sessionStorage.setItem("TeamId",this.Orglst[0].teamId);
    sessionStorage.setItem("TeamType",this.Orglst[0].teamTypeId);
    sessionStorage.setItem("BlockId",this.Orglst[0].blockId);
    this.route.navigate(['/MangalDal/MemberRegistration'])
  }
  Activities()
  {
    sessionStorage.setItem("TeamId",this.Orglst[0].teamId);
    sessionStorage.setItem("TeamType",this.Orglst[0].teamTypeId);
    sessionStorage.setItem("BlockId",this.Orglst[0].blockId);
    this.route.navigate(['/MangalDal/Activities'])
  }
  UploadAttachment()
  {
    sessionStorage.setItem("TeamId",this.Orglst[0].teamId);
    this.route.navigate(['/MangalDal/Attachments'])
  }

  GetOrganisationName()
  {
    this.Team.TeamName=$("#TeamType option:selected").text()+","+$("#GP option:selected").text();
  }
  GetCertificate(){
    
  }
}

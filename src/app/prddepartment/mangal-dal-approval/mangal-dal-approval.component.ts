import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../../Service/mangal-dal.service';
import { MasterService } from './../../Service/master.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'; 
import { Subject } from 'rxjs';
@Component({
  selector: 'app-mangal-dal-approval',
  templateUrl: './mangal-dal-approval.component.html',
  styleUrls: ['./mangal-dal-approval.component.css']
})
export class MangalDalApprovalComponent implements OnInit {
error:any;
MemDocUrl=AppComponent.MemberDocURl;
btnCancel:boolean=false;
btnApprove:boolean=false;
@ViewChild(DataTableDirective)
dtElement: DataTableDirective;
dtInstance: DataTables.Api;
dtOptions: any = {};
 dtTrigger = new Subject();
 ngAfterViewInit(){
  //Define datatable 
  this.dtTrigger.next();
}
ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
divMemberDetails:boolean=false;
MangalDalDocURL=AppComponent.MangalDalDocURL;
MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
DistId=parseInt(sessionStorage.getItem("DistId"));
BlockId=parseInt(sessionStorage.getItem("BlockId"));
disableBlock:boolean=false;
divValidFrom:boolean=false;
divValidTo:boolean=false;
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
    this.spinner.show();
    if(isNaN(this.BlockId))
    {
      this.BlockId=0;
    }
    debugger
    this.mangaldalService.GetMangalDalDetailsForApproval(this.DistId,this.BlockId,this.Team.Gpid).subscribe(
data=>{
  this.Orglst=data;
  
this.rerender();
this.dtOptions = {
  dom: 'Bfrtip',
  
  select: true,
  responsive: true,
   pagingType: 'full_numbers',
   pageLength: 10,
   processing: true,
   buttons: [
    'colvis','copy', 'excel','print'
   ]
   

};
this.spinner.hide();

});

}
  distlist:any;
  getdistrict(zoneId,distId)
  {
    this.spinner.show();
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{
  this.distlist=data;
  if(this.DistId!=null|| this.DistId!=undefined)
  {
    this.distlist=this.distlist.filter(Id=>Id.distId===this.DistId);
this.Team.DistId=this.distlist[0].distId;
this.getBlock(this.Team.DistId);
  }
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
      if(this.MRoleId==4)
      {
        this.Team.BlockId=this.blocklst.find(id=>id.blockId===this.BlockId).blockId;
        this.disableBlock=true;
        this.getGP(this.Team.BlockId);
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
      this.spinner.hide();
    },error=>{
      this.error=error;
      this.spinner.hide();
      
    })
  }
  Orglst:any;
  GetMangalDalDetailsForApproval(DistId,BlockId,GpId)
  {
    this.spinner.show();

    this.mangaldalService.GetMangalDalDetailsForApproval(DistId,BlockId,GpId).subscribe(data=>{
      this.Orglst=data;
      console.log(this.Orglst+"_____1");
      this.rerender();
      this.spinner.hide();
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }
  DownloadMeetingActionBook(meetingActionBook)
{
  window.open(this.MangalDalDocURL+meetingActionBook);
}
/* DownloadNirikshanBook(nirikshanBook)
{
  window.open(this.MangalDalDocURL+nirikshanBook);
}
DownloadStoreBook(storeBook)
{
  window.open(this.MangalDalDocURL+storeBook);
} */
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
Memberlst:any;
GetMemberDeailsByTeam(TeamId)
{
this.divMemberDetails=false;
  this.spinner.show();
  this.mangaldalService.GetMemberDeailsByTeam(TeamId).subscribe(data=>{
this.Memberlst=data;
this.divMemberDetails=true;
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
TeamId:any;
GetTeamForCancel(teamId)
{
  this.TeamId=teamId;
  this.btnCancel=true;
  this.btnApprove=false;
}
GetTeamForApprove(teamId)
{
  this.TeamId=teamId;
  this.btnCancel=false;
  this.btnApprove=true;
  if(this.MRoleId==3)
  {
    this.divValidFrom=true;
   this.divValidTo=true;
  }
}
Result:any;
ApprovalByDistrict(TeamId,Status)
{
  var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  if($("#Remark").val()==""||$("#Remark").val()==null)
  {
this.toastr.error("कृपया टिप्पणी भरें");
return false;
  }
  if(Status=="Approved")
  {
    if($("#ValidFrom").val()==""||$("#ValidFrom").val()==null)
    {
  this.toastr.error("कृपया दिनांक भरें");
  return false;
    }
    if($("#ValidTo").val()==""||$("#ValidTo").val()==null)
    {
  this.toastr.error("कृपया दिनांक भरें");
  return false;
    }
  }
  var Remark=$("#Remark").val();
  var ValidFrom=$("#ValidFrom").val();
  var ValidTo=$("#ValidTo").val();

  var rdmn=1;
  var rd=rdmn++;
  var CertificateNo=((new Date()).getFullYear())+''+this.DistId+'000'+rdmn;
  this.spinner.show();
  this.mangaldalService.ApprovalByDistrict(TeamId,Remark,Status,UserLoginId,ValidFrom,ValidTo,CertificateNo).subscribe(data=>{
    this.Result=data;
 this.toastr.success(this.Result);
 this.GetMangalDalDetailsForApproval(this.DistId,this.BlockId,this.Team.Gpid)
    this.spinner.hide();
    $("#Remark").val("");
    $("#ValidFrom").val("");
    $("#ValidTo").val("");
  },error=>{
    this.error=error;
    this.spinner.hide();
  })
}
ApprovalByBlock(TeamId,Status)
{
  var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));

  if($("#Remark").val()==""||$("#Remark").val()==null)
  {
this.toastr.error("कृपया टिप्पणी भरें");
return false;
  }
  var Remark=$("#Remark").val();
  this.spinner.show();
  this.mangaldalService.ApprovalByBlock(TeamId,Remark,Status,UserLoginId).subscribe(data=>{
    this.Result=data;
    this.toastr.success(this.Result);
    $("#Remark").val("");
    this.GetMangalDalDetailsForApproval(this.DistId,this.BlockId,this.Team.Gpid)
    this.spinner.hide();
  },error=>{
    this.error=error;
    this.spinner.hide();
  })
}
}

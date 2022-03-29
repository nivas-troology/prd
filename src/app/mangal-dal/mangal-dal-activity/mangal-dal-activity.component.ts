import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { MangalDalService } from 'src/app/Service/mangal-dal.service';

@Component({
  selector: 'app-mangal-dal-activity',
  templateUrl: './mangal-dal-activity.component.html',
  styleUrls: ['./mangal-dal-activity.component.css']
})
export class MangalDalActivityComponent implements OnInit {
//#region datatable
@ViewChild(DataTableDirective)
public dtElement: DataTableDirective;
public dtOptions: any = {};
public dtInstance: DataTables.Api;
public dtTrigger: Subject<any> = new Subject();
dataTable: any;
//#endregion
MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
btnCancel:boolean=false;
btnApprove:boolean=false;
ActivityId:any;
Result:any;
  BlockId: string;

 ngAfterViewInit(){
    //Define datatable 
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
    }
  }

  constructor(private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService) { 
    
 
  }
  ngOnInit(): void {
    this.dtOptions = {
      dom : 'Bfrtip',
      buttons: [
        'print',
        'excel',
        'colvis',
        'copy',
      ],
      select: true,
      responsive: true,
      paging: false,
      autoWidth: false,
      order: [],
      // bSort: false
    };
    if(this.MRoleId==4)
    {
      this.GetMangaldalActivity();  
    }
    if(this.MRoleId==3)
    {
      this.GetApprovedMangaldalActivity();
    }

    if(this.MRoleId==1)
    {
      this.GetAllMangaldalActivity();
    }
   
  }


  //#region Select Data 
  MDActlst:any;
  GetMangaldalActivity()
  {
    debugger
    this.spinner.show();
    this.BlockId=sessionStorage.getItem("BlockId");
    this.mangaldalService.GetMangaldalActivity(this.BlockId).subscribe(data=>{
      this.MDActlst=data;
      console.log(this.MDActlst)
      this.rerender();
      this.spinner.hide();
      if(this.MDActlst.length<0)
      {
        this.toastr.error("No Record Found","Failed");
      }
    },error=>{
      this.spinner.hide();
      this.toastr.error(error.error);
    })
  }
//#endregion
GetActivityForCancel(activityId)
{
  this.ActivityId=activityId;
  this.btnCancel=true;
  this.btnApprove=false;
}
GetActivityForApprove(activityId)
{
  this.ActivityId=activityId;
  this.btnCancel=false;
  this.btnApprove=true;
}
ApprovalByBlock(ActivityId,Status)
{
  var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));

  if($("#Remark").val()==""||$("#Remark").val()==null)
  {
this.toastr.error("कृपया टिप्पणी भरें");
return false;
  }
  var Remark=$("#Remark").val();
  this.spinner.show();
  this.mangaldalService.MDActivityApprovedByBlock(ActivityId,Remark,Status,UserLoginId).subscribe(data=>{
    this.Result=data;
    this.toastr.success(this.Result);
  
    $("#Remark").val("");
  this.GetMangaldalActivity();
  $("#RemarkModal").hide();
  $(".modal-backdrop.show").css({"opacity": "0"});
  $(".modal-backdrop").css({"top": "auto","left": "auto"});
    this.spinner.hide();
  },error=>{
    this.spinner.hide();
    this.toastr.error(error.error);
  })
}
MDPhotoActlst:any;
ActivityUrl:any;
GetMangaldalActivityPhoto(ActivityId)
{
  debugger
  this.ActivityId=ActivityId;
  this.spinner.show();
  this.mangaldalService.GetMangaldalActivityPhoto(this.ActivityId).subscribe(data=>{
    this.MDPhotoActlst=data;  
    this.ActivityUrl= AppComponent.MangalDalActivityUrl;
    this.rerender();
    this.spinner.hide();
    if(this.MDPhotoActlst.length==0)
    {
      $("#exampleModalLong").hide();      
      $(".modal-backdrop.show").css({"opacity": "0"});
      $(".modal-backdrop").css({"top": "auto","left": "auto"});
      this.toastr.error("No Record Found","Failed");
      
    }
  },error=>{
    this.spinner.hide();
    this.toastr.error(error.error);
  })
}

//#region 
DistMDActlst:any;
DistId:any
GetApprovedMangaldalActivity()
{
  debugger
  this.spinner.show();
  this.DistId=sessionStorage.getItem("DistId");
  this.mangaldalService.GetApprovedMangaldalActivity(this.DistId).subscribe(data=>{
    this.DistMDActlst=data;
    console.log(this.DistMDActlst)
    this.rerender();
    this.spinner.hide();
    if(this.DistMDActlst.length<0)
    {
      this.toastr.error("No Record Found","Failed");
    }
  },error=>{
    this.spinner.hide();
    this.toastr.error(error.error);
  })
}
//#endregion
//#region 
AllMDActlst:any;
GetAllMangaldalActivity()
{
  debugger
  this.spinner.show();
  this.DistId=sessionStorage.getItem("DistId");
  this.mangaldalService.GetAllMangaldalActivity().subscribe(data=>{
    this.AllMDActlst=data;
    console.log(this.AllMDActlst)
    this.rerender();
    this.spinner.hide();
    if(this.AllMDActlst.length<0)
    {
      this.toastr.error("No Record Found","Failed");
    }
  },error=>{
    this.spinner.hide();
    this.toastr.error(error.error);
  })
}
//#endregion

}

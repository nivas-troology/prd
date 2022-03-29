import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { debug } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { district } from 'src/app/Model/district';
import { BlockMaster } from 'src/app/Model/master';
import { MangalDalService } from 'src/app/Service/mangal-dal.service';
import { MasterService } from 'src/app/Service/master.service';
@Component({
  selector: 'app-block-master',
  templateUrl: './block-master.component.html',
  styleUrls: ['./block-master.component.css']
})
export class BlockMasterComponent implements OnInit {
  
    images = [];
    
     myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
   //#region datatable
    @ViewChild(DataTableDirective)
    public dtElement: DataTableDirective;
    public dtOptions: any = {};
    public dtInstance: DataTables.Api;
    public dtTrigger: Subject<any> = new Subject();
    dataTable: any;
  //#endregion
  
    btnSave:boolean=true;
    btnUpdate:boolean=false;
    BlockResult: any;
    error: any;
    datepipe: any;
    ZoneIdReadonly: boolean;
    distIdReadonly: boolean;
    districtlist:district[]=[];
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
     //getter : get overall progress
   
    public message: string;
    constructor(private masterService:MasterService,private toastr:ToastrService,private spinner:NgxSpinnerService,private http: HttpClient) { }
      public MDBlockRecord
     
      ngOnInit(): void {
        this.getZone('');
      //this.GetDistrictDetails();
      this.GetMDBlockDetails();
      this.dtOptions = {
        dom: 'Bfrtip',      
        select: true,
        responsive: true,
         pagingType: 'full_numbers',
         pageLength: 10,
         processing: true,
         buttons: [
          'copy', 'excel','print'
         ]      
      };
     
    }
     
    blockMaster:BlockMaster={
      BlockId:null,
      DistrictId:0,
      ZoneId:0,
      BlockName:null
     
  }
    ResetForm(){
        this.blockMaster={
          BlockId:null,
          DistrictId:0,
          ZoneId:0,
          BlockName:null   
      }
    }
  
    Block:any={
      BlockId:0,
      TeamId:0,
      BlockName:null,
      BlockPlace:null,
      FromDate:null,
      ToDate:null,
      BlockDetails:null,
      Images:FormData
      
    }
    MDBlock:any={
      BlockId:0,
      TeamId:0,
      BlockName:null,
      BlockPlace:null,
      FromDate:null,
      ToDate:null,
    }
    MDImgBlock:any={
      BlockId:0,
      Blockfile:null,
     
     
    }
  
    get fileDetails(){
      return this.myForm.controls;
    }
  
  
  //#region Select Data 
    MDActlst:any;
    GetMDBlockDetails()
    {
      debugger
      this.spinner.show();
   
      this.masterService.GetBlockDetails().subscribe(data=>{
        this.MDActlst=data;
    
        this.spinner.hide();
        this.dtOptions = {
          dom: 'Bfrtip',      
          select: true,
          responsive: true,
           pagingType: 'full_numbers',
           pageLength: 10,
           processing: true,
           buttons: [
            'copy', 'excel','print'
           ]      
        };
        this.rerender();
      },error=>{
        this.error=error;
        this.spinner.hide();
        this.toastr.error(this.error.error);
      })
    }
  //#endregion
 
   
  //#endregion
  
  //#endregion
 //#region  Delete data
 DeleteBlock(blockId)
{
  if(confirm ('Are You Sure To Delete This Record?.')) {
    {
      debugger
   // this.emptraining.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    
    this.spinner.show();
    this.masterService.DeleteBlockDetails(blockId).subscribe((data:any)=>{
       var result=data;
      this.spinner.hide();
    if(result>0)
    {
      this.toastr.success("Data Deleted Success","Success!",{timeOut:5000});
      
      this.GetMDBlockDetails();
    }
    else{
    this.toastr.warning("Something went wrong","Warning",{timeOut:5000});
  }
    })
    }
  }
  else {
    this.toastr.success("Your Data safe","Success!",{timeOut:5000});
      
     
  }
 
}
//#endregion

//#region  Edit data
  editEmployeeRecord(blockId): void {
 
   this.spinner.show();
   
   const a = Number(blockId); 
   if ( a > 0 )
   {
    this.GetMDBlockDetailsById(a);
    this.btnSave=false;
     this.btnUpdate=true;
   }
   this.spinner.hide();
 }
 GetMDBlockDetailsById(blockId): void{
   debugger
   
  this.spinner.show();
  this.masterService.GetBlockDetailsById(blockId).subscribe(
    res => {
      this.MDBlockRecord = res[0];
      this.setDefaultValuesToPageModelUpdateCase(this.MDBlockRecord);
     },
    err => {
      if (err.status === 500) {
        this.toastr.error(err.error);
      }
      else if (err.status === 400) {
        this.toastr.error(err.error);
      }
     
      else if (err.status === 409) {
        this.toastr.error(err);
      }
      else if (err.status === 406) {
        this.toastr.error(err.error);
      }
    },
    () => {  }
  ); 
  this.spinner.hide();
 }
 
 //#region 
 setDefaultValuesToPageModelUpdateCase(model: any): void {
  this.blockMaster.DistrictId= model.distId;
  this.blockMaster.BlockName = model.blockName;
  this.blockMaster.ZoneId = model.zoneId;
  this.getdistrict(this.blockMaster.ZoneId,this.blockMaster.DistrictId);
    //this.Block.DistId = model.distId;
  localStorage.BlockId =  model.blockId;
  this.ZoneIdReadonly=true;
  //this.distIdReadonly=true;
   this.btnSave=false;
   this.btnUpdate=true;
} 
 //#endregion


 //#endregion
 
 
//#region Update Records

 UpdateBlock(BlockForm:NgForm)
 {
   this.spinner.show();
 BlockForm.value.BlockId=parseInt(localStorage.getItem("BlockId"));
  
  console.log(BlockForm);
 var result=this.masterService.UpdateBlockDetails(BlockForm.value).subscribe((data:any)=>{
   var resp=data;
   this.spinner.hide();   
    if(resp>0)
    {
       
      this.toastr.success("Data Updated","Block Updated Success!",{timeOut:5000});      
      this.ResetForm();
      this.GetMDBlockDetails();
      this.btnSave=true;
      this.btnUpdate=false;
    }
    else{
      this.spinner.hide();
      this.toastr.error("Failed","Some error occured!",{timeOut:5000});
    }
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    });
 }
//#endregion

  //#region Insert record
BlockRegister(BlockForm:NgForm){  
  debugger
  this.spinner.show();
  BlockForm.value.DistId=parseInt(BlockForm.value.DistId);
  console.log(BlockForm.value)
 var result=this.masterService.PostBlockDetails(BlockForm.value).subscribe((data:any)=>{
   var resp=data;
  this.spinner.hide();
  console.log(resp);
    if(resp>0)
    {
      this.toastr.success("Data Saved","Block Save Success!",{timeOut:5000});
      this.ResetForm();
      this.GetMDBlockDetails();
     // this.getPoliceStations();
    }
    else{
      this.toastr.error("Failed","Some error occured!",{timeOut:5000});
    }
    },(error)=>{
    
      this.error=error;
      this.spinner.hide();
    });
}
 //#endregion
  
   //#region Zone List Bind
   currentZonelist:any;
  
  getZone(zoneId)
  { 
    this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;
      this.spinner.hide();
     
     
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    });
 

  }
   //#endregion
   //#region  Dist Master
   getdistrict(zoneId,distId)
   {this.spinner.show();
    this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{
      this.districtlist=data;
    this.spinner.hide();
  
 
  
 
 },(error)=>{
       
   this.error=error
   this.spinner.hide();
 })
 
   }
  //#endregion
  
   
  }

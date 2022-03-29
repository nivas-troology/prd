import { Component, OnInit } from '@angular/core';
import {DutyServiceService} from './../../Service/duty-service.service';
import { ToastrService } from 'ngx-toastr';
import {dutyAllocation} from './../../Model/duty';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-duty-swapping',
  templateUrl: './duty-swapping.component.html',
  styleUrls: ['./duty-swapping.component.css']
})
export class DutySwappingComponent implements OnInit {

  constructor(private dutyservice:DutyServiceService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  ServiceNoFrom:any=null;
  ServiceNoTo:any=null;
divJawanDetailSwapFrom:boolean=false;
divJawanDetailSwapTo:boolean=false;
dutyallocation:dutyAllocation={
  DutyAllocationId:null,
  EmpId:null,
  DutyName:null,
  DutyType:"--Select--",
  DateFrom:null,
  DateTo:null,
  AllocatedOn:null,
  PromisorName:null,
  CreatedBy:null,
  ModifiedBy:null,
  ThanaId:null,
  BlockId:null,
  UserLoginId:null,
  SiteId:null,
  OtherSecurityDutyType:null

 }
JawanDetailSwapFrom:any
error:any;
GetJawanForSwappingFrom(ServiceNo)
{this.spinner.show();
this.dutyservice.GetJawanForSwapping(ServiceNo).subscribe((data:any)=>{
this.JawanDetailSwapFrom=data;
this.spinner.hide();
if(this.JawanDetailSwapFrom!=null)
{
  this.divJawanDetailSwapFrom=true;
}
else
{
  this.toastr.error("No Record Found","Failed");
}
},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})
}

JawanDetailSwapTo:any
GetJawanForSwappingTo(ServiceNo)
{this.spinner.show();
this.dutyservice.GetJawanForSwapping(ServiceNo).subscribe((data:any)=>{
this.JawanDetailSwapTo=data;
this.spinner.hide();
if(this.JawanDetailSwapTo!=null)
{
  this.spinner.hide();
  this.divJawanDetailSwapTo=true;
}
else
{
  this.toastr.error("No Record Found","Failed");
}
},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})
}
//Duty Swapping
Swaplst:any=[];
swapResult:any;
DutySwapping()
{
  if(this.JawanDetailSwapFrom==null)
  {
    this.toastr.error("Unable To Get Detail To Swap","Failed");
    return false;
  }
  if(this.JawanDetailSwapTo==null)
  {
    this.toastr.error("Unable To Get Detail To Swap","Failed");
    return false;
  }
  if(this.ServiceNoFrom==this.ServiceNoTo)
  {
    this.toastr.error("Both Service No Must Not Be Equal","Failed");
    return false;
  }
  
  confirm("Do You Want To Swap These Jawans??")
  {
    var objSwapFrom={
      EmpId:null,
      DutyName:null,
      DutyType:null,
      DateFrom:null,
      DateTo:null,
      AllocatedOn:null,
      PromisorName:null,
      CreatedBy:null,
      ModifiedBy:null,
      ThanaId:null,
      BlockId:null,
      UserLoginId:null,
      SiteId:null,
      DutyAllocationId:0

    };
    var objSwapTo={
      EmpId:null,
      DutyName:null,
      DutyType:null,
      DateFrom:null,
      DateTo:null,
      AllocatedOn:null,
      PromisorName:null,
      CreatedBy:null,
      ModifiedBy:null,
      ThanaId:null,
      BlockId:null,
      UserLoginId:null,
      SiteId:null,
      DutyAllocationId:0
    };
    objSwapFrom.EmpId=this.JawanDetailSwapFrom.empId;
    objSwapFrom.DutyAllocationId=this.JawanDetailSwapFrom.dutallocationId;
    objSwapFrom.DateFrom=($("#DateFrom").val()).toString();
    objSwapFrom.DateTo=($("#DateTo").val()).toString();
    objSwapFrom.AllocatedOn=($("#AllocatedOn").val()).toString();
    objSwapFrom.SiteId=(this.JawanDetailSwapTo.siteId).toString();
    objSwapFrom.PromisorName=this.JawanDetailSwapTo.promisorName;
    objSwapFrom.ThanaId=this.JawanDetailSwapTo.thanaId;
    objSwapFrom.BlockId=this.JawanDetailSwapTo.blockId;
    objSwapFrom.DutyType=this.JawanDetailSwapTo.dutyType;
    this.Swaplst.push(objSwapFrom);
    objSwapTo.EmpId=this.JawanDetailSwapTo.empId;
    objSwapTo.DutyAllocationId=this.JawanDetailSwapTo.dutallocationId;
    objSwapTo.DateFrom=($("#DateFrom").val()).toString();
    objSwapTo.DateTo=($("#DateTo").val()).toString();
    objSwapTo.AllocatedOn=($("#AllocatedOn").val()).toString();
    objSwapTo.SiteId=(this.JawanDetailSwapFrom.siteId).toString();
    objSwapTo.PromisorName=this.JawanDetailSwapFrom.promisorName;
    objSwapTo.ThanaId=this.JawanDetailSwapFrom.thanaId;
    objSwapTo.BlockId=this.JawanDetailSwapFrom.blockId;
    objSwapTo.DutyType=this.JawanDetailSwapFrom.dutyType;
    this.Swaplst.push(objSwapTo);
    this.spinner.show();
    this.dutyservice.DutySwapping(this.Swaplst).subscribe((data:any)=>{
      this.swapResult=data;
      this.spinner.hide();
      if(  this.swapResult>0)
      {
        this.spinner.hide();
        this.toastr.success("Jawan's Duty Swapped Successfully","Success");
        this.Swaplst=[];
        $("#DateFrom").val('');
        $("#DateTo").val('');
        $("#AllocatedOn").val('');
        this.GetJawanForSwappingFrom(this.ServiceNoFrom);
        this.GetJawanForSwappingTo(this.ServiceNoTo);
      }
    else
      {
        this.toastr.error("Some Error Occured","Failed");
      }
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })
  }
}
}

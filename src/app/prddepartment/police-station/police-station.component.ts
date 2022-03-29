import { policeStation } from './../../Model/policestation';
import { district } from './../../Model/district';
import { PoliceStationService } from './../../Service/police-station.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-police-station',
  templateUrl: './police-station.component.html',
  styleUrls: ['./police-station.component.css']
})
export class PoliceStationComponent implements OnInit {
  //#region Data Table
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
  //#endregion
 data:Array<any>
 totalReords:string
 page:number=1
  Issave:boolean=true;
  IsUpdate:boolean=false;
  policestation:policeStation={
    ThanaId:null,
    DistId:0,
    ThanaName:null,
    DistName:null
  
  }
  ResetForm(){
    this.policestation={
      ThanaId:null,
      DistId:0,
      ThanaName:null,
      DistName:null
     
    }
  }
  districtlist:district[]=[];
  policestationList:any;
  resp:any;
  constructor(private policestationservice:PoliceStationService,private toastr:ToastrService,private spinner:NgxSpinnerService) {
this.data=new Array<any>();

   }

  ngOnInit(): void {
    //get district
  
 
    this.spinner.show();
   this.resp= this.policestationservice.getDistrict(null).subscribe((data:any)=>{this.districtlist=data;
    this.spinner.hide();
  
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
   console.log(this.districtlist);
   /// get police station
this.getPoliceStations();
   
  }
  error:any;
 getPoliceStations()
 {
 
  this.spinner.show();
  this.policestationservice.getPoliceStation().subscribe((data:any)=>{this.policestationList=data;
    this.spinner.hide();
  this.totalReords=this.policestationList.length;
  //#region Datatable
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
this.rerender();
//#endregion
 
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  });
  
 }
  //// save police station
  savePoliceStation(PoliceStationForm:NgForm){
   
    
    
   
    this.spinner.show();
    PoliceStationForm.value.DistId=parseInt(PoliceStationForm.value.DistId);
    console.log(PoliceStationForm.value)
   var result=this.policestationservice.savePoliceStation(PoliceStationForm.value).subscribe((data:any)=>{var resp=data;
    this.spinner.hide();
    console.log(resp);
      if(resp>0)
      {
 
        this.toastr.success("Data Saved","Police Station Save Success!",{timeOut:5000});
        
        PoliceStationForm.resetForm();
        this.getPoliceStations();
      
      }
      else{
        this.toastr.error("Failed","Some error occured!",{timeOut:5000});
      }
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      });
  }

  //Edit police station
 Edit(id){
   this.Issave=false;
   this.IsUpdate=true;
 var policObj=this.policestationList.find(listId=>listId.thanaId===id);
 this.policestation.ThanaId= policObj.thanaId;
this.policestation.DistId= policObj.distId;
this.policestation.ThanaName= policObj.thanaName;
  console.log(this.policestation);
 }

 updatePoliceStation(policestation)
 {this.spinner.show();
 
  console.log(policestation);
 var result=this.policestationservice.UpdatePoliceStation(policestation).subscribe((data:any)=>{var resp=data;
    if(resp>0)
    {
      this.spinner.hide();
      this.toastr.success("Data Updated","Police Station Updation Success!",{timeOut:5000});
      
      this.ResetForm();
      this.getPoliceStations();
      this.Issave=true;
      this.IsUpdate=false;
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
Delete(id){
  
   confirm("Are you sure to delete this record")
   {this.spinner.show();
    this.policestationservice.DeletePoliceStation(id).subscribe((data:any)=>{var resp=data;
      if(resp>0)
      {
  this.spinner.hide();
        this.toastr.success("Data Deleted","Police Station Deletion Success!",{timeOut:5000});
        this.getPoliceStations();
      
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
 }
}

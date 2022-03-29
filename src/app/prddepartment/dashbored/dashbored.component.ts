import { Component, OnInit } from '@angular/core';
import{DashboardService} from './../../Service/dashboard.service';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent implements OnInit {
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  constructor(private DashboardService:DashboardService) { }

  ngOnInit(): void {
 if(this.MRoleId==1)
 {
this.GetRegisteredPRDJawanCount(0,0);
this.GetAvailablePRDJawanCount(0,0);
 }
 else  if(this.MRoleId==2)
 {
  this.GetRegisteredPRDJawanCount(this.ZoneId,0);
  this.GetAvailablePRDJawanCount(this.ZoneId,0);
 }
 else  if(this.MRoleId==3)
 {
  this.GetRegisteredPRDJawanCount(this.ZoneId,this.DistId);
  this.GetAvailablePRDJawanCount(this.ZoneId,this.DistId);
 }
  }
 
  RegJawanCount:number;
  error:any;
  GetRegisteredPRDJawanCount(ZoneId,DistId)
  {
    this.DashboardService.GetRegisteredPRDJawanCount(ZoneId,DistId).subscribe((data:any)=>{this.RegJawanCount=data},(error)=>{
      
      this.error=error;
      
    })
  }
  JawanAvailableCount:number;
  GetAvailablePRDJawanCount(ZoneId,DistId)
  {
    this.DashboardService.GetAvailablePRDJawanCount(ZoneId,DistId).subscribe((data:any)=>{this.JawanAvailableCount=data},(error)=>{
      
      this.error=error;
      
    })
  }
}

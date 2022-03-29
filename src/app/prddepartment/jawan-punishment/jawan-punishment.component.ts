import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistrationService } from './../../Service/registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jawan-punishment',
  templateUrl: './jawan-punishment.component.html',
  styleUrls: ['./jawan-punishment.component.css']
})
export class JawanPunishmentComponent implements OnInit {
  divJawanDetail:boolean=false;
  divPunishProcess:boolean=false;
  ServiceNo="";
UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  constructor(private regService:RegistrationService,private spinner:NgxSpinnerService,private ToastrService:ToastrService) { }

  ngOnInit(): void {
  }
  Punishment={
    UserLoginId:null,
EmpId:null,
PunishmentDate:null,
PunishValidTill:null,
PReason:null,
Remarks:null,
PunishmentType:null
  }
  jawan:any=[]
  error:any;
  GetJawanSearch(ServiceNo)
  {
    this.spinner.show();
    this.regService.GetJawanForTransfer(ServiceNo).subscribe((data:any)=>{
      this.jawan=data;
      this.spinner.hide();
      if(this.jawan.length==0)
      {
        this.ToastrService.success("No Record Found");
      }
      else
      {
        this.divJawanDetail=true;
        this.divPunishProcess=true;
      }
      this.spinner.hide();

    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })
  }
  JawanPunishment()
  { 
    var c=confirm("Are you sure you want to punish this jawan??");
    if(c==true)
    {
      this.Punishment.EmpId=this.jawan.empId;
      this.Punishment.UserLoginId=this.UserLoginId;
      this.Punishment.PunishmentDate=$("#PunishmentDate").val();
      this.Punishment.PunishValidTill=$("#PunishValidTill").val();
      this.spinner.show();
      this.regService.JawanPunishment(this.Punishment).subscribe((data:any)=>{var result=data;
        this.spinner.hide();
      if(result>0)
      {
        this.ToastrService.success("Jawan Punished Successfully");
        this.divJawanDetail=false;
        this.divPunishProcess=false;
        this.Punishment={
          UserLoginId:null,
      EmpId:null,
      PunishmentDate:null,
      PunishValidTill:null,
      PReason:null,
      Remarks:null,
      PunishmentType:null
        }
      }
      this.spinner.hide();
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    }

  }
}

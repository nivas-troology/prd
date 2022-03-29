import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from './../../Service/registration.service';
import { MasterService } from './../../Service/master.service';
import { empContact } from './../../Model/employee';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jawan-transfer',
  templateUrl: './jawan-transfer.component.html',
  styleUrls: ['./jawan-transfer.component.css']
})
export class JawanTransferComponent implements OnInit {
  ServiceNo:string;
  divJawanDetail:boolean=false;
  constructor(private masterService:MasterService,private regservice:RegistrationService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getZone('')
  }
  empcontact:any={

    EmpContactId:null,
    EmpId:null,
   
    CurrentDistId:0,
    CurrentCityId:null,
    CurrentAddress:null,
    CurrentCompanyId:0,
   
    CurrentMobile1:null,
    CurrentEmpEmail:'',
    CurrentEmpMohalla:null,
   
    CurrentBlockId:0,
    CurrentThanaId:0,
    CreatedBy:null,
    ModifiedBy:null,
    residanceTypePerm:"Rural",
    residanceTypeCurrent:"Rural",
    CurrentEmpPoliceStation:null,
    ResidanceCompanyId:null,
    ResidancePincode:null,
    ResidanceZoneId:null,
    CurrentPincode:null,
    CurrentZoneId:0,
    empChkAddress:"Yes",
    MroleId:null,
    UserLoginId:null
  }
  currentZonelist:any;
  error:any;
  getZone(zoneId)
  {this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;
      this.spinner.hide();
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    });
   

  }
  currentdistlist:any;
  getdistrict(zoneId,distId)
  {this.spinner.show();
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{this.currentdistlist=data;
  this.spinner.hide();
},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})

  }
  companylst:any;
  getCompany(distId,blockId)
  {this.spinner.show();
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data;
      this.spinner.hide();
    
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    });
  }

  blocklst:any;
  getBlock(distId)
  {this.spinner.show();
    this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data;
      this.spinner.hide();
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    });
  }

  thanalist:any;
  getThana(distId)
  {this.spinner.show();
    this.masterService.getThana(distId).subscribe((data:any)=>{this.thanalist=data;
      this.spinner.hide();
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    });
  }
//Get Jawan For Transfer
jawan:any
GetJawanForTransfer(ServiceNo)
{
  if(ServiceNo==null||ServiceNo=="")
  {
    this.toastr.error("Please Enter Service No.","Failed");
    return false;
  }
  this.spinner.show();
this.regservice.GetJawanForTransfer(ServiceNo).subscribe((data:any)=>{
  this.jawan=data;
  this.spinner.hide();
  if(this.jawan==null)
  {
     this.toastr.error("No Record Found.","Failed");
  }
  else
  {
    this.divJawanDetail=true;
  }
  
},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})
}
  //Transfer Jawan
  JawanTransferResult:any;
  JawanTransfer(empcontact)
  {
    var c=confirm("Are You sure to Transfer This Jawan?");
    if(c==true)
    {
      empcontact.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      empcontact.EmpId=this.jawan.empId;
      empcontact.CurrentZoneId=parseInt(empcontact.CurrentZoneId);
      empcontact.CurrentDistId=parseInt(empcontact.CurrentDistId);
      empcontact.CurrentBlockId=parseInt(empcontact.CurrentBlockId);
      empcontact.CurrentCompanyId=parseInt(empcontact.CurrentCompanyId);
      empcontact.CurrentThanaId=parseInt(empcontact.CurrentThanaId);
      
      this.spinner.show();
      this.regservice.JawanTransfer(empcontact).subscribe((data:any)=>{
        this.JawanTransferResult=data;
        this.spinner.hide();
        if(this.JawanTransferResult>0)
        {
          this.toastr.success("Jawan Transferred Successfully","Success");
          this.ServiceNo="";
          this.empcontact={

            EmpContactId:null,
            EmpId:null,
           
            CurrentDistId:0,
            CurrentCityId:null,
            CurrentAddress:null,
            CurrentCompanyId:0,
           
            CurrentMobile1:null,
            CurrentEmpEmail:'',
            CurrentEmpMohalla:null,
           
            CurrentBlockId:0,
            CurrentThanaId:0,
            CreatedBy:null,
            ModifiedBy:null,
            residanceTypePerm:"Urban",
            residanceTypeCurrent:"Urban",
            CurrentEmpPoliceStation:null,
            ResidanceCompanyId:null,
            ResidancePincode:null,
            ResidanceZoneId:null,
            CurrentPincode:null,
            CurrentZoneId:0,
            empChkAddress:"Yes",
            MroleId:null,
            UserLoginId:null
          }
          this.divJawanDetail=false;
        }
        else
        {
          this.toastr.error("Operation Failed","Failed");
        }
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    }

  }
}

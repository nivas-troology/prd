import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from './../../app.component';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from './../../Service/master.service';
import { Component, OnInit,Input } from '@angular/core';
import { ReportService } from './../../Service/report.service';

@Component({
  selector: 'app-bio-data-report',
  templateUrl: './bio-data-report.component.html',
  styleUrls: ['./bio-data-report.component.css']
})
export class BioDataReportComponent implements OnInit {
  ServiceNo="";
  UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  @Input() data:any;
  totalReords:string
  btnSaveBasicDetails:boolean=true;
  MainDiv:boolean=false;
  DutyLogDiv:boolean=false;
  ReportDiv:boolean=false;
  btnSaveContactDetails:boolean=true;
  btnSaveAccountDetails:boolean=true;
  biodatadivshow:boolean=false;
  btnUpdateTraining=false;
  
  constructor(private masterService:MasterService,private reportservice:ReportService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  error:any
 
  GetBioDataResult(ServiceNo)
  { this.MainDiv=false;
    this.spinner.show();
    this.DutyLogDiv=false;
    this.reportservice.GetBioDataResult(ServiceNo).subscribe((data:any)=>{this.data=data;
    this.spinner.hide();
    this.biodatadivshow=true;
    this.MainDiv=true;
    this.data.Employee.EmpPic=AppComponent.documentUrl+this.data.Employee.empPic;

    if(this.data.length<0)
    {this.MainDiv=false;
      this.toastr.error("No Record Found","Failed");
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    })   
  
   
  }
  JawanDutyLoglist:any;
  getJawanDutyLogStatus(ServiceNo)
  { 
    this.spinner.show();
    this.ReportDiv=false;
    this.reportservice.getJawanDutyLogStatus(ServiceNo).subscribe((data:any)=>{this.JawanDutyLoglist=data;
    this.spinner.hide();
    this.DutyLogDiv=true;
    this.totalReords=this.JawanDutyLoglist.length;
    this.totalReords=this.JawanDutyLoglist.length;
    if(this.JawanDutyLoglist.length<0)
    {
      this.DutyLogDiv=false;
      this.toastr.error("No Record Found","Failed");
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    }
    )
  
   
  }
  JawanPic:string=null
  DepartmentalId:string=null;
  OtherId:string=null;
  Educer:string=null;
  BirthCer:string=null;
  transCer:string=null;
  TrainingCer:any;
GetCertificateDetails()
{this.DutyLogDiv=false;
   this.ReportDiv=true;
  this.JawanPic=AppComponent.documentUrl+this.data.Employee.empPic;
    this.DepartmentalId=AppComponent.documentUrl+this.data.Employee.idProof1Pic;
    if(this.data.Employee.idProof2Pic!=null){
      this.spinner.hide();
      this.OtherId=AppComponent.documentUrl+this.data.Employee.idProof2Pic;
    }

    this.Educer=AppComponent.documentUrl+this.data.Employee.idProof3Pic;
    this.BirthCer=AppComponent.documentUrl+this.data.Employee.birthCerPic;
    if(this.data.Employee.transCert!=null)
    { this.spinner.hide();
      this.transCer=AppComponent.documentUrl+this.data.Employee.transCert;
    }
      for(var i=0;i<this.data.EmpTraining.length;i++)
    {
      var url=AppComponent.TrainingCertificateUrl+this.data.EmpTraining[i].trainingCertificate;
      this.TrainingCer.push(url);
    }
}

}

 

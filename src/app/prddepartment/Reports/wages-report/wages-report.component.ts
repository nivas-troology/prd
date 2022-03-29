import { Subject } from 'rxjs';
import { MasterService } from './../../../Service/master.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from './../../../Service/report.service';
import { employee, empContact } from './../../../Model/employee';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'; 
@Component({
  selector: 'app-wages-report',
  templateUrl: './wages-report.component.html',
  styleUrls: ['./wages-report.component.css']
})
export class WagesReportComponent implements OnInit {
  @ViewChild(DataTableDirective)
 dtElement: DataTableDirective;
 dtInstance: DataTables.Api;
  drpZone:boolean=false;
  drpDistrict:boolean=false;
  UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  BlockId:any=sessionStorage.getItem("BlockId");
  CompanyIdd:any;
  employee:employee=
  {
    EmpId:null,
    EmpName:null,
    EmpGender:null,
    EmpCaste:null,
    EmpDob:null,
    FatherName:null,
    MotherName:null,
    Height:null,
    EmpEdu:"--Select--",
    EmpDesigId:"--Select--",
    IdProof1Type:null,
    IdProof1No:null,
    IdProof1Pic:null,
    IdProof2Type:null,
    IdProof2No:null,
    IdProof2Pic:null,
    IdProof3Type:null,
    IdProof3No:null,
    IdProof3Pic:null,
    RegistrationStatus1:null,
    RegistrationRemarks1:null,
    RegistrationStatus2:null,
    RegistrationRemarks2:null,
    RegistrationStatusFinal:null,
    RegistrationRmarksFinal:null,
    EmpOfficialId:null,
    EmpPic:null,
    EmpSplSkill:null,
    Chest:null,
    CreatedBy:null,
    ModifiedBy:null,
    FileExtention1:null,
    FileExtention2:null,
    FileExtention3:null,
    FileExtention4:null,
    FileExtention5:null,
    BirthCerName:null,
    BirthCerNo:null,
    BirthCerPic:null,
    MroleId:null,
    UserLoginId:null,
    AadharNo:null,
    PanNo:null,
    OtherSplSkill:null,
    NominalRegNo:null,
    IsAvailableForDuty:null,
    OldServiceNo:null,
    Status:"",
NewJawanStatus:null,
TransCert:null,
FileExtention6:null,
IsTrained:null
  }
  empcontact:empContact={
  
    EmpContactId:null,
    EmpId:null,
    ResidanceAddress:null,
    ResidanceDistId:"--Select--",
    ResidanceCityId:null,
    ResidanceMobile1:null,
    ResidanceEmpEmail:null,
    ResidanceEmpMohalla:null,
    ResidanceEmpPoliceStation:null,
    CurrentDistId:"--Select--",
    CurrentCityId:null,
    CurrentAddress:null,
    CurrentCompanyId:"-1",
   
    CurrentMobile1:null,
    CurrentEmpEmail:null,
    CurrentEmpMohalla:null,
    ResidanceBlockId:"--Select--",
    ResidanceThanaId:"--Select--",
    CurrentBlockId:"--Select--",
    CurrentThanaId:"--Select--",
    CreatedBy:null,
    ModifiedBy:null,
    residanceTypePerm:"Urban",
    residanceTypeCurrent:null,
    CurrentEmpPoliceStation:null,
    ResidanceCompanyId:"--Select--",
    ResidancePincode:null,
    ResidanceZoneId:"--Select--",
    CurrentPincode:null,
    CurrentZoneId:"--Select--",
    empChkAddress:"Yes",
    MroleId:null,
    UserLoginId:null
  }
  constructor(private masterService:MasterService,private reportService:ReportService,private spinner:NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.reportService.GetWagesDetail(-1,-1,-1,"~" ).subscribe((data:any)=>{
      debugger;
     this.GetWageReportlst=data;
      this.rerender();
    
    
      this.spinner.hide();
   }
    
   )
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
    if(this.MRoleId==2||this.MRoleId==3)
    {
      this.getZone(this.ZoneId);
      this.drpZone=true;
    }
   else
   {
    this.getZone('');
   }
   //call getjawan method
   if(this.MRoleId==1)
   {
     this.ZoneId=0;
     this.DistId=0;
     this.BlockId=0;
     
   }
  
   else if(this.MRoleId==2)
   {
    this.DistId=0;
    this.BlockId=0;
  
   }
   
   else if(this.MRoleId==3)
   {
    this.BlockId=0;
    
   }
   this.GetYear();
  }
  currentZonelist:any;
  getZone(zoneId)
  {
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;
      if(this.MRoleId==2||this.MRoleId==3)
      {
      this.empcontact.CurrentZoneId=this.currentZonelist[0].zoneId;
      }
      if(this.MRoleId==3){
        this.getdistrict(this.empcontact.CurrentZoneId,this.DistId);
        this.drpDistrict=true;
      }
      else if(this.MRoleId==2){
        this.getdistrict(this.empcontact.CurrentZoneId,'');
      }
     
    });
 

  }
  currentdistlist:any;

  getdistrict(zoneId,distId)
  {
this.masterService.getDistrict(zoneId,distId).subscribe((data:any)=>{this.currentdistlist=data;
  if(this.MRoleId==3){
    this.empcontact.CurrentDistId=this.currentdistlist[0].distId;
  }
 
 if(this.MRoleId==3)
 {
  this.getCompany(this.empcontact.CurrentDistId,'');
  this.getBlock(this.empcontact.CurrentDistId);
 }

 

})

  }
  blocklst:any;
  getBlock(distId)
  {
    this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data;})

  }
  companylst:any;
  getCompany(distId,blockId)
  {
    if(this.empcontact.residanceTypeCurrent=="Urban")
    {
      this.empcontact.CurrentBlockId="--Select--";
      this.empcontact.CurrentCompanyId="--Select--";
    }
    if(this.empcontact.residanceTypeCurrent=="Rural")
    {
      this.empcontact.CurrentBlockId="--Select--";
    }
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data;
  
    
    });
  }
  ClickUrbanRuralCurrent()

  {
    if($("#radioCurrentUrban").prop("checked",true))
    {
      this.empcontact.CurrentCompanyId="--Select--";
      this.empcontact.CurrentBlockId="--Select--";
      this.getCompany(this.empcontact.CurrentDistId,'');
    }
   
  }
  Year:any={
    YearId:-1,
    Year1:null
  }
  Years:any;
  GetYear()
  {
    this.masterService.GetYear().subscribe((data:any)=>{
      this.Years=data;
    })
  }
  Month:any={
    MonthId:-1,
    Month1:null,
    MonthDays:null
  };
  Months:any;
  GetMonth(YearId)
  {
    this.masterService.GetMonth(YearId).subscribe((data:any)=>{
      this.Months=data;
    })
  }
  dtTrigger=new Subject();
  dtOptions:any={};
  ngAfterViewInit(){
    //Define datatable 
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  GetWageReportlst:any;

  GetWagesDetail(YearId,MonthId,CompanyId,residanceTypeCurrent)
  {
    if(CompanyId !== "--Select--"){
      this.CompanyIdd=parseInt(CompanyId);
    }
    else{
      this.CompanyIdd=0;
    }
    YearId=parseInt(YearId);
    MonthId=parseInt(MonthId);
   
    residanceTypeCurrent=residanceTypeCurrent;
    
    debugger;
this.reportService.GetWagesDetail(YearId,MonthId,this.CompanyIdd,residanceTypeCurrent).toPromise().then((data:any)=>{

  this.GetWageReportlst=data;
this.rerender();
 
  if(this.GetWageReportlst.length==0)
  {
    this.toastr.error("No Record Found","Failed");
  }

  this.spinner.hide();
}

)

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
}

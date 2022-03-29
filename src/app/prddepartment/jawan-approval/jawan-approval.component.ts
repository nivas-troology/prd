import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from './../../Service/registration.service';
import { MasterService } from './../../Service/master.service';
import { employee,empContact } from './../../Model/employee';
import { Component, OnInit,ViewChild } from '@angular/core';
declare var $;
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { saveAs } from './../../../../node_modules/file-saver/src/FileSaver';
import { JawanApprovalDTO } from 'src/app/Model/JawanApprovalDTO';
@Component({
  selector: 'app-jawan-approval',
  templateUrl: './jawan-approval.component.html',
  styleUrls: ['./jawan-approval.component.css']
})
export class JawanApprovalComponent implements OnInit {
   //#region datatable
   @ViewChild(DataTableDirective)
   public dtElement: DataTableDirective;
   public dtOptions: any = {};
   public dtInstance: DataTables.Api;
   public dtTrigger: Subject<any> = new Subject();
   dataTable: any;
 //#endregion

 ngAfterViewInit(){
  //Define datatable 
  this.dtTrigger.next();
}
ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));

ZoneId:any=sessionStorage.getItem("ZoneId");
DistId:any=sessionStorage.getItem("DistId");
BlockId:any=sessionStorage.getItem("BlockId");
AppNo:any=null;
totalReords:string
 page:number=1
 ApprovalStatus:any=null;
 DocModal:boolean=false;
employee:employee=
{
  EmpId:null,
  EmpName:null,
  EmpGender:"--Select--",
  EmpCaste:"--Select--",
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
  EmpSplSkill:"--Select--",
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
  Status:null,
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
  CurrentCompanyId:"--Select--",
 
  CurrentMobile1:null,
  CurrentEmpEmail:null,
  CurrentEmpMohalla:null,
  ResidanceBlockId:"--Select--",
  ResidanceThanaId:"--Select--",
  CurrentBlockId:"--Select--",
  CurrentThanaId:"--Select--",
  CreatedBy:null,
  ModifiedBy:null,
  residanceTypePerm:"Rural",
  residanceTypeCurrent:"Rural",
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
public jawanApprovalDTO:JawanApprovalDTO={
  empId : 0,
  mroleId :null,
  remark :null,
  status :null,
  userLoginId :null,
}

  constructor(private masterService:MasterService,private regservice:RegistrationService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.dtOptions = {
      dom : 'Bfrtip',
      buttons: [
        'print',
        'excel',
       
      ],
      select: true,
      responsive: true,
      paging: true,
      autoWidth: false,
      order: [],
      // bSort: false
    };
    if(this.MRoleId==2||this.MRoleId==3)
    {
      this.getZone(this.ZoneId);
    }
   else
   {
    this.getZone('');
   }
   //call getjawan method
/*    if(this.MRoleId==1)
   {
     this.ZoneId=0;
     this.DistId=0;
     this.BlockId=0;
  
     //this.getJawan(this.ZoneId, this.DistId, this.BlockId,0,this.AppNo,null);
     this.spinner.show();
     debugger
      this.regservice.getJawan(this.ZoneId,this.DistId,this.BlockId,0,this.AppNo,null).subscribe((data:any)=>{this.Jawanlist=data;
       
       
        this.totalReords=this.Jawanlist.length;
       
        this.rerender();
   
        if(this.MRoleId==2)
        {
          for(let i=0;i<this.Jawanlist.length;i++)
          {
                  var a=new Date(this.Jawanlist[i].createdDate);
                  console.log(a);
          }
        }
        if(this.Jawanlist.length<0)
        {
          this.toastr.error("No Record Found","Failed");
        }
        
        }
        ,(error)=>{
      
          this.error=error;
          this.spinner.hide();
        }
        ,
          () => { this.spinner.hide(); console.log('HTTP request completed.'); }
        )
   }
  
   else if(this.MRoleId==2)
   {
    this.DistId=0;
    this.BlockId=0;
    this.getJawan(parseInt(this.ZoneId),this.DistId,this.BlockId,0,this.AppNo,null);
   }
   
   else if(this.MRoleId==3)
   {
    this.BlockId=0;
    debugger
    this.getJawan(parseInt(this.ZoneId),parseInt(this.DistId),this.BlockId,0,this.AppNo,null);
   } */
 
  }

  
  currentZonelist:any;
  error:any;
  getZone(zoneId)
  {this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data:any)=>{this.currentZonelist=data;
      this.spinner.hide();
      if(this.MRoleId==2||this.MRoleId==3)
      {
        
      this.empcontact.CurrentZoneId=this.currentZonelist[0].zoneId;
      }
      if(this.MRoleId==3){
       
        this.getdistrict(this.empcontact.CurrentZoneId,this.DistId);
      }
      else if(this.MRoleId==2){
       
        this.getdistrict(this.empcontact.CurrentZoneId,'');
      }
     
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
  if(this.MRoleId==3){
    
    this.empcontact.CurrentDistId=this.currentdistlist[0].distId;
  }
 
 if(this.MRoleId==3)
 {
  
  this.getBlock(this.empcontact.CurrentDistId);
  this.getCompany(this.empcontact.CurrentDistId,'');
 }

 

},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})

  }
  blocklst:any;
  getBlock(distId)
  {this.spinner.show();
    this.masterService.getBlock(distId).subscribe((data:any)=>{
      this.blocklst=data;
      this.spinner.hide();},(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })

  }
  companylst:any;
  getCompany(distId,blockId)
  {
    // if(this.empcontact.residanceTypeCurrent=="Urban")
    // {
    //   this.empcontact.CurrentBlockId="--Select--";
    //   this.empcontact.CurrentCompanyId="--Select--";
    // }
    // if(this.empcontact.residanceTypeCurrent=="Rural")
    // {
    //   this.empcontact.CurrentBlockId="--Select--";
    // }
    this.spinner.show();
    this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{
      this.companylst=data; 
      this.spinner.hide();
  
    
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    });
  }
  // Get All Jawans
  Jawanlist:any=[];
  CompanyId=0
  getJawan(ZoneId,DistId,BlockId,CompanyId,AppNo,Sataus)
  { 
    if(ZoneId=="--Select--")
    {
      ZoneId=0;
    }
    if(DistId=="--Select--")
    {
      DistId=0;
    }
    if(BlockId=="--Select--")
    {
      BlockId=0;
    }
    if(CompanyId=="--Select--")
    {
      CompanyId=0;
    }
    if(AppNo==null||AppNo=="")
    {
      debugger;
      this.spinner.show();
      this.regservice.getJawan(ZoneId,DistId,BlockId,CompanyId,AppNo,Sataus).subscribe((data:any)=>{this.Jawanlist=data;
      
        this.totalReords=this.Jawanlist.length;
        this.rerender();
       
        this.spinner.hide();
        if(this.MRoleId==2)
        {
          for(let i=0;i<this.Jawanlist.length;i++)
          {
                  var a=new Date(this.Jawanlist[i].createdDate);
                  console.log(a);
          }
        }
        if(this.Jawanlist.length<0)
        {
          this.toastr.error("No Record Found","Failed");
        }
        
        }
        ,(error)=>{
      
          this.error=error;
          this.spinner.hide();
        },
        () => { this.spinner.hide(); console.log('HTTP request completed.'); }
        )
    }
   else
   {
    this.spinner.show();
    debugger
    if(ZoneId=="" || ZoneId==null)
    {
      ZoneId=0;
    }
    if(DistId=="" || DistId==null)
    {
      DistId=0;
    }
    if(BlockId=="" || BlockId==null)
    {
      BlockId=0;
    }
    if(CompanyId=="" || CompanyId==null)
    {
      CompanyId=0;
    }
    this.regservice.getJawan(ZoneId,DistId,BlockId,CompanyId,AppNo,Sataus).subscribe((data:any)=>{
      this.Jawanlist=data;
      
    this.spinner.hide();
    this.rerender();
    this.totalReords=this.Jawanlist.length;
    this.dtOptions = {
      dom: 'Bfrtip',
      
       pagingType: 'full_numbers',
       pageLength: 10,
       processing: true,
       buttons: [
         'excel','print'
       ],
       select: true,
    
      responsive: true,
    
    };
    if(this.Jawanlist.length<0)
    {
      this.toastr.error("No Record Found","Failed");
    }
    
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    }
    ,
          () => { this.spinner.hide(); console.log('HTTP request completed.'); }
    )
  
   }
  }
  ApproveJawanResult:any
ApproveJawan(empId,Status)
{
if(Status=="Approved")
{
  if(this.MRoleId==1)
  {
    var c=confirm("Do You Want to Lock this Jawan?");
    if(c==true)
    {this.spinner.show();
      var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
      var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      this.jawanApprovalDTO.empId =Number(empId);
      this.jawanApprovalDTO.mroleId =MRoleId;
      this.jawanApprovalDTO.remark ="Locked";
      this.jawanApprovalDTO.status =Status;
      this.jawanApprovalDTO.userLoginId =UserLoginId;
      this.regservice.JawanApproval(this.jawanApprovalDTO).subscribe((data:any)=>{this.ApproveJawanResult=data;
        this.spinner.hide();
      if(this.ApproveJawanResult!=null)
      {
        this.toastr.success("Jawan Approved Successfuly","Success");
        this.getJawan(this.ZoneId,this.DistId,this.BlockId,this.empcontact.CurrentCompanyId,this.AppNo,this.ApprovalStatus);
     
      }
      else{
        
        this.toastr.error("Some Error Occurred","Failed");
      }
      
      
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    }
  }
else if(this.MRoleId==2)
{
  var c=confirm("Do You Want to Approve this Jawan?");
  if(c==true) 
  {
    var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
    var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    var Remark=$("#Remark").val();
    empId=this.EmpId;
    this.spinner.show();
    if(Remark==null||Remark=="")
    {
      this.toastr.error("कृपया टिप्पणी भरिये","Failed");
      return false;
    }
    this.jawanApprovalDTO.empId =Number(empId);
    this.jawanApprovalDTO.mroleId =MRoleId;
    this.jawanApprovalDTO.remark =Remark;
    this.jawanApprovalDTO.status =Status;
    this.jawanApprovalDTO.userLoginId =UserLoginId;
    this.regservice.JawanApproval(this.jawanApprovalDTO).subscribe((data:any)=>{this.ApproveJawanResult=data;
      this.spinner.hide();
      $("#RemarkModal").modal("hide");
    if(this.ApproveJawanResult!=null)
    {
      this.toastr.success("Jawan Approved Successfully","Success");
      this.getJawan(this.ZoneId,this.DistId,this.BlockId,this.empcontact.CurrentCompanyId,this.AppNo,this.ApprovalStatus);
      this.EmpId=null;
      $("#Remark").val('');

    }
    else{
      this.toastr.error("Some Error Occurred","Failed");
    }
    
    
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })
  }
}

}
else if(Status=="Cancelled")
{
  if(this.MRoleId==1)
  {
    
    var c=confirm("Do You Cancel This Jawan??");
    if(c==true)
    {
      this.spinner.show();
      var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
      var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      this.jawanApprovalDTO.empId =Number(empId);
      this.jawanApprovalDTO.mroleId =MRoleId;
      this.jawanApprovalDTO.remark ="Cancelled";
      this.jawanApprovalDTO.status =Status;
      this.jawanApprovalDTO.userLoginId =UserLoginId;
      this.regservice.JawanApproval(this.jawanApprovalDTO).subscribe((data:any)=>{this.ApproveJawanResult=data;
        this.spinner.hide();
      if(this.ApproveJawanResult!=null)
      {
        this.getJawan(this.ZoneId,this.DistId,this.BlockId,this.empcontact.CurrentCompanyId,this.AppNo,this.ApprovalStatus);
     
      }
      else{
        this.toastr.error("Some Error Occurred","Failed");
      }
      
      
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    }
  }
  else if(this.MRoleId==2)
  {
    var c=confirm("Do You Cancel This Jawan??");
    if(c==true)
    {
      this.spinner.show();
      var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
      var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
      var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      this.jawanApprovalDTO.empId =Number(empId);
      this.jawanApprovalDTO.mroleId =MRoleId;
      this.jawanApprovalDTO.remark ="Cancelled";
      this.jawanApprovalDTO.status =Status;
      this.jawanApprovalDTO.userLoginId =UserLoginId;
      this.regservice.JawanApproval(this.jawanApprovalDTO).subscribe((data:any)=>{this.ApproveJawanResult=data;
        this.spinner.hide();
      if(this.ApproveJawanResult!=null)
      {
        this.getJawan(this.ZoneId,this.DistId,this.BlockId,this.empcontact.CurrentCompanyId,this.AppNo,this.ApprovalStatus);
     
      }
      else{
        this.toastr.error("Some Error Occurred","Failed");
      }
      
      
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    }
  }
 
}
else if(Status=="Revert")
{
  debugger;
  if(this.MRoleId==1)
  {
    var c=confirm("Do You want To Revert this Jawan??");
    if(c==true)
    {
      this.spinner.show();
      var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
      var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      this.jawanApprovalDTO.empId =Number(empId);
      this.jawanApprovalDTO.mroleId =MRoleId;
      this.jawanApprovalDTO.remark ="Revert";
      this.jawanApprovalDTO.status =Status;
      this.jawanApprovalDTO.userLoginId =UserLoginId;
      this.regservice.JawanApproval(this.jawanApprovalDTO).subscribe((data:any)=>{this.ApproveJawanResult=data;
        this.spinner.hide();
      if(this.ApproveJawanResult!=null)
      {
        this.toastr.success("Revert Successfully","Sucess");
        this.getJawan(this.ZoneId,this.DistId,this.BlockId,this.empcontact.CurrentCompanyId,this.AppNo,this.ApprovalStatus);
     
      }
      else{
        this.toastr.error("Some Error Occurred","Failed");
      }
      
      
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    }
  }
  else if(this.MRoleId==2)
  {
    var c=confirm("Do You want to Revert this Jawan??");
    if(c==true)
    {
      this.spinner.show();
      var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
      var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      var MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
      var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
      this.jawanApprovalDTO.empId =Number(empId);
      this.jawanApprovalDTO.mroleId =MRoleId;
      this.jawanApprovalDTO.remark ="Revert";
      this.jawanApprovalDTO.status =Status;
      this.jawanApprovalDTO.userLoginId =UserLoginId;
      this.regservice.JawanApproval(this.jawanApprovalDTO).subscribe((data:any)=>{this.ApproveJawanResult=data;
        this.spinner.hide();
      if(this.ApproveJawanResult!=null)
      {
        this.getJawan(this.ZoneId,this.DistId,this.BlockId,this.empcontact.CurrentCompanyId,this.AppNo,this.ApprovalStatus);
     
      }
      else{
        this.toastr.error("Some Error Occurred","Failed");
      }
      
      
      },(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
    }
  }
 
}
}


// Download Document
dowloadResult:any
JawanPic:string=null
DepartmentalId:string=null;
OtherId:string=null;
Educer:string=null;
BirthCer:string=null;
transCer:string=null;
TrainingCer:any;
DownloadDocument(empId)
{ this.spinner.show();
  this.TrainingCer=[];
  this.regservice.getBioData(empId).subscribe((data:any)=>{
    this.dowloadResult=data;
    this.spinner.hide();
    this.DocModal=true;
    this.JawanPic=AppComponent.documentUrl+this.dowloadResult.Employee.empPic;
    this.DepartmentalId=AppComponent.documentUrl+this.dowloadResult.Employee.idProof1Pic;
    if(this.dowloadResult.Employee.idProof2Pic!=null){
      this.spinner.hide();
      this.OtherId=AppComponent.documentUrl+this.dowloadResult.Employee.idProof2Pic;
    }

    this.Educer=AppComponent.documentUrl+this.dowloadResult.Employee.idProof3Pic;
    this.BirthCer=AppComponent.documentUrl+this.dowloadResult.Employee.birthCerPic;
    if(this.dowloadResult.Employee.transCert!=null)
    { this.spinner.hide();
      this.transCer=AppComponent.documentUrl+this.dowloadResult.Employee.transCert;
    }
      for(var i=0;i<this.dowloadResult.EmpTraining.length;i++)
    {
      var url=AppComponent.TrainingCertificateUrl+this.dowloadResult.EmpTraining[i].trainingCertificate;
      this.TrainingCer.push(url);
    }
  //  window.open(AppComponent.documentUrl+this.dowloadResult.Employee.empPic);
  //  window.open(AppComponent.documentUrl+this.dowloadResult.Employee.idProof1Pic);
  //  window.open(AppComponent.documentUrl+this.dowloadResult.Employee.idProof3Pic);
  //  window.open(AppComponent.documentUrl+this.dowloadResult.Employee.birthCerPic);
  //  if(this.dowloadResult.Employee.idProof2Pic!=null)
  //  {
  //   window.open(AppComponent.documentUrl+this.dowloadResult.Employee.idProof2Pic);
   
  //  }
  //  if(this.dowloadResult.Employee.transCert!=null)
  //  {
  //   window.open(AppComponent.documentUrl+this.dowloadResult.Employee.transCert);
   
  //  }
  //  for(var i=0;i<this.dowloadResult.EmpTraining.length;i++)
  //  {
  //   window.open(AppComponent.TrainingCertificateUrl+this.dowloadResult.EmpTraining[i].trainingCertificate);
  //  }
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
}

data:any;
Biodatadiv:boolean=false;
GetBioData(EmpId)
{
  this.spinner.show();
  this.regservice.getBioData(EmpId).subscribe((data:any)=>{
    this.data=data; this.spinner.hide();
this.Biodatadiv=true;
this.data.Employee.EmpPic=AppComponent.documentUrl+this.data.Employee.empPic;
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
}

//GetRemarkPopup
EmpId:any;
GetRemarkPopup(empId)
{
  debugger;
this.EmpId=empId;
}
GetRevertRemarkPopup(empId)
{
this.EmpId=empId;
}

ClickUrbanRuralCurrent()

{
  if($("#radioCurrentUrban").prop("checked",true))
  {
    this.empcontact.CurrentCompanyId="--Select--";
    this.empcontact.CurrentBlockId="--Select--";
    this.getCompany(this.empcontact.CurrentDistId,'');
   
  }
  if($("#rbnVillage2").prop("checked",true))
  
 {
  this.CompanyId=0;
 }
 if($("#rbnVillage1").prop("checked",true))
  
 {
  this.CompanyId=0;
 }
 if($("#rbnVillage").prop("checked",true))
  
 {
  this.CompanyId=0;
 }
 
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

// download()
// {
//   var url='https://prdapp.azurewebsites.net/Document/2accd4ad-b781-4fd2-845c-7a482f87e9c5_PRD5.jpg';    
//   saveAs('https://prdapp.azurewebsites.net/Document/2accd4ad-b781-4fd2-845c-7a482f87e9c5_PRD5.jpg','document')
// }
}

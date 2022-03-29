import { Subject } from 'rxjs';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from './../../Service/master.service';
import { employee,empContact } from './../../Model/employee';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportService } from './../../Service/report.service';
import { DataTableDirective } from 'angular-datatables'; 
import { RegistrationService } from 'src/app/Service/registration.service';
@Component({
  selector: 'app-delete-death-jawan-list',
  templateUrl: './delete-death-jawan-list.component.html',
  styleUrls: ['./delete-death-jawan-list.component.css']
})
export class DeleteDeathJawanListComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: DataTables.Api;
  UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  ZoneId:any=sessionStorage.getItem("ZoneId");
  DistId:any=sessionStorage.getItem("DistId");
  BlockId:any=sessionStorage.getItem("BlockId");
  totalReords:string
  disabledrpDivision:boolean=false;
  disabledrpDistrict:boolean=false;
   page:number=1
  
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
    error:any;
    DocModal:boolean=false;
    constructor(private masterService:MasterService,private regservice:RegistrationService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }
  
    ngOnInit(): void {
      if(this.MRoleId==2||this.MRoleId==3)
      {
        this.getZone(this.ZoneId);
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
       
  
      this.spinner.show();
        this.regservice.GetDeleteDeathJawanDetail(0,0,0,'~').subscribe((data:any)=>{this.PunishJawanlist=data;
          this.spinner.hide();
          this.totalReords=this.PunishJawanlist.length;
        
          if(this.PunishJawanlist.length<0)
          {
            this.toastr.error("No Record Found","Failed");
          }
          this.rerender();
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
          }
          ,(error)=>{
        
            this.error=error
            this.spinner.hide();
          }
          )
     }
     else if(this.MRoleId==2)
     {
      this.DistId=0;
     this.disabledrpDivision=true;
      //this.GetDeleteDeathJawanDetail(parseInt(this.ZoneId),this.DistId,0);
      
      this.spinner.show();
        this.regservice.GetDeleteDeathJawanDetail(0,0,0,'~').subscribe((data:any)=>{this.PunishJawanlist=data;
          this.spinner.hide();
          this.totalReords=this.PunishJawanlist.length;
          this.rerender();
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
          if(this.PunishJawanlist.length<0)
          {
            this.toastr.error("No Record Found","Failed");
          }
          
          }
          ,(error)=>{
        
            this.error=error
            this.spinner.hide();
          }
          )
     }
     else if(this.MRoleId==3)
     {
     
      //this.GetDeleteDeathJawanDetail(parseInt(this.ZoneId),parseInt(this.DistId),0);
      this.disabledrpDivision=true;
      this.disabledrpDistrict=true;
      this.spinner.show();
        this.regservice.GetDeleteDeathJawanDetail(0,0,0,'~').subscribe((data:any)=>{this.PunishJawanlist=data;
          this.spinner.hide();
          this.totalReords=this.PunishJawanlist.length;
        this.rerender();
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
          if(this.PunishJawanlist.length<0)
          {
            this.toastr.error("No Record Found","Failed");
          }
          
          }
          ,(error)=>{
        
            this.error=error
            this.spinner.hide();
          }
          )
     }
     //datatable js code
  
  
    
  
    }
    currentZonelist:any;
    
    getZone(zoneId)
    { 
      this.spinner.show();
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
        
        this.error=error
        this.spinner.hide();
      });
   
  
    }
    dtTrigger=new Subject();
    dtOptions:any={};
    currentdistlist:any;
    ngAfterViewInit(){
      //Define datatable 
      this.dtTrigger.next();
    }
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
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
        
    this.error=error
    this.spinner.hide();
  })
  
    }
    blocklst:any;
    getBlock(distId)
    {this.spinner.show();
      this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data;this.spinner.hide();},(error)=>{
        
        this.error=error
        this.spinner.hide();
      })
  
    }
    companylst:any;
    getCompany(distId,blockId)
    {
     
      this.spinner.show();
      this.masterService.getCompany(distId,blockId).subscribe((data:any)=>{this.companylst=data; this.spinner.hide();
    
      
      },(error)=>{
        
        this.error=error
        this.spinner.hide();
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
  
    // Get All Jawans
    PunishJawanlist:any;
    GetDeleteDeathJawanDetail(ZoneId,DistId,CompanyId,residanceTypeCurrent)
    { 
      if(ZoneId=="--Select--")
      {
        ZoneId=0;
      }
      if(DistId=="--Select--")
      {
        DistId=0;
      }
     
      if(CompanyId=="--Select--")
      {
        CompanyId=0;
      }
      residanceTypeCurrent=residanceTypeCurrent;
        this.spinner.show();
        this.regservice.GetDeleteDeathJawanDetail(ZoneId,DistId,CompanyId,residanceTypeCurrent).subscribe((data:any)=>{this.PunishJawanlist=data;
          this.spinner.hide();
          this.rerender();
        
          if(this.PunishJawanlist.length<0)
          {
            this.toastr.error("No Record Found","Failed");
          }
          
          }
          ,(error)=>{
        
            this.error=error
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
{ 
  debugger
  this.spinner.show();
  this.TrainingCer=[];
  this.regservice.GetJawanDeathCertificate(empId).subscribe((data:any)=>{
    
    this.dowloadResult=data;
    this.spinner.hide();
    this.DocModal=true;
    this.JawanPic=AppComponent.documentUrl+this.dowloadResult.Employee.deathCertificate;
   
 
  },(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
}
  }

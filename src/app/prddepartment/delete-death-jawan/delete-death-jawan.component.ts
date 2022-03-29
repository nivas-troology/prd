import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/Service/registration.service';

@Component({
  selector: 'app-delete-death-jawan',
  templateUrl: './delete-death-jawan.component.html',
  styleUrls: ['./delete-death-jawan.component.css']
})
export class DeleteDeathJawanComponent implements OnInit {

  divJawanDetail:boolean=false;
  divPunishProcess:boolean=false;
  ServiceNo="";
UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  constructor(private regService:RegistrationService,private spinner:NgxSpinnerService,private ToastrService:ToastrService) { }


  ngOnInit(): void {
  }
  JawanDeath={
    UserLoginId:null,
    EmpId:null,
    PunishValidTill:null,
    PReason:null,
    DeathRemark:null,
    DeathCertificateExtention:null,
    DeathCertificate:null
  }
  jawan:any=[]
  error:any;
  url:string='';
  GetJawanSearch(ServiceNo)
  {
    debugger;
    this.spinner.show();
    this.regService.GetJawanForDelete(ServiceNo).subscribe((data:any)=>{
      this.jawan=data;
      this.spinner.hide();
      if(this.jawan==null)
      {
        this.ToastrService.warning("No Record Found");
      }
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
    }
    
    )
    
  }
UploadCertificate(e) {
  debugger
  if(e.target.files)
  {
    var reader=new FileReader();
    var splitImage:string[]=e.target.files[0].name.split('.');
    this.JawanDeath.DeathCertificateExtention=splitImage[1];
    if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="pdf" && splitImage[splitImage.length-1]!="png")
    {
     this.ToastrService.error("The photo must be in .jpg/.png/.pdf format","Image format error!")
     return false;
    }
    if(e.target.files[0].size>1048576)
    {
      this.ToastrService.error("The photo must not be greater than 1MB","Image size error!")
      return false;
    }
    
 
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      
      this.JawanDeath.DeathCertificate=(reader.result).toString();
      console.log(this.JawanDeath.DeathCertificate+"___1");
    }
  }
 }
 
  JawanDeleteDeath()
  { 
    var c=confirm("Are you sure you want to delete this jawan??");
    if(c==true)
    {
      this.JawanDeath.EmpId=this.jawan.empId;
      this.JawanDeath.UserLoginId=this.UserLoginId;
      this.JawanDeath.DeathCertificate=$("#DeathCertificate").val();
      this.JawanDeath.DeathRemark=$("#DeathRemark").val();
      this.spinner.show();
      this.regService.DeleteDeathJawan(this.JawanDeath).subscribe((data:any)=>{var result=data;
        this.spinner.hide();
      if(result>0)
      {
        this.ToastrService.success("Jawan Deleted Successfully");
        this.divJawanDetail=false;
        this.divPunishProcess=false;
        this.JawanDeath={
          UserLoginId:null,
          EmpId:null,
          PunishValidTill:null,
          PReason:null,
          DeathRemark:null,
          DeathCertificateExtention:null,
          DeathCertificate:null
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

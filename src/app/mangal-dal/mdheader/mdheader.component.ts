import { MangalDalService } from './../../Service/mangal-dal.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MangaldalRegistrationComponent } from 'src/app/mangaldal-registration/mangaldal-registration.component';

@Component({
  selector: 'app-mdheader',
  templateUrl: './mdheader.component.html',
  styleUrls: ['./mdheader.component.css']
})
export class MdheaderComponent implements OnInit {
  CertificateMenu:boolean=false;
  Orglst:any;
  error:any;
  constructor(private route:Router,private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    this.mangaldalService.GetOrganisationDetails(UserLoginId).subscribe(data=>{
      this.Orglst=data;
      if(this.Orglst[0].status=="Approved")
      {
        this.CertificateMenu=true;
      }
      else
      {
        this.CertificateMenu=false;
      }
      this.spinner.hide();
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }
LogOut()
{
  sessionStorage.setItem("UserLoginId",null);
  sessionStorage.setItem("TeamId",null);
  sessionStorage.setItem("TeamType",null);
  this.route.navigate(['/SignIn'])
}
}

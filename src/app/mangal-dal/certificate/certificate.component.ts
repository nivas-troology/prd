import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../../Service/mangal-dal.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  constructor(private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }
  Orglst:any;
  error:any;
Org:any;
  ngOnInit(): void {
    var pipe = new DatePipe('en-US');
    this.spinner.show();
    var UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    this.mangaldalService.GetOrganisationDetails(UserLoginId).subscribe(data=>{
      this.Orglst=data;
      this.Orglst[0].registrationDate=pipe.transform(this.Orglst[0].registrationDate, 'dd/MM/yyyy');
      this.Org=this.Orglst[0];
      this.spinner.hide();
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }

}

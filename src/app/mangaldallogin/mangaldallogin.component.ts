import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../Service/mangal-dal.service';
import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mangaldallogin',
  templateUrl: './mangaldallogin.component.html',
  styleUrls: ['./mangaldallogin.component.css']
})
export class MangaldalloginComponent implements OnInit {

  constructor(private mangaldalservice:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService,private Router:Router) { }
error:any;

  ngOnInit(): void {
  }
User:any={
  UserName:null,
  Password:null
}
LoginResult:any;
Login(User)
{
  this.spinner.show();
  return this.mangaldalservice.Login(User).subscribe(data=>{
    this.LoginResult=data;
    debugger
    sessionStorage.setItem("UserLoginId",this.LoginResult.mduserId);
    sessionStorage.setItem("BlockId",this.LoginResult.blockId);
this.Router.navigate(['/MangalDal/MangalDalRegistration'])
this.spinner.hide();
  },error=>{
    this.error=error;
    this.toastr.error(this.error.error);
    
    this.spinner.hide();
  }
  )
}

}

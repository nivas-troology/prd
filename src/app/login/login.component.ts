import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from './../Service/user.service';
import { AuthGuardService } from './../Service/auth-guard.service';

import { User } from './../Model/User';
import { NgForm } from '@angular/forms';



import { Router} from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserName:string;
  Password:string;

  constructor(private userservice:UserService,private ToastrService:ToastrService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  User:any;
  //MRoleId:any;
Login(UserName,Password)
{
  try{
  debugger

  this.spinner.show();
 this.userservice.Login(UserName,Password).subscribe((data:any)=>{
   this.User=data;
  if(this.User!=null)
  {
    console.log(this.User);
    localStorage.setItem("User",this.User);
    sessionStorage.setItem("UserLoginId",this.User.userLoginId);
    sessionStorage.setItem("MRoleId",this.User.mroleId);
    sessionStorage.setItem("PersonName",this.User.personName);
    sessionStorage.setItem("ZoneId",this.User.zoneId);
    sessionStorage.setItem("DistId",this.User.distId);
    sessionStorage.setItem("BlockId",this.User.blockId);
    sessionStorage.setItem("UserName",this.User.userName);
    sessionStorage.setItem("UserPassword",this.User.userPassword);  
    sessionStorage.setItem("UserToken",this.User.userToken);
    sessionStorage.setItem("Expiration",this.User.expiration);
    //this.MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
  this.router.navigate(['/PRDDepartment/Dashboard']);
  this.spinner.hide();
  this.spinner.hide();
  
  //window.location.replace('/PRDDepartment/Dashboard');
  }
  else
  {
    this.spinner.hide();
    this.ToastrService.error("Wrong Username and Password","Failed");

  }

}
,error=>{
  this.spinner.hide();
  this.ToastrService.error(error.error);
},
()=>{this.spinner.hide();}
 )
}
catch (Error)   
{  
  alert(Error.message);  
}
}
keydownFunction(event)
{
  if(event.keyCode==13)
  {
    this.Login(this.UserName,this.Password);
  }
}

}

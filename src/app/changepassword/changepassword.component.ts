import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../Service/user.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {


UserLoginId:any=parseInt(sessionStorage.getItem("UserLoginId"));
OldPassword:string=null;
NewPassword:string=null;
ConfirmPassword:string=null;
  constructor(private UserService:UserService,private toastr:ToastrService,private spinner:NgxSpinnerService,private router:Router) { }
  UserDetail:any;
  ngOnInit(): void {
  // console.log(this.Token);

this.UserService.GetLoginDetails(this.UserLoginId).subscribe((data:any)=>{
  this.UserDetail=data;
})
  }
  minLength:number=8;
  maxLength:number=32;
  pattern:string="^(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\])$"
  ChangePassResult:any;
  
ChangePassword(OldPassword,NewPassword,ConfirmPassword)
{
if(OldPassword!=this.UserDetail.userPassword)
{
this.toastr.error("Old Password Is Incorrect","Failed");
return false;
}
if(NewPassword.length<this.minLength)
{
  this.toastr.error("Password is too short","Failed");
return false;
}
if(NewPassword.length>this.maxLength)
{
  this.toastr.error("Password is too long","Failed");
return false;
}
if(NewPassword!=ConfirmPassword)
{
this.toastr.error("New Password And Confirm Password Must Be Equal","Failed");
return false;
}
this.spinner.show();
debugger;
this.UserService.ChangePassword(this.UserLoginId,ConfirmPassword).subscribe((data:any)=>{

this.ChangePassResult=data;
if(this.ChangePassResult>0)
{
  this.toastr.success("Password Changed Successfully","Successfully");
  this.spinner.hide();
  this.Logout();
}
},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})
}
error:any;

Logout()
{
  debugger;
  sessionStorage.setItem("UserLoginId",null);
  sessionStorage.setItem("MRoleId",null);
  sessionStorage.setItem("PersonName",null);
  sessionStorage.setItem("ZoneId",null);
  sessionStorage.setItem("DistId",null);
  sessionStorage.setItem("BlockId",null);
  sessionStorage.setItem("UserName",null);
  sessionStorage.setItem("UserPassword",null);
  this.router.navigateByUrl('/Login');
}
}

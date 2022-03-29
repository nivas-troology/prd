import { FormGroup, NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../Service/mangal-dal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mangaldal-registration',
  templateUrl: './mangaldal-registration.component.html',
  styleUrls: ['./mangaldal-registration.component.css']
})
export class MangaldalRegistrationComponent implements OnInit {
error:any;
  constructor(private mangaldalservice:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
User:any={
Name:null,
Dob:null,
MobileNo:null
}
regresult:any;
Register(User)
{
  debugger;
  var Dob= User.Dob;
  var today = new Date();
  //var month= Dob.getMonth()+'/'+ Dob.getDate()+'/'+Dob.getFullYear()
  
  
  var birthDate = new Date(Dob);
  var age =  today.getFullYear()-birthDate.getFullYear();
 if(age>=18) {   
  User.Dob=$("#Dob").val();
  this.spinner.show();
  this.mangaldalservice.Registration(User).subscribe(data=>{
    this.regresult=data;
    this.toastr.success(this.regresult);
    this.spinner.hide();
    this.User={
      Name:null,
Dob:null,
MobileNo:null
    }
  },error=>{
    this.error=error;
  this.spinner.hide();
  this.toastr.error(this.error.error);
  })

 }  
 else
 {
  this.toastr.error("Please Enter date of birth is not less 18 years.");
 }
}
}

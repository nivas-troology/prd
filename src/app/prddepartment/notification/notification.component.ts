import { UserService } from './../../Service/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
//#region Page Control ngModels
public ToDate;
public FromDate;
public NotificationDetails;
public Division;
public District;
public Block;
public Mangaldal;
//#endregion
NotificationFrom ={
   ToDate :null,
   FromDate :null,
   NotificationDetails :null,
   Division :null,
   District :null,
   Block :null,
   Mangaldal :null
}

public formData;
ActivityResult: any;
MRoleId:any=parseInt(sessionStorage.getItem("MRoleId"));
  constructor(private userService:UserService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  saveNotificationForm(form: NgForm): void
  {
    var c=confirm("Are you Sure To Add this Activity??");
    if(c==true)
      {
        debugger
          this.formData = new FormData();
        
          this.formData.append('Division',$("#division").val()); 
          this.formData.append('District',$("#district").val()); 
          this.formData.append('District',$("#district").val()); 
          this.formData.append('District',$("#district").val()); 
          this.formData.append('FromDate',$("#fromDate").val());  
          this.formData.append('ToDate',$("#toDate").val());      
          this.formData.append('NotificationDetails',$("#NotificationDetails").val());  
          console.log(this.formData)
          this.spinner.show();  
          this.userService.InsertNotification(this.formData).subscribe((data:any)=>{
          this.ActivityResult=data;    
          form.resetForm();     
          if(this.ActivityResult!=null)
          {
            this.toastr.success("Activity Added Successfully");
          }    
        },error=>{
          this.spinner.hide();
          this.toastr.error(error.error);
        })
      }
    }

  Reset(form: NgForm){}
}

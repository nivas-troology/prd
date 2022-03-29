import { UserService } from './../../Service/user.service';
import { User } from './../../Model/User';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from './../../Service/master.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { getRtlScrollAxisType } from '@angular/cdk/platform';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   //#region Data Table
   @ViewChild(DataTableDirective)
   dtElement: DataTableDirective;
   dtInstance: DataTables.Api;
   dtTrigger=new Subject();
   dtOptions:any={};
   ngAfterViewInit(){
     //Define datatable 
     this.dtTrigger.next();
   }
   ngOnDestroy(): void {
     this.dtTrigger.unsubscribe();
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
   //#endregion
  totalReords:string
  page:number=1
  btnSave:boolean=true;
  btnUpdate:boolean=false;
  constructor(private masterService:MasterService,private toasterservice:ToastrService,private userService:UserService,private spinner:NgxSpinnerService) { }
  resZonelist:any;
  ngOnInit(): void {
    this.getRole();
    this.masterService.getZone('').subscribe((data:any)=>{this.resZonelist=data; });
    this.GetUsers();
  }
 
user:User={
  UserLoginId:null,
  PersonName:null,
  MroleId:"--Select--",
  ZoneId:"--Select--",
  DistId:"--Select--",
  BlockId:"--Select--",
  UserName:null,
  UserPassword:null
}
//Get Role
roleLst:any; error:any;
getRole()
{ this.spinner.show();
  this.masterService.getRole().subscribe((data:any)=>{this.roleLst=data; this.spinner.hide();},(error)=>{
      
    this.error=error;
    this.spinner.hide();
  })
}
//GetDistrict
resdistlist:any;
getDistrict(zoneId)
  { this.spinner.show();
    this.masterService.getDistrict(zoneId,'').subscribe((data:any)=>{this.resdistlist=data;  
      this.spinner.hide();
      if(this.userObj!=null)
      { 
        var distObj=this.resdistlist.find(id=>id.distId===this.userObj.distId);
        this.user.DistId=distObj.distId;
      }},(error)=>{
      
        this.error=error;
        this.spinner.hide();
      })
  
  }
  // GetBlock
  regblocklst:any;
  getBlock(distId)
  { this.spinner.show();
    this.masterService.getBlock(distId).subscribe((data:any)=>{this.regblocklst=data;
      this.spinner.hide();
      debugger
      if(this.userObj!=null)
      { 
        var blockObj=this.resdistlist.find(id=>id.blockId===this.userObj.blockId);
        this.user.BlockId=blockObj.blockId;
      }
    
    },(error)=>{
      
      this.error=error;
      this.spinner.hide();
    })
  }
//Save User
result:any;
SaveUser(UserLoginForm:NgForm)
{ 
  UserLoginForm.value.MroleId=parseInt(this.user.MroleId);
  UserLoginForm.value.ZoneId=parseInt(this.user.ZoneId);
  UserLoginForm.value.DistId=parseInt(this.user.DistId);
  UserLoginForm.value.BlockId=parseInt(this.user.BlockId);
  this.spinner.show();
this.userService.SaveUser(UserLoginForm.value).subscribe((data:any)=>{this.result=data;
if(this.result>0)
{ this.spinner.hide();
  this.toasterservice.success("User Saved Successfully","Success");
  this.ResetUserForm();
  this.GetUsers();
}
else
{ this.spinner.hide();
  this.toasterservice.error("Some Error Occured","Failed");
}

},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})
}

//Get Users
UsersList:any;
GetUsers()
{
  this.spinner.show();
this.userService.GetUsers().subscribe((data:any)=>{this.UsersList=data;
  
this.spinner.hide();
this.totalReords=this.UsersList.length;
//#region Datatable
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
this.rerender();
//#endregion
},(error)=>{
      
  this.error=error;
  this.spinner.hide();
})
}
ResetUserForm()
{
  this.user={
    UserLoginId:null,
    PersonName:null,
    MroleId:"--Select--",
    ZoneId:"--Select--",
    DistId:"--Select--",
    BlockId:"--Select--",
    UserName:null,
    UserPassword:null
  }
}
district:any
block:any;
userObj:any;
Edit(Id)
{
  this.btnSave=false;
  this.btnUpdate=true;
  this.userObj=this.UsersList.find(listId=>listId.userLoginId===Id);
  this.user.UserLoginId=this.userObj.userLoginId;
  this.user.PersonName=this.userObj.personName;
  this.user.MroleId=this.userObj.mroleId;
  this.user.ZoneId=this.userObj.zoneId;
  if(this.userObj.distId!=null)
  this.getDistrict(this.user.ZoneId);
  else
  this.user.DistId=this.userObj.distId;
  //this.user.DistId=this.userObj.distId;
  if(this.userObj.blockId!=null)
  this.getBlock(this.user.DistId)
  this.user.BlockId=this.userObj.blockId;
  this.user.UserName=this.userObj.userName;
  this.user.UserPassword=this.userObj.userPassword;
}
Delete(Id)
{
  confirm("Are you sure to delete this record?")
  { this.spinner.show();
    this.userService.DeleteUser(Id).subscribe((data:any)=>{this.result=data;
      if(this.result>0)
      { this.spinner.hide();
        this.toasterservice.success("User Deleted Successfully","Success");
        this.GetUsers();
      }
      else
      { this.spinner.hide();
        this.toasterservice.error("Some Error Occurred","Failed");
      }
      },(error)=>{
      
        this.error=error; 
        this.spinner.hide();
      })
  }
 
}
UpdateUser(user)
{this.spinner.show();
  this.user=user; 
  
  this.userService.SaveUser(this.user).subscribe((data:any)=>{this.result=data;
    if(this.result>0)
    { this.spinner.hide();
      this.toasterservice.success("User Updated Successfully","Success");
      this.ResetUserForm();
      this.GetUsers();
      this.btnSave=true;
      this.btnUpdate=false;
    }
    else
    {
      this.spinner.hide();
      this.toasterservice.error("Some Error Occured","Failed");
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    })
}

}

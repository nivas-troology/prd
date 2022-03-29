import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MangalDalService } from './../../Service/mangal-dal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  btnSave:boolean=true;
  btnUpdate:boolean=false;
error:any;
MangalDalDocURL=AppComponent.MangalDalDocURL;
    constructor(private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService){ }
Attachments:any={
  TeamId:null,
  MeetingActionBook:null,
 /*  NirikshanBook:null,
  StoreBook:null, */
  MeetingDate:null
}
  ngOnInit(): void {
    this.GetAttachementDetails();
  }
  UploadMeetingActionBook(e) {
    if(e.target.files)
    {
     
      var reader=new FileReader();
      var splitImage:string[]=e.target.files[0].name.split('.');
      var FileExtention=splitImage[1];
      this.Attachments.FileExtention=FileExtention;
      if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="png" && splitImage[splitImage.length-1]!="pdf")
      {
       this.toastr.error("The photo must be in .jpg/.jpeg/.png/pdf format","Image format error!")
       return false;
      }
      if(e.target.files[0].size>1048576)
      {
        this.toastr.error("The photo must not be greater than 1MB","Image size error!")
        return false;
      }
      
   
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        var UploadFile=(reader.result).toString();
        this.Attachments.MeetingActionBook=UploadFile;
      }
    }
}
/* UploadNirikshanBook(e) {
  if(e.target.files)
  {
   
    var reader=new FileReader();
    var splitImage:string[]=e.target.files[0].name.split('.');
    var FileExtention=splitImage[1];
    this.Attachments.FileExtention1=FileExtention;
    if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="png" && splitImage[splitImage.length-1]!="pdf")
    {
     this.toastr.error("The photo must be in .jpg/.jpeg/.png/pdf format","Image format error!")
     return false;
    }
    if(e.target.files[0].size>1048576)
    {
      this.toastr.error("The photo must not be greater than 1MB","Image size error!")
      return false;
    }
    
 
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      var UploadFile=(reader.result).toString();
      this.Attachments.NirikshanBook=UploadFile;
    }
  }
} */
/* UploadStoreBook(e) {
  if(e.target.files)
  {
   
    var reader=new FileReader();
    var splitImage:string[]=e.target.files[0].name.split('.');
    var FileExtention=splitImage[1];
    this.Attachments.FileExtention2=FileExtention;
    if(splitImage[splitImage.length-1]!="jpg" && splitImage[splitImage.length-1]!="jpeg" && splitImage[splitImage.length-1]!="JPG" && splitImage[splitImage.length-1]!="png" && splitImage[splitImage.length-1]!="pdf")
    {
     this.toastr.error("The photo must be in .jpg/.jpeg/.png/pdf format","Image format error!")
     return false;
    }
    if(e.target.files[0].size>1048576)
    {
      this.toastr.error("The photo must not be greater than 1MB","Image size error!")
      return false;
    }
    
 
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
      var UploadFile=(reader.result).toString();
      this.Attachments.StoreBook=UploadFile;
    }
  }
} */
AttchResult:any;
AddAttachment(Attachments)
{
 var c=confirm("Do You want to Upload These Attachments Finally??");
 if(c==true)
  {
    Attachments.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
    Attachments.TeamId=parseInt(sessionStorage.getItem("TeamId"));
    Attachments.MeetingDate=$("#MeetingDate").val();
    this.spinner.show();
    this.mangaldalService.AddAttachment(Attachments).subscribe(data=>{
      this.AttchResult=data;
      this.Attachments={
        TeamId:null,
        MeetingActionBook:null,
      /*   NirikshanBook:null,
        StoreBook:null */
      }
      this.GetAttachementDetails();
      this.spinner.hide();
  
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    });
  }

}
Attachmentlst:any;
GetAttachementDetails()
{
  var TeamId=parseInt(sessionStorage.getItem("TeamId"));
  this.spinner.show();
  this.mangaldalService.GetAttachementDetails(TeamId).subscribe(data=>{
this.Attachmentlst=data;

this.spinner.hide();
  },error=>{
    this.error=error;
    this.spinner.hide();
    this.toastr.error(this.error.error);
  })
}

DownloadMeetingActionBook(meetingActionBook)
{
  window.open(this.MangalDalDocURL+meetingActionBook);
}
/* DownloadNirikshanBook(nirikshanBook)
{
  window.open(this.MangalDalDocURL+nirikshanBook);
} */
/* DownloadStoreBook(storeBook)
{
  window.open(this.MangalDalDocURL+storeBook);
} */
}
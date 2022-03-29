import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { debug } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { MangalDalService } from 'src/app/Service/mangal-dal.service';
import { Uploader } from '../entities/uploader';
import { UploadQueue } from '../entities/uploadqueue';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent implements OnInit {

  images = [];
  
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
 //#region datatable
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtInstance: DataTables.Api;
  public dtTrigger: Subject<any> = new Subject();
  dataTable: any;
//#endregion

  btnSave:boolean=true;
  btnUpdate:boolean=false;
  ActivityResult: any;
  error: any;
  datepipe: any;
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
    }
  }
   //getter : get overall progress
   get progress(): number {
    let psum = 0;

    for (let entry of this.uploader.queue) {
      psum += entry.progress;
    }

    if (psum == 0)
      return 0;

    return Math.round(psum / this.uploader.queue.length);
  };
  public message: string;
  public uploader: Uploader = new Uploader();
  constructor(private mangaldalService:MangalDalService,private toastr:ToastrService,private spinner:NgxSpinnerService,private http: HttpClient) { }
    public MDActivityRecord
    public dtInstance: DataTables.Api;
    public dtTrigger: Subject<any> = new Subject();
    ngOnInit(): void {
    this.GetMDActivityDetails();
    this.dtOptions = {
      dom : 'Bfrtip',
      buttons: [
        'print',
        'excel',
        'colvis',
        'copy',
      ],
      select: true,
      responsive: true,
      paging: false,
      autoWidth: false,
      order: [],
      // bSort: false
    };
   
  }
  Image:any =[];

  Activity:any={
    ActivityId:0,
    TeamId:0,
    ActivityName:null,
    ActivityPlace:null,
    FromDate:null,
    ToDate:null,
    ActivityDetails:null,
    Images:FormData
    
  }
  MDActivity:any={
    ActivityId:0,
    TeamId:0,
    ActivityName:null,
    ActivityPlace:null,
    FromDate:null,
    ToDate:null,
  }
  MDImgActivity:any={
    ActivityId:0,
    Activityfile:null,
   
   
  }

  get fileDetails(){
    return this.myForm.controls;
  }


//#region Select Data 
  MDActlst:any;
  GetMDActivityDetails()
  {
    debugger
    this.spinner.show();
 
    this.mangaldalService.GetMDActivityDetails().subscribe(data=>{
      this.MDActlst=data;
      this.rerender();
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
      this.spinner.hide();
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }
//#endregion

//#region  Delete data
  DeleteActivityResult:any;
  DeleteActivity(activityId)
{
  debugger
  var c=confirm("Are You Sure Want to Delete This Record??");
  if(c==true)
  {
    this.Activity.ActivityId=activityId;
  //  this.Activity.UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
  this.Activity.ModifiedBy=sessionStorage.getItem("TeamType");
    this.spinner.show();
    this.mangaldalService.DeleteMDActivityDetails(this.Activity).subscribe(data=>{
  this.DeleteActivityResult=data;
  this.toastr.success("Record Deleted Successfully");
  this.rerender();
  this.GetMDActivityDetails();
  this.spinner.hide();
  
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }
  
  }
//#endregion

//#region  Edit data
   editEmployeeRecord(ActivityId): void {
  
    this.spinner.show();
    
    const a = Number(ActivityId); 
    if ( a > 0 )
    {
     this.GetMDActivityDetailsById(a);
     this.btnSave=false;
      this.btnUpdate=true;
    }
    this.spinner.hide();
  }
  GetMDActivityDetailsById(ActivityId): void{
    debugger
    
    $("#filetxt").hide();  
   this.spinner.show();
   this.mangaldalService.GetMDActivityDetailsById(ActivityId).subscribe(
     res => {
       this.MDActivityRecord = res[0];
       this.setDefaultValuesToPageModelUpdateCase(this.MDActivityRecord);
      },
     err => {
       if (err.status === 500) {
         this.toastr.error(err.error);
       }
       else if (err.status === 400) {
         this.toastr.error(err.error);
       }
      
       else if (err.status === 409) {
         this.toastr.error(err);
       }
       else if (err.status === 406) {
         this.toastr.error(err.error);
       }
     },
     () => {  }
   );
   this.spinner.hide();
  }
  
  setDefaultValuesToPageModelUpdateCase(model: any): void {
    this.Activity.ActivityName = model.activityName;
    this.Activity.ActivityPlace = model.activityPlace;
    this.Activity.ActivityDetails = model.activityDetails;
    this.Activity.FromDate = model.fromDate;
    this.Activity.ToDate = model.toDate;
    localStorage.ActivityId =  model.activityId;
     this.btnSave=false;
     this.btnUpdate=true;
  }
  //#endregion
  
//#region Update Records
  UpdateActivity(Activity)
  {

    var c=confirm("Are you Sure Want To Update this Activity??");
    if(c==true)
    {
      debugger;
      this.Activity.ActivityId=parseInt(localStorage.getItem("ActivityId"));
      this.Activity.TeamId=parseInt(sessionStorage.getItem("TeamId"));
      this.Activity.ModifiedBy=sessionStorage.getItem("TeamType");
      this.Activity.ActivityName=$("#ActivityName").val();
      this.Activity.FromDate=$("#FromDate").val();
      this.Activity.ToDate=$("#ToDate").val();
      this.Activity.ActivityPlace=$("#ActivityPlace").val();
      this.Activity.ActivityDetails=$("#ActivityDetails").val();
      this.spinner.show();
      console.log(this.Activity);
      this.mangaldalService.UpdateActivity(this.Activity).subscribe((data:any)=>{
      this.ActivityResult=data;      
     
      this.toastr.success(this.ActivityResult);
     // this.Activity();
     this.Activity.ActivityName=null;
     this.Activity.ActivityId=0;
     this.Activity.TeamId=0;
     this.Activity.ModifiedBy=0;
     this.Activity.FromDate=null;
     this.Activity.ToDate=null;
     this.Activity.ActivityPlace=null;
     this.Activity.ActivityDetails=null;
     this.btnSave=true;
     this.btnUpdate=false;

      this.GetMDActivityDetails()
      this.spinner.hide();
            },error=>{this.error=error
            this.spinner.hide();
            this.toastr.error(this.error.error);
       
     
     })
    }
  }
//#endregion

//#region Insert record
public formData;
ActivityRegister(form:NgForm)
{
  var c=confirm("Are you Sure To Add this Activity??");
  if(c==true)
    {
    this.formData = new FormData();
    /*     let remainingFiles = this.uploader.queue.filter(s => !s.isSuccess);  
      for (let item of remainingFiles) {    
      if (item.id == null)
        return;
        let selectedFile = this.uploader.queue.find(s => s.id == item.id);
        if (selectedFile) {
        
          this.formData.append(selectedFile.file.name, selectedFile.file);  

        }
      } */
      this.formData.append('TeamId',parseInt(sessionStorage.getItem("TeamId")));  
      this.formData.append('CreatedBy',parseInt(sessionStorage.getItem("TeamType")));  
      this.formData.append('BlockId',parseInt(sessionStorage.getItem("BlockId")));  
      this.formData.append('ActivityName',$("#ActivityName").val());  
      this.formData.append('FromDate',$("#FromDate").val());  
      
      this.formData.append('ToDate',$("#ToDate").val());  
      this.formData.append('ActivityPlace',$("#ActivityPlace").val());     
      this.formData.append('ActivityDetails',$("#ActivityDetails").val());  

    this.spinner.show();  
    this.mangaldalService.InsertActivity(this.formData).subscribe((data:any)=>{
    this.ActivityResult=data; 
    this.GetMDActivityDetails();    
    form.resetForm();     
    
    this.GetMDActivityDetails()
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
//#region  Select 'Upload' Image
  onFilesChange(fileList: Array<File>) {
    for (let file of fileList) {
      this.uploader.queue.push(new UploadQueue(file));
    };  
  }
  onFileChange(event) {
    debugger
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader(); 
              reader.onload = (event:any) => {
              
                 this.images.push(event.target.result); 
                  console.log(event.target.result)
                 this.myForm.patchValue({
                    fileSource: this.images
                 });
              } 

          reader.readAsDataURL(event.target.files[i]);
      this.uploader.queue.push(new UploadQueue(event.target.files[i]));
      console.log('Total Count:' + this.uploader.queue.length); 
    }
  }
}
//#endregion

//#endregion

  
  cancelAll() {
    //TODO
  }

 //#region View image 
MDPhotoActlst:any;
ActivityUrl:any;
ActivityId:any;
GetMangaldalActivityPhoto(ActivityId)
{
  debugger
  this.ActivityId=ActivityId;
  this.spinner.show();
  this.mangaldalService.GetMangaldalActivityPhoto(this.ActivityId).subscribe(data=>{
    this.MDPhotoActlst=data;  
    $('#img2').append(
      $(document.createElement('button')).prop({
        type: 'button',
        innerHTML: 'Press me',
        class: 'btn-styled'
      })
    );
    this.ActivityUrl= AppComponent.MangalDalActivityUrl;
   /*  var img=AppComponent.MangalDalActivityUrl+this.MDPhotoActlst[0].image
    console.log(this.ActivityUrl)
    console.log(img) */
    this.rerender();
    this.spinner.hide();
    if(this.MDPhotoActlst.length==0)
    {
      this.toastr.error("No Record Found","Failed");
      $("#ImageModal").hide();      
      $(".modal-backdrop.show").css({"opacity": "0"});
      $(".modal-backdrop").css({"top": "auto","left": "auto"});
        this.spinner.hide(); 
    }
  },error=>{
    this.spinner.hide();
    this.toastr.error(error.error);
  },
  () => { this.spinner.hide(); }
  );
  this.spinner.hide();
}
//#endregion
AddMorePhoto(ActivityId)
 {
  this.ActivityId=ActivityId;
 }

 //#region Add More  image 
 
 MDPhotoActlst:any;
 ActivityUrl:any;
 ActivityId:any;
 activityimg:any;
 Activityfile:any;
 uploadAll(ActivityId)
 {
   debugger
   this.Activityfile = $("#file").val()
   if(this.Activityfile=="")
   {
    this.toastr.error("Please select Image");
   }
   else{
      var c=confirm("Are you Sure Want To Add image this Activity??");
      if(c==true)
        {
          this.formData = new FormData();
          let remainingFiles = this.uploader.queue.filter(s => !s.isSuccess);  
          for (let item of remainingFiles) {    
          if (item.id == null)
            return;
            let selectedFile = this.uploader.queue.find(s => s.id == item.id);
            if (selectedFile) {
            
              this.formData.append(selectedFile.file.name, selectedFile.file); 

            }
          }
            this.formData.append('CreatedBy',parseInt(sessionStorage.getItem("TeamId")));  
            this.formData.append('ActivityId',parseInt(ActivityId));  
            this.spinner.show();  
            this.mangaldalService.InsertImageActivity(this.formData,ActivityId).subscribe((data:any)=>{
            this.ActivityResult=data; 
            this.GetMDActivityDetails();     
            
            if(this.ActivityResult!=null)
            {
              this.toastr.success("Image Added Successfully");
            }
            this.rerender();
            $("img").remove()
            $('#file').val(null);
            $("#activityimg").val(null);
            $("#AddImage").hide();
            $(".modal-backdrop.show").css({"opacity": "0"});
            $(".modal-backdrop").css({"top": "auto","left": "auto"});
              this.spinner.hide();    
          },error=>{
            this.spinner.hide();
            this.toastr.error(error.error);
          })

        }
    }
  }
 //#endregion
 mdImageId:any
 ImageDelete(mdImageId){
  this.mdImageId=mdImageId;
  console.log(this.mdImageId);
  var c=confirm("Are you Sure Want To Add image this Activity??");
  if(c==true)
  {
    this.Activity.mdImageId=mdImageId;
    this.Activity.ModifiedBy=sessionStorage.getItem("TeamId");
    this.spinner.show();
    this.mangaldalService.DeleteMDActivityImage(this.Activity).subscribe(data=>{
    this.DeleteActivityResult=data;
    this.toastr.success("Image Deleted Successfully");
    $("#ImageModal").hide();
    $(".modal-backdrop.show").css({"opacity": "0"});
    $(".modal-backdrop").css({"top": "auto","left": "auto"});
    this.rerender();
    this.GetMDActivityDetails();
    this.spinner.hide();
  
    },error=>{
      this.error=error;
      this.spinner.hide();
      this.toastr.error(this.error.error);
    })
  }
}
}


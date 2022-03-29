import { Subject } from 'rxjs';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from './../../Service/master.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportService } from './../../Service/report.service';
import { DataTableDirective } from 'angular-datatables'; 

@Component({
  selector: 'app-duty-log-report',
  templateUrl: './duty-log-report.component.html',
  styleUrls: ['./duty-log-report.component.css']
})
export class DutyLogReportComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  totalReords:string
 page:number=1
 ServiceNo="";
 UserLoginId=parseInt(sessionStorage.getItem("UserLoginId"));
 

 error:any;
  constructor(private masterService:MasterService,private reportservice:ReportService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    //datatable js code
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

  }
  JawanDutyLoglist:any;
  dtTrigger=new Subject();
  dtOptions:any={};
  currentdistlist:any;
  ngAfterViewInit(){
    //Define datatable 
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getJawanDutyLogStatus(ServiceNo)
  { 
    this.spinner.show();
    this.reportservice.getJawanDutyLogStatus(ServiceNo).subscribe((data:any)=>{this.JawanDutyLoglist=data;
     this.spinner.hide();
     this.rerender();
     this.totalReords=this.JawanDutyLoglist.length;
    this.totalReords=this.JawanDutyLoglist.length;
    if(this.JawanDutyLoglist.length<0)
    {
      this.toastr.error("No Record Found","Failed");
    }
    
    },(error)=>{
      
      this.error=error
      this.spinner.hide();
    }
    )
  
   
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
}

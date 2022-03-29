import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from './../../../Service/report.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
dtTrigger=new Subject();
  constructor(private reportService:ReportService,private toastr:ToastrService,private spinner:NgxSpinnerService) { }
  dtOptions:any;
  ngOnInit(): void {
    this.GetReportDetail();
  }
  Jawanlist:any
  error:any;
GetReportDetail()
{
  this.spinner.show();
  var CompId=parseInt(sessionStorage.getItem("CompId"))
  var Flag=parseInt(sessionStorage.getItem("Flag"))
  if(Flag==1)
  {
    this.reportService.GetJawansByDistrict(CompId).subscribe((data:any)=>{
      this.spinner.hide();
       
          this.Jawanlist=data;
          this.spinner.hide();
          if(this.Jawanlist.length==0)
          {
        this.toastr.error("No Record Found");
          }
          this.dtTrigger.next();
      
      
        },(error)=>{
            
          this.error=error;
          this.spinner.hide();
        })
  }

  this.dtOptions = {
    dom: 'Bfrtip',
    
    select: true,
    responsive: true,
     pagingType: 'full_numbers',
     pageLength: 10,
     processing: true,
     buttons: [
      'colvis','copy', 'excel','print'
     ]
     
  
  };
  
  }
  

}

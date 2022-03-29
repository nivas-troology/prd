import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/Service/report.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-jawan-registration-summary',
  templateUrl: './jawan-registration-summary.component.html',
  styleUrls: ['./jawan-registration-summary.component.css']
})
export class JawanRegistrationSummaryComponent implements OnInit {

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
   public zoneid;
   public jwnRegSummaryList :any;
 
   constructor(private reportservice:ReportService,private spinner:NgxSpinnerService, private toastr: ToastrService) {
 
    }
 
   ngOnInit(): void {
     this.getJwnRegistrationSummaryLst();
     this.dtOptions = {
       dom : 'Bfrtip',
       pagingType: 'full_numbers',
    pageLength: 10,
       processing: true,
       buttons: [
         'excel','print'
       ],
       select: true,
       responsive: true,
     };
   }
   getJwnRegistrationSummaryLst(): void{
   this.zoneid= sessionStorage.getItem("ZoneId");  
   if(this.zoneid !== "null")
   {
     this.zoneid=parseInt(sessionStorage.getItem("ZoneId"));
   }
   else{
     this.zoneid=0;
   }
     this.spinner.show();
 
     this.reportservice.getJwnRegistrationSummaryLst(this.zoneid). subscribe(
       res => {
         this.jwnRegSummaryList = res
 
         this.rerender();
            },
       err => {
                  if (err.status === 500) {
                   this.toastr.error(err.error);
                  }
                  else if (err.status === 400) {
                   this.toastr.error(err.error);
                  }
                  else if (err.status === 409) {
                   this.toastr.error(err.error);
                  }
                  else if (err.status === 406) {
                   this.toastr.error(err.error);
                  }
                  else if (err.status === 302) {
                   this.toastr.error(err.error);
                 }
                
   
               },
       () => { this.spinner.hide();  console.log('HTTP request completed.'); }
     );
     this.spinner.hide();
   }

}

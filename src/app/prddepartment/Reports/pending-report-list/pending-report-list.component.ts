import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { ReportService } from 'src/app/Service/report.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-report-list',
  templateUrl: './pending-report-list.component.html',
  styleUrls: ['./pending-report-list.component.css']
})
export class PendingReportListComponent implements OnInit {
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
  public levelName;
  public zoneid;
  public MRoleId;
  public pendingList :any;

  constructor(private reportservice:ReportService,private spinner:NgxSpinnerService, private toastr: ToastrService) {

   }

  ngOnInit(): void {
    this.getPendingReportLst();
    this.dtOptions = {
      dom : 'Bfrtip',
      pagingType: 'full_numbers',
      paging: false,
      processing: true,
      buttons: [
        'excel','print'
      ],
      select: true,
      responsive: true,
      /* autoWidth: false,
      paging: false,
      order: [], */
      // for sum of table value---------------------------------------------------------------------------------------------------------
      footerCallback: function (row, data, start, end, display) {
        var api = this.api();
        const nb_cols = api.columns().nodes().length;
        var j = 1;
        while (j < nb_cols) {
            var pageTotal = api
                .column(j, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return Number(a) + Number(b);
                }, 0);


            // Update footer
            if (!isNaN(pageTotal))
                $(api.column(j).footer()).html(pageTotal);
            else
                $(api.column(j).footer()).html('');
            j++;
        }
      }
      //------------------------------------------------------------------------------------------------------------------------------
    };
  }
getPendingReportLst(): void{
  this.zoneid= sessionStorage.getItem("ZoneId");
  this.MRoleId=sessionStorage.getItem("MRoleId");
  if(this.MRoleId !== "null")
  {
    this.MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
  }
  else{
    this.MRoleId=0;
  }
  if(this.zoneid !== "null")
  {
    this.zoneid=parseInt(sessionStorage.getItem("ZoneId"));
  }
  else{
    this.zoneid=0;
  }
    this.spinner.show();

    this.reportservice.getPendingRTList(this.zoneid,this.MRoleId). subscribe(
      res => {
        this.levelName=res[0].levelName;
        this.pendingList = res

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

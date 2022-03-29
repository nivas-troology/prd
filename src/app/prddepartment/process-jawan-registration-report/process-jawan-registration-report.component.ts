import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { ReportService } from 'src/app/Service/report.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-process-jawan-registration-report',
  templateUrl: './process-jawan-registration-report.component.html',
  styleUrls: ['./process-jawan-registration-report.component.css']
})
export class ProcessJawanRegistrationReportComponent implements OnInit {
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;  
  public dtInstance: DataTables.Api;
  public dtOptions: any = {};
  public zoneid;
  public znid;
  dataTable: any;
  url = AppComponent.apiUrl + '/Login';  
  public dtTrigger: Subject<any> = new Subject();
  public resgistrationlist :any;
  constructor(private reportservice:ReportService,private spinner:NgxSpinnerService, private toastr: ToastrService) { 
    this.zoneid= sessionStorage.getItem("ZoneId");
    if(this.zoneid !== "null")
    {
      this.zoneid=parseInt(sessionStorage.getItem("ZoneId"));
    }
    else{
      this.zoneid=0;
    }
    
  }

  ngOnInit(): void {
    this.getResitrationLst();
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
    this.dtTrigger.next();
  }

   // tslint:disable-next-line: use-lifecycle-interface
   ngAfterViewInit(): void{
    // Define datatable
    this.dtTrigger.next();
  }

  // tslint:disable-next-line: use-lifecycle-interface
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

  getResitrationLst(): void{
    this.spinner.show();

   
    this.reportservice.getRegistrationLst(this.zoneid). subscribe(
      res => {
        this.resgistrationlist = res;
        this.rerender(); },
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
                 else if (err.status === 403) {
                  window.location.href = this.url;
                }
                else if (err.status === 401) {
                  window.location.href = this.url;
                }
  
              },
      () => { this.spinner.hide();  console.log('HTTP request completed.'); }
    );
    this.spinner.hide();
  }


}

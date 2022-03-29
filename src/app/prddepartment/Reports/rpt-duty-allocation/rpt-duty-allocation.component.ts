import { ReportService } from './../../../Service/report.service';
import { MasterService } from './../../../Service/master.service';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-rpt-duty-allocation',
  templateUrl: './rpt-duty-allocation.component.html',
  styleUrls: ['./rpt-duty-allocation.component.css']
})
export class RptDutyAllocationComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  FromDate = null;
  ToDate = null;
  ServiceNo = null;
  ThanaId = 0;
  SiteId = 0;
  dtOptions: any = {};
  dtTrigger = new Subject();
  ngAfterViewInit() {
    //Define datatable 
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  UserLoginId: any = parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId: any = parseInt(sessionStorage.getItem("MRoleId"));

  ZoneId: any = sessionStorage.getItem("ZoneId");
  DistId: any = sessionStorage.getItem("DistId");
  BlockId: any = sessionStorage.getItem("BlockId");
  constructor(
    private masterService: MasterService, 
    private toastr: ToastrService, 
    private spinner: NgxSpinnerService, 
    private ReportService: ReportService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.ReportService.GetDutyAllocation("", "", "", 0, 0, this.UserLoginId).subscribe(
      data => {
        this.dutylist = data;

        this.rerender();
        this.dtOptions = {
          dom: 'Bfrtip',

          select: true,
          responsive: true,
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          buttons: [
            'colvis', 'copy', 'excel', 'print'
          ]


        };
        this.spinner.hide();
      }, (error) => {

        this.error = error;
        this.spinner.hide();
      }
    )
    
    if (this.MRoleId == 2 || this.MRoleId == 3) {
      this.getZone(this.ZoneId);
    }
    else {
      this.getZone('');
    }
  }
  currentZonelist: any;
  getZone(zoneId) {
    this.spinner.show();
    this.masterService.getZone(zoneId).subscribe((data: any) => {
      this.currentZonelist = data;
      this.spinner.hide();
      if (this.MRoleId == 3) {
        this.getdistrict(this.currentZonelist[0].zoneId, this.DistId);
      }
    }, (error) => {

      this.error = error;
      this.spinner.hide();
    });
  }
  currentdistlist: any;
  error: any;
  getdistrict(zoneId, distId) {
    this.spinner.show();

    this.masterService.getDistrict(zoneId, distId).subscribe((data: any) => {
      this.currentdistlist = data;
      this.spinner.hide();
      if (this.MRoleId == 3) {
        this.getDutyPlace(this.currentdistlist[0].distId);
        this.getThana(this.currentdistlist[0].distId);
      }

    }, (error) => {

      this.error = error;
      this.spinner.hide();
    })

  }
  thanalist: any;
  getThana(distId) {
    this.spinner.show();
    this.masterService.getThana(distId).subscribe((data: any) => {
      this.thanalist = data;
      this.spinner.hide();

    }, (error) => {

      this.error = error;
      this.spinner.hide();
    });
  }

  dutyplacelist: any;
  getDutyPlace(distId) {
    this.spinner.show();
    this.masterService.GetSitesByDistrict(distId).subscribe((data: any) => {
      this.dutyplacelist = data;
      this.spinner.hide();
      console.log(this.dutyplacelist);
    }, (error) => {

      this.error = error;
      this.spinner.hide();
    });
  }

  dutylist: any;
  Search(FromDate, ToDate, ServiceNo, SiteId) {
    FromDate = $("#FromDate").val();
    ToDate = $("#ToDate").val();
    this.spinner.show();
    this.ReportService.GetDutyAllocation(FromDate, ToDate, ServiceNo, this.ThanaId, SiteId, this.UserLoginId).subscribe(
      data => {
        this.dutylist = data;
        this.rerender();

        if (this.dutylist.lengh == 0)
          this.toastr.error("No Record Found");

        this.spinner.hide();
      }, (error) => {

        this.error = error;
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

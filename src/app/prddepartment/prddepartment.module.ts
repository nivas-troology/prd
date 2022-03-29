import { from } from 'rxjs';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { RetirementReportComponent } from './retirement-report/retirement-report.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PRDDepartmentRoutingModule } from './prddepartment-routing.module';
import { PRDDepartmentComponent } from './prddepartment.component';

import { DashboredComponent } from './dashbored/dashbored.component';
import { PoliceStationComponent } from './police-station/police-station.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { JawanApprovalComponent } from './jawan-approval/jawan-approval.component';
import { JawanDetailsComponent } from './jawan-details/jawan-details.component';
import { BiodataComponent } from './biodata/biodata.component';
import { RptRegisteredJawanComponent } from './rpt-registered-jawan/rpt-registered-jawan.component';
import { AvalabilityfordutyComponent } from './avalabilityforduty/avalabilityforduty.component';
import { DutyallocationComponent } from './dutyallocation/dutyallocation.component';
import { DutySwappingComponent } from './duty-swapping/duty-swapping.component';

import { JawanTransferComponent } from './jawan-transfer/jawan-transfer.component';
import { JawanPunishmentComponent } from './jawan-punishment/jawan-punishment.component'
import { RegDrildownComponent } from './Reports/reg-drildown/reg-drildown.component';
import { ReportDetailComponent } from './Reports/report-detail/report-detail.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { WageCalculationComponent } from './wage-calculation/wage-calculation.component';
import { WageSettlementComponent } from './wage-settlement/wage-settlement.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { RptDutyAllocationComponent } from './Reports/rpt-duty-allocation/rpt-duty-allocation.component';
import { WagesReportComponent } from './Reports/wages-report/wages-report.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import {NgxPrintModule} from 'ngx-print';
import{HashLocationStrategy,LocationStrategy} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {ToastrModule} from 'ngx-toastr';
import {DataTablesModule} from 'angular-datatables';
import { MangalDalApprovalComponent } from './mangal-dal-approval/mangal-dal-approval.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PunishmentReportComponent } from './punishment-report/punishment-report.component';
import { MangaldalEntryComponent } from './mangaldal-entry/mangaldal-entry.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { DutyLogReportComponent } from './duty-log-report/duty-log-report.component';
import { BioDataReportComponent } from './bio-data-report/bio-data-report.component';
import { ManualDutyAllocationComponent } from './manual-duty-allocation/manual-duty-allocation.component';
import { ProcessJawanRegistrationReportComponent } from './process-jawan-registration-report/process-jawan-registration-report.component';
import { PendingReportListComponent } from './Reports/pending-report-list/pending-report-list.component';
import { NotificationComponent } from './notification/notification.component';
import { JawanRegistrationSummaryComponent } from './Reports/jawan-registration-summary/jawan-registration-summary.component';
import { HoJawanListComponent } from './ho-jawan-list/ho-jawan-list.component';
import { BlockMasterComponent } from './block-master/block-master.component';
import { DeleteDeathJawanComponent } from './delete-death-jawan/delete-death-jawan.component';
import { DeleteDeathJawanListComponent } from './delete-death-jawan-list/delete-death-jawan-list.component';
@NgModule({
  declarations: [PRDDepartmentComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    DashboredComponent,
    PoliceStationComponent,
    RegistrationComponent,
    UserComponent,
    JawanApprovalComponent,
    JawanDetailsComponent,
    BiodataComponent,
    RptRegisteredJawanComponent,
    AvalabilityfordutyComponent,
    DutyallocationComponent,
    DutySwappingComponent,
    JawanTransferComponent,
    JawanPunishmentComponent,
    RegDrildownComponent,
    ReportDetailComponent,
    AttendanceComponent,
    WageCalculationComponent,
    WageSettlementComponent,
    RptDutyAllocationComponent,
    WagesReportComponent,
    MangalDalApprovalComponent,
    PunishmentReportComponent,
    RetirementReportComponent,
    MangaldalEntryComponent,
    AttendanceReportComponent,
    DutyLogReportComponent,
    BioDataReportComponent,
    ManualDutyAllocationComponent,
    ProcessJawanRegistrationReportComponent,
    PendingReportListComponent,
    NotificationComponent,
    JawanRegistrationSummaryComponent,
    HoJawanListComponent,
    BlockMasterComponent,
    DeleteDeathJawanComponent,
    DeleteDeathJawanListComponent
  
  ],
  imports: [
    CommonModule,
    PRDDepartmentRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    NgxPrintModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    DataTablesModule,
    BackButtonDisableModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
})
export class PRDDepartmentModule { }

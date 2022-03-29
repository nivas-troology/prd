import { MangaldalEntryComponent } from './mangaldal-entry/mangaldal-entry.component';
import { RetirementReportComponent } from './retirement-report/retirement-report.component';
import { PunishmentReportComponent } from './punishment-report/punishment-report.component';

import { from } from 'rxjs';
import { AuthGuardService as AuthGuard } from './../Service/auth-guard.service';
import { WagesReportComponent } from './Reports/wages-report/wages-report.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PRDDepartmentComponent } from './prddepartment.component';

import { RptDutyAllocationComponent } from './Reports/rpt-duty-allocation/rpt-duty-allocation.component';
import { WageSettlementComponent } from './wage-settlement/wage-settlement.component';
import { WageCalculationComponent } from './wage-calculation/wage-calculation.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ReportDetailComponent } from './Reports/report-detail/report-detail.component';
import { RegDrildownComponent } from './Reports/reg-drildown/reg-drildown.component';
import { JawanPunishmentComponent } from './jawan-punishment/jawan-punishment.component';
import { JawanTransferComponent } from './jawan-transfer/jawan-transfer.component';
import { JawanApprovalComponent } from './jawan-approval/jawan-approval.component';
import { UserComponent } from './user/user.component';

import { RegistrationComponent } from './registration/registration.component';
import { PoliceStationComponent } from './police-station/police-station.component';
import { DashboredComponent } from './dashbored/dashbored.component';
import { JawanDetailsComponent } from './jawan-details/jawan-details.component';
import { RptRegisteredJawanComponent } from './rpt-registered-jawan/rpt-registered-jawan.component';
import { AvalabilityfordutyComponent } from './avalabilityforduty/avalabilityforduty.component';
import { DutyallocationComponent } from './dutyallocation/dutyallocation.component'
import { DutySwappingComponent } from './duty-swapping/duty-swapping.component';
import{HashLocationStrategy,LocationStrategy} from '@angular/common';
import { MangalDalApprovalComponent } from './mangal-dal-approval/mangal-dal-approval.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { DutyLogReportComponent } from './duty-log-report/duty-log-report.component';
import { BioDataReportComponent } from './bio-data-report/bio-data-report.component';
import { ManualDutyAllocationComponent } from './manual-duty-allocation/manual-duty-allocation.component';
import { ProcessJawanRegistrationReportComponent } from './process-jawan-registration-report/process-jawan-registration-report.component';
import{PendingReportListComponent} from './Reports/pending-report-list/pending-report-list.component';
import { MangalDalActivityComponent } from '../mangal-dal/mangal-dal-activity/mangal-dal-activity.component';
import { NotificationComponent } from './notification/notification.component';
import { JawanRegistrationSummaryComponent } from './Reports/jawan-registration-summary/jawan-registration-summary.component';
import { HoJawanListComponent } from './ho-jawan-list/ho-jawan-list.component';
import { BlockMasterComponent } from './block-master/block-master.component';
import { DeleteDeathJawanComponent } from './delete-death-jawan/delete-death-jawan.component';
import { DeleteDeathJawanListComponent } from './delete-death-jawan-list/delete-death-jawan-list.component';
const routes: Routes = [
  { path: '', component: PRDDepartmentComponent,children:[
    {path:'PRDDepartment',component:PRDDepartmentComponent},
  {path:'Dashboard',component:DashboredComponent},
  {path:'PoliceStation',component:PoliceStationComponent},
  {path:'Registration',component:RegistrationComponent},
  {path:'UserManagement',component:UserComponent},
  {path:'UserManagement',component:UserComponent},
  {path:'JawanApproval',component:JawanApprovalComponent},
  {path:'JawanDetails',component:JawanDetailsComponent},
  {path:'Registration/:AppNo',component:RegistrationComponent},
  {path:'RegisteredJawanReport',component:RptRegisteredJawanComponent},
  {path:'JawanAvailability',component:AvalabilityfordutyComponent},
  {path:'DutyAllocation',component:DutyallocationComponent},
  {path:'DutySwapping',component:DutySwappingComponent},
  {path:'JawanTransfer',component:JawanTransferComponent},
  {path:'JawanPunishment',component:JawanPunishmentComponent},
  {path:'RegReportLevelWise',component:RegDrildownComponent},
  {path:'ReportDetail',component:ReportDetailComponent},
  {path:'Attendance',component:AttendanceComponent},
  {path:'WageCalculation',component:WageCalculationComponent},
  {path:'WageSettlement',component:WageSettlementComponent},
  {path:'DutyAllocationReport',component:RptDutyAllocationComponent},
  {path:'WagesDetailsReport',component:WagesReportComponent},
  {path:'MangalDalApproval',component:MangalDalApprovalComponent},
  {path:'PunishmentReport',component:PunishmentReportComponent},
  {path:'RetirementReport',component:RetirementReportComponent},
  {path:'MangalDalEntry',component:MangaldalEntryComponent},
  {path:'AttendanceReport',component:AttendanceReportComponent},
  {path:'DutyLogReport',component:DutyLogReportComponent},
  {path:'BioDataReport',component:BioDataReportComponent},
  {path:'ManualDutyAllocation',component:ManualDutyAllocationComponent},
//------------------------------------------------------------------------------------------------------Sushma------------
  {path:'ProcessJawanRegistrationReport',component:ProcessJawanRegistrationReportComponent},
  {path:'PendingReport',component:PendingReportListComponent},
  
  {path:'MDActivities',component:MangalDalActivityComponent},
  {path:'Notification',component:NotificationComponent},
  {path:'JawanRegistrationSummary',component:JawanRegistrationSummaryComponent},
  {path:'HoJawanList',component:HoJawanListComponent},
  {path:'BlockMaster',component:BlockMasterComponent},
  {path:'DeleteDeathJawan',component:DeleteDeathJawanComponent},
  {path:'DeleteDeathJawanList',component:DeleteDeathJawanListComponent}
] },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class PRDDepartmentRoutingModule { }

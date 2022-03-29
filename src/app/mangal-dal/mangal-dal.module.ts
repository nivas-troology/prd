import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangalDalRoutingModule } from './mangal-dal-routing.module';
import { MangalDalComponent } from './mangal-dal.component';
import { MdheaderComponent } from './mdheader/mdheader.component';
import { MdfooterComponent } from './mdfooter/mdfooter.component';
import { MdOrgRegistrationComponent } from './md-org-registration/md-org-registration.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { CertificateComponent } from './certificate/certificate.component';
import {NgxPrintModule} from 'ngx-print';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { AddActivitiesComponent } from './add-activities/add-activities.component';
import { MangalDalActivityComponent } from './mangal-dal-activity/mangal-dal-activity.component';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [MangalDalComponent, MdheaderComponent, MdfooterComponent, MdOrgRegistrationComponent, MemberRegistrationComponent, AttachmentsComponent, CertificateComponent, AddActivitiesComponent, MangalDalActivityComponent],
  imports: [
    CommonModule,
    MangalDalRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxPrintModule,
    DataTablesModule,
    BackButtonDisableModule.forRoot()
  ]
})
export class MangalDalModule { }

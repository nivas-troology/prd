import { CertificateComponent } from './certificate/certificate.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MangalDalComponent } from './mangal-dal.component';
import { MdOrgRegistrationComponent } from './md-org-registration/md-org-registration.component';

import { AddActivitiesComponent } from './add-activities/add-activities.component';
import { MangalDalActivityComponent } from './mangal-dal-activity/mangal-dal-activity.component';
const routes: Routes = [{ path: '', component: MangalDalComponent,
children:[
  { path: 'MangalDal', component: MangalDalComponent},
  {path:'MangalDalRegistration',component:MdOrgRegistrationComponent},
  {path:'MemberRegistration',component:MemberRegistrationComponent},
  {path:'Attachments',component:AttachmentsComponent},
  {path:'Certificate',component:CertificateComponent},
  {path:'Activities',component:AddActivitiesComponent}
  
]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangalDalRoutingModule { }

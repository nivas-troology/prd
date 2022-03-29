import { MangaldalRegistrationComponent } from './mangaldal-registration/mangaldal-registration.component';

import { ReportComponent } from './report/report.component';
import { MangaldalloginComponent } from './mangaldallogin/mangaldallogin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
const routes: Routes = [

  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  { path: 'PRDDepartment', loadChildren: () => import('./prddepartment/prddepartment.module').then(m => m.PRDDepartmentModule) },
  { path: 'MangalDal', loadChildren: () => import('./mangal-dal/mangal-dal.module').then(m => m.MangalDalModule) },
  {path:'SignIn',component:MangaldalloginComponent},
  {path:'Report',component:ReportComponent},
  {path:'ChangePassword',component:ChangepasswordComponent},
  {path:'MangalDalRegistration',component:MangaldalRegistrationComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

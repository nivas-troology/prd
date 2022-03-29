import { MangalDalModule } from './mangal-dal/mangal-dal.module';
import { ReportComponent } from './report/report.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

import { PRDDepartmentModule } from './prddepartment/prddepartment.module';
//import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { LoginComponent } from './login/login.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {DataTablesModule} from 'angular-datatables';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
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
import { HomeComponent } from './home/home.component';
import { MangaldalRegistrationComponent } from './mangaldal-registration/mangaldal-registration.component';
import { MangaldalloginComponent } from './mangaldallogin/mangaldallogin.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MangaldalRegistrationComponent,
    MangaldalloginComponent,
    ReportComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    MangalDalModule,
    //BackButtonDisableModule.forRoot(),
    //PRDDepartmentModule
    NgMultiSelectDropDownModule.forRoot()

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

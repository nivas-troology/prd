import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { DutyServiceService } from './../../Service/duty-service.service';
import { MasterService } from './../../Service/master.service';
import { employee, empContact } from './../../Model/employee';
import { from } from 'rxjs';
import { Site } from '../../Model/master';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { dutyAllocation } from './../../Model/duty';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-dutyallocation',
  templateUrl: './dutyallocation.component.html',
  styleUrls: ['./dutyallocation.component.css']
})
export class DutyallocationComponent implements OnInit {
  UserLoginId: any = parseInt(sessionStorage.getItem("UserLoginId"));
  MRoleId: any = parseInt(sessionStorage.getItem("MRoleId"));

  ZoneId: any = parseInt(sessionStorage.getItem("ZoneId"));
  DistId: any = parseInt(sessionStorage.getItem("DistId"));
  BlockId: any = parseInt(sessionStorage.getItem("BlockId"));
  CompanyId: number;
  ServiceNo: any = null;

  totalReords: string;
  page: number = 1;
  rowCheck = false;
  site: Site = {
    SiteId: -1,
    SiteName: null,
    DistId: null,
    BlockId: null,
    ThanaId: null
  }
  dutyallocation: dutyAllocation = {
    DutyAllocationId: null,
    EmpId: null,
    DutyName: null,
    DutyType: "--Select--",
    DateFrom: null,
    DateTo: null,
    AllocatedOn: null,
    PromisorName: null,
    CreatedBy: null,
    ModifiedBy: null,
    ThanaId: null,
    BlockId: null,
    UserLoginId: null,
    SiteId: null,
    OtherSecurityDutyType: null
  }
  employee: employee =
    {
      EmpId: null,
      EmpName: null,
      EmpGender: "--Select--",
      EmpCaste: "--Select--",
      EmpDob: null,
      FatherName: null,
      MotherName: null,
      Height: null,
      EmpEdu: "--Select--",
      EmpDesigId: "--Select--",
      IdProof1Type: null,
      IdProof1No: null,
      IdProof1Pic: null,
      IdProof2Type: null,
      IdProof2No: null,
      IdProof2Pic: null,
      IdProof3Type: null,
      IdProof3No: null,
      IdProof3Pic: null,
      RegistrationStatus1: null,
      RegistrationRemarks1: null,
      RegistrationStatus2: null,
      RegistrationRemarks2: null,
      RegistrationStatusFinal: null,
      RegistrationRmarksFinal: null,
      EmpOfficialId: null,
      EmpPic: null,
      EmpSplSkill: "--Select--",
      Chest: null,
      CreatedBy: null,
      ModifiedBy: null,
      FileExtention1: null,
      FileExtention2: null,
      FileExtention3: null,
      FileExtention4: null,
      FileExtention5: null,
      BirthCerName: null,
      BirthCerNo: null,
      BirthCerPic: null,
      MroleId: null,
      UserLoginId: null,
      AadharNo: null,
      PanNo: null,
      OtherSplSkill: null,
      NominalRegNo: null,
      IsAvailableForDuty: null,
      OldServiceNo: null,
      Status: null,
      NewJawanStatus: null,
      TransCert: null,
      FileExtention6: null,
      IsTrained: null
    }
  empcontact: empContact = {

    EmpContactId: null,
    EmpId: null,
    ResidanceAddress: null,
    ResidanceDistId: "--Select--",
    ResidanceCityId: null,
    ResidanceMobile1: null,
    ResidanceEmpEmail: null,
    ResidanceEmpMohalla: null,
    ResidanceEmpPoliceStation: null,
    CurrentDistId: "--Select--",
    CurrentCityId: null,
    CurrentAddress: null,
    CurrentCompanyId: "--Select--",

    CurrentMobile1: null,
    CurrentEmpEmail: null,
    CurrentEmpMohalla: null,
    ResidanceBlockId: "--Select--",
    ResidanceThanaId: "--Select--",
    CurrentBlockId: "--Select--",
    CurrentThanaId: "--Select--",
    CreatedBy: null,
    ModifiedBy: null,
    residanceTypePerm: "Urban",
    residanceTypeCurrent: "Urban",
    CurrentEmpPoliceStation: null,
    ResidanceCompanyId: "--Select--",
    ResidancePincode: null,
    ResidanceZoneId: "--Select--",
    CurrentPincode: null,
    CurrentZoneId: "--Select--",
    empChkAddress: "Yes",
    MroleId: null,
    UserLoginId: null
  }


  dropdownList = [];
  selectedItems: any = [];
  thanalist: any;
  constructor(private masterService: MasterService, private DutyServiceService: DutyServiceService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  dropdownSettings: IDropdownSettings;
  ngOnInit(): void {
    this.getZone(this.ZoneId);
    //this.GetSites();

  }

  currentZonelist: any;
  getZone(zoneId) {
    this.masterService.getZone(zoneId).subscribe((data: any) => {
      this.currentZonelist = data;
      if (this.MRoleId == 2 || this.MRoleId == 3) {
        this.empcontact.CurrentZoneId = this.currentZonelist[0].zoneId;
      }
      if (this.MRoleId == 3) {
        this.getdistrict(this.currentZonelist[0].zoneId, this.DistId);
      }
      else if (this.MRoleId == 2) {
        this.getdistrict(this.empcontact.CurrentZoneId, '');
      }

    });


  }
  currentdistlist: any;
  getdistrict(zoneId, distId) {
    this.masterService.getDistrict(zoneId, distId).subscribe((data: any) => {
      this.currentdistlist = data;
      if (this.MRoleId == 3) {
        this.empcontact.CurrentDistId = this.currentdistlist[0].distId;
        //this.getBlock(this.currentdistlist[0].distId);
        this.getThana(this.currentdistlist[0].distId);

      }

    })

  }
  // blocklst:any;
  // getBlock(distId)
  // {
  //   this.masterService.getBlock(distId).subscribe((data:any)=>{this.blocklst=data;})

  // }

  getThana(distId) {
    this.masterService.getThana(distId).subscribe((data: any) => {
      this.thanalist = data;

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'thanaId',
        textField: 'thanaName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 10,
        allowSearchFilter: true
      };
    });
  }
  Count = 1;
  onItemSelect(item: any) {
    console.log(item);
    //item.DistId=this.DistId;
    if (this.selectedItems.length > 0) {
      var obj = this.selectedItems.find(items => items.thanaId === item.thanaId);
      if (obj != null) {
        return false;
      }

    }
    this.selectedItems.push(item);
    console.log(this.selectedItems);

  }
  OnItemDeSelect(item: any) {
    console.log(item);
    this.selectedItems = this.selectedItems.filter(Item => Item.thanaId !== item.thanaId);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
  //Get Jawan For Duty
  Jawanlist: any = [];
  JawanlistByThana: any = [];
  error: any;

  GetAvailableJawanForDuty() {
    if (this.selectedItems == null || this.selectedItems.length == 0) {
      this.toastr.error("कृपया थाना चुनें");
      return false;
    }
    this.Jawanlist = [];
    this.spinner.show();
    this.DutyServiceService.GetAvailableJawanForDuty(this.selectedItems).subscribe((data: any) => {
      this.JawanlistByThana = data;
      for (var i = 0; i < this.JawanlistByThana.length; i++) {
        for (var j = 0; j < this.JawanlistByThana[i].length; j++) {
          this.Jawanlist.push(this.JawanlistByThana[i][j]);
        }
      }
      //this.Jawanlist=this.Jawanlist.filter(jawan=>jawan.totalDays>89);
      if (this.Jawanlist.length == 0) {
        this.toastr.error("No Record Found", "Failed");
      }
      this.spinner.hide();
    }, (error) => {

      this.error = error
      this.spinner.hide();
    }
    )






  }
  GetAvailableJawanForDutyByServiceNo(ServiceNo) {
    this.Jawanlist = [];
    if (ServiceNo == null || ServiceNo == "") {
      this.toastr.error("कृपया सर्विस नं0 भरें");
      return false;
    }
    this.spinner.show();
    this.DutyServiceService.GetAvailableJawanForDutyByServiceNo(this.DistId, ServiceNo).subscribe(
      data => {
        this.Jawanlist = data;
        this.spinner.hide();
      }
      , error => {
        this.error = error;
        this.spinner.hide();
        this.toastr.error(this.error.error);
      }
    )
  }
  bulkList: any = [];
  bulkCheck(e) {
    if (e.target.checked) {
      this.rowCheck = true;
      for (let i = 0; i < this.Jawanlist.length; i++) {
        this.PushDataBulkForDuty(this.Jawanlist[i].empId);
      }

    }
    else {
      this.rowCheck = false;
      this.bulkList = null;
    }
  }
  JawanSelectedList: any = [];
  PushDataBulkForDuty(empId) {

    var dutyObj = {

      EmpId: null,
      DutyName: null,
      DutyType: null,
      DateFrom: null,
      DateTo: null,
      AllocatedOn: null,
      PromisorName: null,
      CreatedBy: null,
      ModifiedBy: null,
      ThanaId: null,
      BlockId: null,
      UserLoginId: null,
      SiteId: null,
      DutyAllotmentAction: null,
      OtherSecurityDutyType: null
    };
    var obj = this.Jawanlist.find(EmpId => EmpId.empId === empId);
    obj.DutyAllotmentAction = (this.ServiceNo == null || this.ServiceNo == "" ? "Automatic" : "Manual");


    dutyObj.UserLoginId = this.UserLoginId;
    dutyObj.EmpId = empId;
    if (this.empcontact.CurrentBlockId == "--Select--") {
      dutyObj.BlockId = -1;
    }
    else {
      dutyObj.BlockId = parseInt(this.empcontact.CurrentBlockId);
    }
    if (this.empcontact.CurrentThanaId == "--Select--") {
      dutyObj.ThanaId = -1;
    }
    else {
      dutyObj.ThanaId = parseInt(this.empcontact.CurrentThanaId);
    }

    dutyObj.SiteId = this.site.SiteId;
    obj.SiteName = this.siteList.find(Id => Id.siteId === parseInt(dutyObj.SiteId)).siteName;
    dutyObj.PromisorName = this.dutyallocation.PromisorName;
    dutyObj.DutyType = this.dutyallocation.DutyType;
    if (this.dutyallocation.DutyType == "OTHER SECURITY DUTY") {
      dutyObj.OtherSecurityDutyType = this.dutyallocation.OtherSecurityDutyType;
    }
    else {
      dutyObj.OtherSecurityDutyType = null;
    }
    dutyObj.DateFrom = ($("#DateFrom").val()).toString();
    dutyObj.DateTo = ($("#DateTo").val()).toString();
    dutyObj.AllocatedOn = ($("#AllocatedOn").val()).toString();
    dutyObj.DutyAllotmentAction = (this.ServiceNo == null || this.ServiceNo == "" ? "Automatic" : "Manual");
    if (this.rowCheck == true) {
      this.bulkList.push(dutyObj);
      this.JawanSelectedList.push(obj);
    }
    else {
      this.bulkList.pop(dutyObj);
      this.JawanSelectedList.pop(obj);
    }

  }

  PushDataForDuty(empId) {

    var dutyObj = {

      EmpId: null,
      DutyName: null,
      DutyType: null,
      DateFrom: null,
      DateTo: null,
      AllocatedOn: null,
      PromisorName: null,
      CreatedBy: null,
      ModifiedBy: null,
      ThanaId: null,
      BlockId: null,
      UserLoginId: null,
      SiteId: null,
      DutyAllotmentAction: null,
      OtherSecurityDutyType: null
    };
    var obj = this.Jawanlist.find(EmpId => EmpId.empId === empId);
    obj.DutyAllotmentAction = (this.ServiceNo == null || this.ServiceNo == "" ? "Automatic" : "Manual");

    dutyObj.UserLoginId = this.UserLoginId;
    dutyObj.EmpId = empId;
    if (this.empcontact.CurrentBlockId == "--Select--") {
      dutyObj.BlockId = -1;
    }
    else {
      dutyObj.BlockId = parseInt(this.empcontact.CurrentBlockId);
    }
    if (this.empcontact.CurrentThanaId == "--Select--") {
      dutyObj.ThanaId = -1;
    }
    else {
      dutyObj.ThanaId = parseInt(this.empcontact.CurrentThanaId);
    }

    dutyObj.SiteId = this.site.SiteId;
    obj.SiteName = this.siteList.find(Id => Id.siteId === parseInt(dutyObj.SiteId)).siteName;
    dutyObj.PromisorName = this.dutyallocation.PromisorName;
    dutyObj.DutyType = this.dutyallocation.DutyType;
    if (this.dutyallocation.DutyType == "OTHER SECURITY DUTY") {
      dutyObj.OtherSecurityDutyType = this.dutyallocation.OtherSecurityDutyType;
    }
    else {
      dutyObj.OtherSecurityDutyType = null;
    }
    dutyObj.DateFrom = ($("#DateFrom").val()).toString();
    dutyObj.DateTo = ($("#DateTo").val()).toString();
    dutyObj.AllocatedOn = ($("#AllocatedOn").val()).toString();
    dutyObj.DutyAllotmentAction = (this.ServiceNo == null || this.ServiceNo == "" ? "Automatic" : "Manual");
    if ($("#empCheck_" + empId).prop("checked") == true) {
      this.bulkList.push(dutyObj);
      this.JawanSelectedList.push(obj);
    }
    else {
      this.bulkList.pop(dutyObj);
      this.JawanSelectedList.push(obj);
    }

  }
  ////Site
  siteList: any;
  siteresult: any;
  Addsite() {
    this.spinner.show();
    this.site.DistId = this.DistId;
    this.site.BlockId = parseInt(this.empcontact.CurrentBlockId);
    this.site.ThanaId = parseInt(this.empcontact.CurrentThanaId);
    this.masterService.Addsite(this.site).subscribe((data: any) => {
      this.siteresult = data;
      this.spinner.hide();
      if (this.siteresult > 0) {
        this.toastr.success("Site Added Successfully", "Success");
        this.site = {
          SiteId: -1,
          SiteName: null,
          DistId: null,
          BlockId: null,
          ThanaId: null
        }
        this.GetSites();
      }
    }, (error) => {

      this.error = error
      this.spinner.hide();
    })
  }
  //Get Sites
  GetSites() {

    this.masterService.GetSites(parseInt(this.empcontact.CurrentThanaId)).subscribe((data: any) => { this.siteList = data; })
  }
  dutyAllocationResult: any;
  DutyAllocation(form: NgForm) {
    var c = confirm("Are You Sure Want To Allocate?");
    if (c == true) {
      this.spinner.show();
      this.DutyServiceService.DutyAllocation(this.bulkList).subscribe((data: any) => {
        this.dutyAllocationResult = data;
        this.spinner.hide();
        if (this.dutyAllocationResult > 0) {
          this.toastr.success("Duty Allocated Successfully", "Success");
          this.bulkList = [];
          this.rowCheck = false;
          // this.dutyallocation={
          //   DutyAllocationId:null,
          //   EmpId:null,
          //   DutyName:null,
          //   DutyType:"--Select--",
          //   DateFrom:null,
          //   DateTo:null,
          //   AllocatedOn:null,
          //   PromisorName:null,
          //   CreatedBy:null,
          //   ModifiedBy:null,
          //   ThanaId:null,
          //   BlockId:null,
          //   UserLoginId:null,
          //   SiteId:null
          //  }
          form.resetForm();
          this.site = {
            SiteId: -1,
            SiteName: null,
            DistId: null,
            BlockId: null,
            ThanaId: null
          }
          this.empcontact.CurrentThanaId = "--Select--";
          this.dutyallocation.DutyType = "--Select--";
          this.dutyallocation.OtherSecurityDutyType = null;
          //this.GetAvailableJawanForDuty();
          this.onDeSelectAll(this.selectedItems);
          this.selectedItems = [];
          this.ServiceNo = "";
          this.DutyFinalList = [];

        }
        else {
          this.toastr.error("Some Error Occurred", "Failed");
        }
      }, (error) => {

        this.error = error
        this.spinner.hide();
      })
    }

  }

  //Get Previous Duties
  PreviuseDutylst: any;
  GetPrevioustDuties() {
    this.spinner.show();
    this.DutyServiceService.GetPrevioustDuties(this.site.SiteId).subscribe((data: any) => { this.PreviuseDutylst = data; this.spinner.hide(); }, (error) => {

      this.error = error;
      this.spinner.hide();
    })
  }

  ////Add Final list For Duty
  totalFinalList: any;
  DutyFinalList: any = [];
  AddFinallistForDuty() {
    var c = confirm("Do you want to add these Jawans finally for duty??");
    if (c == true) {
      for (var i = 0; i < this.JawanSelectedList.length; i++) {
        this.DutyFinalList.push(this.JawanSelectedList[i]);
      }
      this.totalFinalList = this.DutyFinalList;
      this.JawanSelectedList = [];
      this.Jawanlist = [];
      if (this.ServiceNo != null || this.ServiceNo != "") {
        this.ServiceNo = "";
      }
      //this.selectedItems=[];
    }
  }

}

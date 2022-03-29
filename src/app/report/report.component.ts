import { TableReport } from './../Model/employee';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistrationService } from './../Service/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';

import * as $ from 'jquery';
  import { Subject } from 'rxjs';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private route:ActivatedRoute,private regservice:RegistrationService,private spinner:NgxSpinnerService,private toastr:ToastrService) { }
  Jawanlist:TableReport;
  dtTrigger = new Subject();
  ZoneId:any=parseInt(sessionStorage.getItem("zoneId"));
  DistId:any=parseInt(sessionStorage.getItem("distId"));
  BlockId:any=sessionStorage.getItem("blockId")=="null"?0:parseInt(sessionStorage.getItem("blockId"));
  CompanyId:any=sessionStorage.getItem("companyId")=="null"?0:parseInt(sessionStorage.getItem("companyId"));
  ServiceNo:any=sessionStorage.getItem("serviceNo");
  Status:any=sessionStorage.getItem("status");
  Gender:any=sessionStorage.getItem("gender");
  EmpSkill:any=sessionStorage.getItem("empSkill");
  EmpCaste:any=sessionStorage.getItem("empCaste");
  residanceTypeCurrent=sessionStorage.getItem("residanceTypeCurrent");
  ReportHeaderName="";
   dtOptions: any = {};
  public data=[];
  
  ngOnInit(): void {
    // this.dtOptions = {
    //   dom: 'Bfrtip',
    //   buttons: [
    //     'print',
    //     'excel',
    //     'csv',
    //     'colvis',
    //     'copy',
    //   ],
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    //   select: true,
    //   responsive: true
    // };
    this.spinner.show()
    this.regservice.GetRegisterdJawans(this.ZoneId,this.DistId,this.BlockId,this.CompanyId,this.ServiceNo,this.Status,this.Gender,this.EmpSkill,this.EmpCaste,this.residanceTypeCurrent).subscribe((data:any)=>{this.Jawanlist=data;
           this.spinner.hide();
           this.dtTrigger.next();
         if(this.Status=="Old")
         {
           this.ReportHeaderName="पुराने जवानों  की लिस्ट";
         }
         else if(this.Status=="New")
         {
           this.ReportHeaderName="नए जवानों की लिस्ट";
         }
         else if(this.Gender!="null")
         {
           this.ReportHeaderName=this.Gender=="MALE"?"पुरुष जवानों की लिस्ट " :"महिला जवानों की लिस्ट";
         }
         else if(this.residanceTypeCurrent!="null")
         {
           this.ReportHeaderName=this.residanceTypeCurrent=="Urban"?"शहरी जवानों की लिस्ट " :"ग्रामीण जवानों की लिस्ट";
         }
         else if(this.EmpSkill!="null")
         {
           this.ReportHeaderName=this.EmpSkill+" जवानों की लिस्ट ";
         }
         else if(this.EmpCaste!="null")
         {
           this.ReportHeaderName=this.EmpCaste+" जवानों की लिस्ट";
         }
         else
         {
           this.ReportHeaderName="सभी जवानों की लिस्ट";
         }
     

           data=this.Jawanlist;
      if(this.Jawanlist==null)
    {
              this.toastr.error("No Record Found","Failed");
       }   
    }
    )
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true

    // }
       this.dtOptions = {
      dom: 'Bfrtip',
      
      select: true,
      responsive: true,
       pagingType: 'full_numbers',
       pageLength: 10,
       processing: true,
       buttons: [
        'colvis',
        'copy',
         'excel',
         {
          extend: 'print',
          text: 'Print',
          autoPrint: false,
          exportOptions: {
              columns: ':visible',
          },
          customize: function (win) {
          
              $(win.document.body).find('table').addClass('display').css('font-size', '12px').css('font-family','Times New Roman');
            
          }
      }
         
       ]
       
  
    };
    
  }

}



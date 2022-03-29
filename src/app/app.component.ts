import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
  title = 'prdUI';
 public static apiUrl="http://localhost:50914/api/";
/*  public static MemberDocURl="http://localhost:50914/MemberDocument/"
 public static MangalDalDocURL="http://localhost:50914/MangalDalDocument/"
 public static MangalDalActivityUrl="http://localhost:50914/Upload/" */
 //public static documentUrl="http://localhost:50914/Document/"; 
 //public static TrainingCertificateUrl="http://localhost:50914/TrainingCertificate/";

    //public static apiUrl="http://10.135.24.172/PRD/PRDService/api/";

  //public static apiUrl="https://prdapp.azurewebsites.net/api/";


//public static apiUrl="http://prd.data-center.co.in/PRDService/api/"
public static MemberDocURl="http://prd.data-center.co.in/prdservice/MemberDocument/"
 public static MangalDalDocURL="http://prd.data-center.co.in/prdservice/MangalDalDocument/"
 public static MangalDalActivityUrl="http://prd.data-center.co.in/prdservice/Upload/"
 public static documentUrl="http://prd.data-center.co.in/prdservice/Document/";
public static TrainingCertificateUrl="http://prd.data-center.co.in/prdservice/TrainingCertificate/";

  // public static apiUrl="http://prdtest.data-center.co.in/PRDService/api/"
  // public static MemberDocURl="http://prdtest.data-center.co.in/prdservice/MemberDocument/"
  // public static MangalDalDocURL="http://prdtest.data-center.co.in/prdservice/MangalDalDocument/"
  // public static MangalDalActivityUrl="http://prdtest.data-center.co.in/prdservice/Upload/"
  // public static documentUrl="http://prdtest.data-center.co.in/prdservice/Document/";
  // public static TrainingCertificateUrl="http://prdtest.data-center.co.in/prdservice/TrainingCertificate/";

}

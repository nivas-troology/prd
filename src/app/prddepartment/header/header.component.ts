import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as AdminLte from 'admin-lte';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
PersonName:any=sessionStorage.getItem("PersonName");
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  SideBarToggle()
  {
    AdminLte.  PushMenu._jQueryInterface.call($(this), 'toggle');
  }
 Logout()
{
  debugger;
  sessionStorage.setItem("UserLoginId",null);
  sessionStorage.setItem("MRoleId",null);
  sessionStorage.setItem("PersonName",null);
  sessionStorage.setItem("ZoneId",null);
  sessionStorage.setItem("DistId",null);
  sessionStorage.setItem("BlockId",null);
  sessionStorage.setItem("UserName",null);
  sessionStorage.setItem("UserPassword",null);
  sessionStorage.setItem("UserToken",null);  
  sessionStorage.setItem("Expiration",null);
  this.router.navigateByUrl('/Login');
}
}

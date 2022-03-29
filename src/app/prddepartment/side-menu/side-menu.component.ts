import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
import { MasterService } from 'src/app/Service/master.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  MRoleId: any
  distId: any
  isEnabled = true;
  error: any;
  constructor(
    private masterService: MasterService) { }

  ngOnInit(): void {
    this.MRoleId=parseInt(sessionStorage.getItem("MRoleId"));
    if (this.MRoleId == 3) {
      this.distId = parseInt(sessionStorage.getItem('DistId'));
      this.masterService.GetRegistrationDisabled(this.distId).subscribe(
        (data: any) => {
          (this.isEnabled = data)
         
        },
        (error) => {
          this.error = error;
        }
      );
    }
    console.log(this.MRoleId);
    
    //AdminLte.PushMenu._jQueryInterface.call($('[data-widget="pushmenu"]'));
  }

ngAfterViewInit() {
  $('[data-widget="treeview"]').each(function() {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
     // AdminLte.Layout._jQueryInterface.call($('body'));
      
  });
 
}
 // "node_modules/admin-lte/plugins/jquery/jquery.js",

}

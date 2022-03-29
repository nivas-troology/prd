import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.css']
})
export class BiodataComponent implements OnInit {

  constructor() { }
@Input() data:any;
  ngOnInit(): void {
  }

}

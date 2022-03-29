import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioDataReportComponent } from './bio-data-report.component';

describe('BioDataReportComponent', () => {
  let component: BioDataReportComponent;
  let fixture: ComponentFixture<BioDataReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioDataReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

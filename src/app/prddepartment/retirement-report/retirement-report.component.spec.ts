import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementReportComponent } from './retirement-report.component';

describe('RetirementReportComponent', () => {
  let component: RetirementReportComponent;
  let fixture: ComponentFixture<RetirementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

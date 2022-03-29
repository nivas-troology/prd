import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyLogReportComponent } from './duty-log-report.component';

describe('DutyLogReportComponent', () => {
  let component: DutyLogReportComponent;
  let fixture: ComponentFixture<DutyLogReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyLogReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

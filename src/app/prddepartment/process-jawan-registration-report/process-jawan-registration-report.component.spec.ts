import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessJawanRegistrationReportComponent } from './process-jawan-registration-report.component';

describe('ProcessJawanRegistrationReportComponent', () => {
  let component: ProcessJawanRegistrationReportComponent;
  let fixture: ComponentFixture<ProcessJawanRegistrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessJawanRegistrationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessJawanRegistrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

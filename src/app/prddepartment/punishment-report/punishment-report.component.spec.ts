import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunishmentReportComponent } from './punishment-report.component';

describe('PunishmentReportComponent', () => {
  let component: PunishmentReportComponent;
  let fixture: ComponentFixture<PunishmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunishmentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PunishmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

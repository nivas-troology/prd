import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReportListComponent } from './pending-report-list.component';

describe('PendingReportListComponent', () => {
  let component: PendingReportListComponent;
  let fixture: ComponentFixture<PendingReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

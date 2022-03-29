import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangalDalApprovalComponent } from './mangal-dal-approval.component';

describe('MangalDalApprovalComponent', () => {
  let component: MangalDalApprovalComponent;
  let fixture: ComponentFixture<MangalDalApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangalDalApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangalDalApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

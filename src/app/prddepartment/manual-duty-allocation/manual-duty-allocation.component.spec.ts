import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDutyAllocationComponent } from './manual-duty-allocation.component';

describe('ManualDutyAllocationComponent', () => {
  let component: ManualDutyAllocationComponent;
  let fixture: ComponentFixture<ManualDutyAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualDutyAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDutyAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

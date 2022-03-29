import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PRDDepartmentComponent } from './prddepartment.component';

describe('PRDDepartmentComponent', () => {
  let component: PRDDepartmentComponent;
  let fixture: ComponentFixture<PRDDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PRDDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PRDDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangalDalComponent } from './mangal-dal.component';

describe('MangalDalComponent', () => {
  let component: MangalDalComponent;
  let fixture: ComponentFixture<MangalDalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangalDalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangalDalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

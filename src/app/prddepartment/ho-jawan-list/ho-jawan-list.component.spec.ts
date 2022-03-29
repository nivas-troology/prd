import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoJawanListComponent } from './ho-jawan-list.component';

describe('HoJawanListComponent', () => {
  let component: HoJawanListComponent;
  let fixture: ComponentFixture<HoJawanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoJawanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoJawanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

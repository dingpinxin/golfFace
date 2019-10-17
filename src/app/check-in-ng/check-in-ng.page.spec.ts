import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInNgPage } from './check-in-ng.page';

describe('CheckInNgPage', () => {
  let component: CheckInNgPage;
  let fixture: ComponentFixture<CheckInNgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInNgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInNgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

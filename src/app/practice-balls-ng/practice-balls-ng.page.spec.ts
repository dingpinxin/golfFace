import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeBallsNgPage } from './practice-balls-ng.page';

describe('PracticeBallsNgPage', () => {
  let component: PracticeBallsNgPage;
  let fixture: ComponentFixture<PracticeBallsNgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeBallsNgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeBallsNgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

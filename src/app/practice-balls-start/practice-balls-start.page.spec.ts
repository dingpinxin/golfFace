import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeBallsStartPage } from './practice-balls-start.page';

describe('PracticeBallsStartPage', () => {
  let component: PracticeBallsStartPage;
  let fixture: ComponentFixture<PracticeBallsStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeBallsStartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeBallsStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

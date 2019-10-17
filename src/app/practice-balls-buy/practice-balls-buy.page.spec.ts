import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeBallsBuyPage } from './practice-balls-buy.page';

describe('PracticeBallsBuyPage', () => {
  let component: PracticeBallsBuyPage;
  let fixture: ComponentFixture<PracticeBallsBuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeBallsBuyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeBallsBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

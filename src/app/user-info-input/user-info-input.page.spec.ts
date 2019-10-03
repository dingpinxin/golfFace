import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoInputPage } from './user-info-input.page';

describe('UserInfoInputPage', () => {
  let component: UserInfoInputPage;
  let fixture: ComponentFixture<UserInfoInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoInputPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

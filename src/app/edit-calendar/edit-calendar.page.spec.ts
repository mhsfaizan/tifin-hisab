import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalendarPage } from './edit-calendar.page';

describe('EditCalendarPage', () => {
  let component: EditCalendarPage;
  let fixture: ComponentFixture<EditCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCalendarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

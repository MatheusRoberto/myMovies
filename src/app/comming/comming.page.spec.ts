import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingPage } from './comming.page';

describe('CommingPage', () => {
  let component: CommingPage;
  let fixture: ComponentFixture<CommingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

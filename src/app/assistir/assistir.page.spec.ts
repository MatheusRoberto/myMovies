import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistirPage } from './assistir.page';

describe('AssistirPage', () => {
  let component: AssistirPage;
  let fixture: ComponentFixture<AssistirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidoPage } from './assistido.page';

describe('AssistidoPage', () => {
  let component: AssistidoPage;
  let fixture: ComponentFixture<AssistidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

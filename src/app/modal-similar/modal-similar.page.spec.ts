import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSimilarPage } from './modal-similar.page';

describe('ModalSimilarPage', () => {
  let component: ModalSimilarPage;
  let fixture: ComponentFixture<ModalSimilarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSimilarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSimilarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

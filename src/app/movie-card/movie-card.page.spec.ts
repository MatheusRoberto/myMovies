import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardPage } from './movie-card.page';

describe('MovieCardPage', () => {
  let component: MovieCardPage;
  let fixture: ComponentFixture<MovieCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

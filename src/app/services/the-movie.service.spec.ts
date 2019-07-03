import { TestBed } from '@angular/core/testing';

import { TheMovieService } from './the-movie.service';

describe('TheMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheMovieService = TestBed.get(TheMovieService);
    expect(service).toBeTruthy();
  });
});

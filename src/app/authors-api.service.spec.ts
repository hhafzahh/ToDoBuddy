import { TestBed } from '@angular/core/testing';

import { AuthorsAPIService } from './authors-api.service';

describe('AuthorsAPIService', () => {
  let service: AuthorsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

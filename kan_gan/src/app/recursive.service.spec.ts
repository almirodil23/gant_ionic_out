import { TestBed } from '@angular/core/testing';

import { RecursiveService } from './recursive.service';

describe('RecursiveService', () => {
  let service: RecursiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

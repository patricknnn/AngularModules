import { TestBed } from '@angular/core/testing';

import { CodApiService } from './cod-api.service';

describe('CodApiService', () => {
  let service: CodApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

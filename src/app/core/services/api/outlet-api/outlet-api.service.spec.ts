import { TestBed } from '@angular/core/testing';

import { OutletApiService } from './outlet-api.service';

describe('OutletApiService', () => {
  let service: OutletApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutletApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

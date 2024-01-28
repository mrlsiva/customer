import { TestBed } from '@angular/core/testing';

import { MerchantApiService } from './merchant-api.service';

describe('MerchantApiService', () => {
  let service: MerchantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommonLoggerService } from './common-logger.service';

describe('CommonLoggerService', () => {
  let service: CommonLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

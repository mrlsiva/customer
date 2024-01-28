import { TestBed } from '@angular/core/testing';

import { ProfileVerifyGuard } from './profile-verify.guard';

describe('ProfileVerifyGuard', () => {
  let guard: ProfileVerifyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileVerifyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

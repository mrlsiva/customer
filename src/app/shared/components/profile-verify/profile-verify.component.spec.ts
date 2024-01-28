import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVerifyComponent } from './ProfileVerifyComponent';

describe('ProfileVerifyComponent', () => {
  let component: ProfileVerifyComponent;
  let fixture: ComponentFixture<ProfileVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

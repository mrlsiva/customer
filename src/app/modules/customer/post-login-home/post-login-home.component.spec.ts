import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoginHomeComponent } from './post-login-home.component';

describe('PostLoginHomeComponent', () => {
  let component: PostLoginHomeComponent;
  let fixture: ComponentFixture<PostLoginHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLoginHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLoginHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

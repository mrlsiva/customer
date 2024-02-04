import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreBrandsComponent } from './more-brands.component';

describe('MoreBrandsComponent', () => {
  let component: MoreBrandsComponent;
  let fixture: ComponentFixture<MoreBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

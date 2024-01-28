import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMobileSideNavComponent } from './dashboard-mobile-side-nav.component';

describe('DashboardMobileSideNavComponent', () => {
  let component: DashboardMobileSideNavComponent;
  let fixture: ComponentFixture<DashboardMobileSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMobileSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMobileSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

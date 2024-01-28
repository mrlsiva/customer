import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingSoonPopupComponent } from './coming-soon-popup.component';

describe('ComingSoonPopupComponent', () => {
  let component: ComingSoonPopupComponent;
  let fixture: ComponentFixture<ComingSoonPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComingSoonPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComingSoonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

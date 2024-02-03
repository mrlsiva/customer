import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuickCardComponent } from './product-quick-card.component';

describe('ProductQuickCardComponent', () => {
  let component: ProductQuickCardComponent;
  let fixture: ComponentFixture<ProductQuickCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductQuickCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductQuickCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

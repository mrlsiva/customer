import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketHotDealsComponent } from './ticket-hot-deals.component';

describe('TicketHotDealsComponent', () => {
  let component: TicketHotDealsComponent;
  let fixture: ComponentFixture<TicketHotDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketHotDealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketHotDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

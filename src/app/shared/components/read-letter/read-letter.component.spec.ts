import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadLetterComponent } from './read-letter.component';

describe('ReadLetterComponent', () => {
  let component: ReadLetterComponent;
  let fixture: ComponentFixture<ReadLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

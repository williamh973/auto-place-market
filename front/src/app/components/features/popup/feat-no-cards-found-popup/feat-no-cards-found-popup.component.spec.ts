import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatNoCardsFoundComponent } from './feat-no-cards-found-popup.component';

describe('FeatConfirmPopupComponent', () => {
  let component: FeatNoCardsFoundComponent;
  let fixture: ComponentFixture<FeatNoCardsFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatNoCardsFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatNoCardsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

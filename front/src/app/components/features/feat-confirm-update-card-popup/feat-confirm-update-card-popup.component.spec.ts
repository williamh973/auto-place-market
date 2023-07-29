import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatConfirmUpdateCardPopupComponent } from './feat-confirm-update-card-popup.component';

describe('FeatConfirmUpdateCardPopupComponent', () => {
  let component: FeatConfirmUpdateCardPopupComponent;
  let fixture: ComponentFixture<FeatConfirmUpdateCardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatConfirmUpdateCardPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatConfirmUpdateCardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

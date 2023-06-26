import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatConfirmDeletePopupComponent } from './feat-confirm-delete-popup.component';

describe('FeatConfirmDeletePopupComponent', () => {
  let component: FeatConfirmDeletePopupComponent;
  let fixture: ComponentFixture<FeatConfirmDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatConfirmDeletePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatConfirmDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

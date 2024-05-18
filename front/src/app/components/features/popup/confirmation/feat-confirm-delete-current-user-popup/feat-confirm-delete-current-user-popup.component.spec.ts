import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatConfirmDeleteCurrentUserPopupComponent } from './feat-confirm-delete-current-user-popup.component';

describe('FeatConfirmDeleteCurrentUserPopupComponent', () => {
  let component: FeatConfirmDeleteCurrentUserPopupComponent;
  let fixture: ComponentFixture<FeatConfirmDeleteCurrentUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatConfirmDeleteCurrentUserPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatConfirmDeleteCurrentUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

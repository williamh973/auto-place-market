import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatLoginOrRegisterPopupComponent } from './feat-login-or-register-popup.component';

describe('FeatLoginOrRegisterPopupComponent', () => {
  let component: FeatLoginOrRegisterPopupComponent;
  let fixture: ComponentFixture<FeatLoginOrRegisterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatLoginOrRegisterPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatLoginOrRegisterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

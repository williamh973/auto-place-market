import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatAccountPopupComponent } from './feat-account-popup.component';

describe('FeatAccountPopupComponent', () => {
  let component: FeatAccountPopupComponent;
  let fixture: ComponentFixture<FeatAccountPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatAccountPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatAccountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

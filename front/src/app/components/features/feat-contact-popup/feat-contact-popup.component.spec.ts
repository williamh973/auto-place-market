import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatContactPopupComponent } from './feat-contact-popup.component';

describe('FeatContactPopupComponent', () => {
  let component: FeatContactPopupComponent;
  let fixture: ComponentFixture<FeatContactPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatContactPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatContactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

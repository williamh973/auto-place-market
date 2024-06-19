import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFeedbackSuccessIconComponent } from './ui-feedback-success-icon.component';

describe('UiFeedbackSuccessIconComponent', () => {
  let component: UiFeedbackSuccessIconComponent;
  let fixture: ComponentFixture<UiFeedbackSuccessIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiFeedbackSuccessIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiFeedbackSuccessIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

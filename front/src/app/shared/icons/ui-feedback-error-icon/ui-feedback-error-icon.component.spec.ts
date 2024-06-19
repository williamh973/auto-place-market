import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFeedbackErrorIconComponent } from './ui-feedback-error-icon.component';

describe('UiFeedbackErrorIconComponent', () => {
  let component: UiFeedbackErrorIconComponent;
  let fixture: ComponentFixture<UiFeedbackErrorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiFeedbackErrorIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiFeedbackErrorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

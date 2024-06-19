import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTransmissionIconComponent } from './ui-transmission-icon.component';

describe('UiTransmissionIconComponent', () => {
  let component: UiTransmissionIconComponent;
  let fixture: ComponentFixture<UiTransmissionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTransmissionIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTransmissionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

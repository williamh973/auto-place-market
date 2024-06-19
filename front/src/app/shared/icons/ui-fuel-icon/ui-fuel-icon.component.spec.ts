import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFuelIconComponent } from './ui-fuel-icon.component';

describe('UiFuelIconComponent', () => {
  let component: UiFuelIconComponent;
  let fixture: ComponentFixture<UiFuelIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiFuelIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiFuelIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

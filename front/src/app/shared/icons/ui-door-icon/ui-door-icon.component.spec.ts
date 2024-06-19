import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDoorIconComponent } from './ui-door-icon.component';

describe('UiDoorIconComponent', () => {
  let component: UiDoorIconComponent;
  let fixture: ComponentFixture<UiDoorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiDoorIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiDoorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

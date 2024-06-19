import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCloseIconComponent } from './ui-close-icon.component';

describe('UiCloseIconComponent', () => {
  let component: UiCloseIconComponent;
  let fixture: ComponentFixture<UiCloseIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiCloseIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCloseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiArrowRightIconComponent } from './ui-arrow-right-icon.component';

describe('UiArrowRightIconComponent', () => {
  let component: UiArrowRightIconComponent;
  let fixture: ComponentFixture<UiArrowRightIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiArrowRightIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiArrowRightIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

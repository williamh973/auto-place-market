import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiArrowLeftIconComponent } from './ui-arrow-left-icon.component';

describe('UiArrowLeftIconComponent', () => {
  let component: UiArrowLeftIconComponent;
  let fixture: ComponentFixture<UiArrowLeftIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiArrowLeftIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiArrowLeftIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiKilometerIconComponent } from './ui-kilometer-icon.component';

describe('UiKilometerIconComponent', () => {
  let component: UiKilometerIconComponent;
  let fixture: ComponentFixture<UiKilometerIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiKilometerIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiKilometerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

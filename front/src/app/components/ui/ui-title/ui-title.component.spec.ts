import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTitleComponent } from './ui-title.component';

describe('UiTitleComponent', () => {
  let component: UiTitleComponent;
  let fixture: ComponentFixture<UiTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

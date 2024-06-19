import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSearchIconComponent } from './ui-search-icon.component';

describe('UiSearchIconComponent', () => {
  let component: UiSearchIconComponent;
  let fixture: ComponentFixture<UiSearchIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiSearchIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiSearchIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

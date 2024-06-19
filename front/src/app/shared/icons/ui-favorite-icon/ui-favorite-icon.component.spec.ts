import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFavoriteIconComponent } from './ui-favorite-icon.component';

describe('UiFavoriteIconComponent', () => {
  let component: UiFavoriteIconComponent;
  let fixture: ComponentFixture<UiFavoriteIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiFavoriteIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiFavoriteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

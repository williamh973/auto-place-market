import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatConfirmDeleteNotificationComponent } from './feat-confirm-delete-notification.component';

describe('FeatConfirmDeleteNotificationComponent', () => {
  let component: FeatConfirmDeleteNotificationComponent;
  let fixture: ComponentFixture<FeatConfirmDeleteNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatConfirmDeleteNotificationComponent]
    });
    fixture = TestBed.createComponent(FeatConfirmDeleteNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

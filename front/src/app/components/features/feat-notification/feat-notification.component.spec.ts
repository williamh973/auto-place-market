import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatNotificationComponent } from './feat-notification.component';

describe('FeatNotificationComponent', () => {
  let component: FeatNotificationComponent;
  let fixture: ComponentFixture<FeatNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatNotificationComponent]
    });
    fixture = TestBed.createComponent(FeatNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

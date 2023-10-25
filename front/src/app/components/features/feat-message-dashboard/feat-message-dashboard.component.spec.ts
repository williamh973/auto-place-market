import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatMessageDashboardComponent } from './feat-message-dashboard.component';

describe('FeatMessageDashboardComponent', () => {
  let component: FeatMessageDashboardComponent;
  let fixture: ComponentFixture<FeatMessageDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatMessageDashboardComponent]
    });
    fixture = TestBed.createComponent(FeatMessageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

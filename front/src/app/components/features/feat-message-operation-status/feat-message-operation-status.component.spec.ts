import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatMessageOperationStatusComponent } from './feat-message-operation-status.component';

describe('FeatMessageOperationStatusComponent', () => {
  let component: FeatMessageOperationStatusComponent;
  let fixture: ComponentFixture<FeatMessageOperationStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatMessageOperationStatusComponent]
    });
    fixture = TestBed.createComponent(FeatMessageOperationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

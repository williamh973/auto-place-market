import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardOperationStatusComponent } from './feat-card-operation-status.component';

describe('FeatCardOperationStatusComponent', () => {
  let component: FeatCardOperationStatusComponent;
  let fixture: ComponentFixture<FeatCardOperationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatCardOperationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardOperationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

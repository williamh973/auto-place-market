import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardListUserComponent } from './feat-card-list-user.component';

describe('FeatCardListUserComponent', () => {
  let component: FeatCardListUserComponent;
  let fixture: ComponentFixture<FeatCardListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatCardListUserComponent]
    });
    fixture = TestBed.createComponent(FeatCardListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardListAdminComponent } from './feat-card-list-admin.component';

describe('FeatCardListAdminComponent', () => {
  let component: FeatCardListAdminComponent;
  let fixture: ComponentFixture<FeatCardListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatCardListAdminComponent]
    });
    fixture = TestBed.createComponent(FeatCardListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

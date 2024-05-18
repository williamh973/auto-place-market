import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardAdminComponent } from './feat-card-admin.component';

describe('FeatCardAdminComponent', () => {
  let component: FeatCardAdminComponent;
  let fixture: ComponentFixture<FeatCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatCardAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

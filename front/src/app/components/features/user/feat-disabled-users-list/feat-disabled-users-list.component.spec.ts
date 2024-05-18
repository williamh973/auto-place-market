import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatDisabledUsersListComponent } from './feat-disabled-users-list.component';

describe('FeatDisabledUsersListComponent', () => {
  let component: FeatDisabledUsersListComponent;
  let fixture: ComponentFixture<FeatDisabledUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatDisabledUsersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatDisabledUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

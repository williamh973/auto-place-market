import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSearchUserComponent } from './feat-search-user.component';

describe('FeatSearchUserComponent', () => {
  let component: FeatSearchUserComponent;
  let fixture: ComponentFixture<FeatSearchUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatSearchUserComponent]
    });
    fixture = TestBed.createComponent(FeatSearchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

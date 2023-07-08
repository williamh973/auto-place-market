import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSignInStatusComponent } from './feat-sign-in-status.component';

describe('FeatSignInStatusComponent', () => {
  let component: FeatSignInStatusComponent;
  let fixture: ComponentFixture<FeatSignInStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatSignInStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatSignInStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

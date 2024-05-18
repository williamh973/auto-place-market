import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSignInFormComponent } from './feat-sign-in-form.component';

describe('FeatSignUpComponent', () => {
  let component: FeatSignInFormComponent;
  let fixture: ComponentFixture<FeatSignInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatSignInFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatSignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

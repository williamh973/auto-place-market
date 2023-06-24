import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSignUpComponent } from './feat-sign-up.component';

describe('FeatSignUpComponent', () => {
  let component: FeatSignUpComponent;
  let fixture: ComponentFixture<FeatSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

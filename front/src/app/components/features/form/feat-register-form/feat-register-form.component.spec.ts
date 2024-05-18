import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatRegisterFormComponent } from './feat-register-form.component';

describe('FeatRegisterFormComponent', () => {
  let component: FeatRegisterFormComponent;
  let fixture: ComponentFixture<FeatRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatRegisterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

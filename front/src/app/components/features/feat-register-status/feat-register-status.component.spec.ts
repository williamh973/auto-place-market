import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatRegisterStatusComponent } from './feat-register-status.component';

describe('FeatRegisterStatusComponent', () => {
  let component: FeatRegisterStatusComponent;
  let fixture: ComponentFixture<FeatRegisterStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatRegisterStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatRegisterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

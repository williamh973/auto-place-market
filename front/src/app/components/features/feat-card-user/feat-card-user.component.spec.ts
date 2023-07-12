import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardUserComponent } from './feat-card-user.component';

describe('FeatCardUserComponent', () => {
  let component: FeatCardUserComponent;
  let fixture: ComponentFixture<FeatCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatCardUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

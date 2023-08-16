import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatMessageUserComponent } from './feat-message-user.component';

describe('FeatMessageUserComponent', () => {
  let component: FeatMessageUserComponent;
  let fixture: ComponentFixture<FeatMessageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatMessageUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatMessageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

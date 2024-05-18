import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatNavbarComponent } from './feat-navbar.component';

describe('FeatNavbarComponent', () => {
  let component: FeatNavbarComponent;
  let fixture: ComponentFixture<FeatNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

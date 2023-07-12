import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSloganComponent } from './feat-slogan.component';

describe('FeatSloganComponent', () => {
  let component: FeatSloganComponent;
  let fixture: ComponentFixture<FeatSloganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatSloganComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatSloganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

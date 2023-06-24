import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardComponent } from './feat-card.component';

describe('FeatYoutubeCardComponent', () => {
  let component: FeatCardComponent;
  let fixture: ComponentFixture<FeatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

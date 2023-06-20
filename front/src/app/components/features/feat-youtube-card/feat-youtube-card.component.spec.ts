import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatYoutubeCardComponent } from './feat-youtube-card.component';

describe('FeatYoutubeCardComponent', () => {
  let component: FeatYoutubeCardComponent;
  let fixture: ComponentFixture<FeatYoutubeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatYoutubeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatYoutubeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

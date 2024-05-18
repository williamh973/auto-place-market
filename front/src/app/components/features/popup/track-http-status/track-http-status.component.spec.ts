import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackHttpStatusComponent } from './track-http-status.component';

describe('TrackHttpStatusComponent', () => {
  let component: TrackHttpStatusComponent;
  let fixture: ComponentFixture<TrackHttpStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackHttpStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackHttpStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

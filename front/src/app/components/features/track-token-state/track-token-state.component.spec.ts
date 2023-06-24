import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTokenStateComponent } from './track-token-state.component';

describe('TrackTokenStateComponent', () => {
  let component: TrackTokenStateComponent;
  let fixture: ComponentFixture<TrackTokenStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackTokenStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackTokenStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

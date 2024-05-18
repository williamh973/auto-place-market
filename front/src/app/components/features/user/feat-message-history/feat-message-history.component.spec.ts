import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatMessageHistoryComponent } from './feat-message-history.component';

describe('FeatMessageHistoryComponent', () => {
  let component: FeatMessageHistoryComponent;
  let fixture: ComponentFixture<FeatMessageHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatMessageHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatMessageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

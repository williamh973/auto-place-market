import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardListComponent } from './feat-card-list.component';

describe('FeatCardListComponent', () => {
  let component: FeatCardListComponent;
  let fixture: ComponentFixture<FeatCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSearchComponent } from './feat-search.component';

describe('FeatSearchComponent', () => {
  let component: FeatSearchComponent;
  let fixture: ComponentFixture<FeatSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

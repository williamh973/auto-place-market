import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatFooterComponent } from './feat-footer.component';

describe('FeatFooterComponent', () => {
  let component: FeatFooterComponent;
  let fixture: ComponentFixture<FeatFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

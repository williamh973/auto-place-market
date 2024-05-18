import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardPreviewComponent } from './feat-card-preview.component';

describe('FeatCardPreviewComponent', () => {
  let component: FeatCardPreviewComponent;
  let fixture: ComponentFixture<FeatCardPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatCardPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

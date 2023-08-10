import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatLoaderComponent } from './feat-loader.component';

describe('FeatLoaderComponent', () => {
  let component: FeatLoaderComponent;
  let fixture: ComponentFixture<FeatLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatEditCardFormComponent } from './feat-edit-card-form.component';

describe('FeatEditCardFormComponent', () => {
  let component: FeatEditCardFormComponent;
  let fixture: ComponentFixture<FeatEditCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatEditCardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatEditCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

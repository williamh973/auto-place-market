import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatUpdateInformationFormComponent } from './feat-update-information-form.component';

describe('FeatUpdateInformationFormComponent', () => {
  let component: FeatUpdateInformationFormComponent;
  let fixture: ComponentFixture<FeatUpdateInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatUpdateInformationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatUpdateInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatUserPersonnalInformationComponent } from './feat-user-personnal-information.component';

describe('FeatUserPersonnalInformationComponent', () => {
  let component: FeatUserPersonnalInformationComponent;
  let fixture: ComponentFixture<FeatUserPersonnalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatUserPersonnalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatUserPersonnalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

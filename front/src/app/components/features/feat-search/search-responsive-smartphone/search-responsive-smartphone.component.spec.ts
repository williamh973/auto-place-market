import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResponsiveSmartphoneComponent } from './search-responsive-smartphone.component';

describe('SearchResponsiveSmartphoneComponent', () => {
  let component: SearchResponsiveSmartphoneComponent;
  let fixture: ComponentFixture<SearchResponsiveSmartphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResponsiveSmartphoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResponsiveSmartphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

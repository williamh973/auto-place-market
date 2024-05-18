import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResponsiveTabletComponent } from './search-responsive-tablet.component';

describe('SearchResponsiveTabletComponent', () => {
  let component: SearchResponsiveTabletComponent;
  let fixture: ComponentFixture<SearchResponsiveTabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResponsiveTabletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResponsiveTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

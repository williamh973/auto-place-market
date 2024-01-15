import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardListFavoriteComponent } from './feat-card-list-favorite.component';

describe('FeatCardListFavoriteComponent', () => {
  let component: FeatCardListFavoriteComponent;
  let fixture: ComponentFixture<FeatCardListFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatCardListFavoriteComponent]
    });
    fixture = TestBed.createComponent(FeatCardListFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

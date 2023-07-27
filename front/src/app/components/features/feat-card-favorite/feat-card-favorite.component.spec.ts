import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardFavoriteComponent } from './feat-card-favorite.component';

describe('FeatCardFavoriteComponent', () => {
  let component: FeatCardFavoriteComponent;
  let fixture: ComponentFixture<FeatCardFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatCardFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

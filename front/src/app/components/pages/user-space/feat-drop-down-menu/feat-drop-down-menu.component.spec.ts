import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatDropDownMenuComponent } from './feat-drop-down-menu.component';

describe('FeatDropDownMenuComponent', () => {
  let component: FeatDropDownMenuComponent;
  let fixture: ComponentFixture<FeatDropDownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatDropDownMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatDropDownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

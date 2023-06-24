import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDatasComponent } from './get-datas.component';

describe('GetDatasComponent', () => {
  let component: GetDatasComponent;
  let fixture: ComponentFixture<GetDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

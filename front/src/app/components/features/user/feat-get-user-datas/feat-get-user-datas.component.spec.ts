import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserDatasComponent } from './feat-get-user-datas.component';

describe('GetDatasComponent', () => {
  let component: GetUserDatasComponent;
  let fixture: ComponentFixture<GetUserDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetUserDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetUserDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

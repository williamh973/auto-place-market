import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatReceivedMessagesComponent } from './feat-received-messages.component';

describe('FeatReceivedMessagesComponent', () => {
  let component: FeatReceivedMessagesComponent;
  let fixture: ComponentFixture<FeatReceivedMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatReceivedMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatReceivedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

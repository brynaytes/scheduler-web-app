import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingViewOwnerComponent } from './meeting-view-owner.component';

describe('MeetingViewOwnerComponent', () => {
  let component: MeetingViewOwnerComponent;
  let fixture: ComponentFixture<MeetingViewOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingViewOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingViewOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

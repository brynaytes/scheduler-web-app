import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingViewPublicComponent } from './meeting-view-public.component';

describe('MeetingViewPublicComponent', () => {
  let component: MeetingViewPublicComponent;
  let fixture: ComponentFixture<MeetingViewPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingViewPublicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingViewPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingConfirmationDialogComponent } from './meeting-confirmation-dialog.component';

describe('MeetingConfirmationDialogComponent', () => {
  let component: MeetingConfirmationDialogComponent;
  let fixture: ComponentFixture<MeetingConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

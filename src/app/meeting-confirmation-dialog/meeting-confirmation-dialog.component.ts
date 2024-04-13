import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-confirmation-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './meeting-confirmation-dialog.component.html',
  styleUrl: './meeting-confirmation-dialog.component.css'
})
export class MeetingConfirmationDialogComponent {
  meetingUrl = "";
  constructor(public dialogRef: MatDialogRef<MeetingConfirmationDialogComponent>,
       @Inject(MAT_DIALOG_DATA) public data: any
) {
  this.meetingUrl = data.url;
}
copyInputMessage(inputElement : any){
  inputElement.select();
  document.execCommand('copy');
  inputElement.setSelectionRange(0, 0);
}
}

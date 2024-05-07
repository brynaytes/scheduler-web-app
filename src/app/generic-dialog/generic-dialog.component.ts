import { Component, Inject, Input } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.css'
})
export class GenericDialogComponent {
  title : string;
  text : string;

  constructor(public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
) {
this.title = data.title;
this.text = data.text;
}
}

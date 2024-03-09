import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-meeting-setup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './meeting-setup.component.html',
  styleUrl: './meeting-setup.component.css',
  providers: [provideNativeDateAdapter()],
})
export class MeetingSetupComponent {

}

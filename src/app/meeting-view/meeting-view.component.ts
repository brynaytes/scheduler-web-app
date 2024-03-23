import { Component  } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule ,NgFor} from '@angular/common';
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerToggleIconDirective} from 'ngx-material-timepicker';

@Component({
  selector: 'app-meeting-view',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule ,NgFor ,NgxMaterialTimepickerModule ],
  templateUrl: './meeting-view.component.html',
  styleUrl: './meeting-view.component.css'
})
export class MeetingViewComponent {
  SelectedDateList :Array<{ date: string; times: Array<{ startTime: string; endTime: string }> }>= [
      {
          "date": "3/20/2024",
          "times": [
              {
                  "startTime": "11:13 AM",
                  "endTime": "11:09 AM"
              }
          ]
      },
      {
          "date": "3/28/2024",
          "times": [
              {
                  "startTime": "7:20 PM",
                  "endTime": "10:12 PM"
              },
              {
                  "startTime": "11:11 PM",
                  "endTime": "11:26 PM"
              }
          ]
      }
    ];


  public doStuff(){
    console.log(this.SelectedDateList)

  }
} 

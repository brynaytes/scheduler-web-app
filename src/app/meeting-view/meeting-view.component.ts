import { Component  } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule ,NgFor} from '@angular/common';
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerToggleIconDirective} from 'ngx-material-timepicker';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meeting-view',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule ,NgFor ,NgxMaterialTimepickerModule ],
  templateUrl: './meeting-view.component.html',
  styleUrl: './meeting-view.component.css'
})


export class MeetingViewComponent {
  meetingTitle = "";
  meetingDescription = "";
  isDataLoaded = false;
  meetingID = "";

  SelectedDateList :Array<{ date: string; times: Array<{ startTime: string; endTime: string, timeID : string,isAvailable:boolean }> }>= [
      {
          "date": "3/20/2024",
          "times": [
              {
                  "startTime": "11:13 AM",
                  "endTime": "11:09 AM",
                  "timeID" : "1",
                  "isAvailable" : false
              }
          ]
      },
      {
          "date": "3/28/2024",
          "times": [
              {
                  "startTime": "7:20 PM",
                  "endTime": "10:12 PM",
                  "timeID" : "2",
                  "isAvailable" : false
              },
              {
                  "startTime": "11:11 PM",
                  "endTime": "11:26 PM",
                  "timeID" : "3",
                  "isAvailable" : false
              }
          ]
      }
    ];

  constructor(public _route: ActivatedRoute){ 
  }

  public doStuff(){
    console.log(this.SelectedDateList)
  }

  public updateAvailability(id :number, it : number){
    this.SelectedDateList[id].times[it].isAvailable =  !this.SelectedDateList[id].times[it].isAvailable ;
  }

  public async getMeetings(meetingID : string){
    let obj = {
      meetingID : meetingID
    }
    let path = "/meetings/"+meetingID;
    let resp = await RequestHandlerService.sendData(obj,"getMeeting",path)

    this.SelectedDateList = resp.body.data.dateTimes;
    this.meetingTitle = resp.body.data.title;
    this.meetingDescription = resp.body.data.description;

    this.isDataLoaded = true;
  }

  async ngOnInit() {
     this._route.params.subscribe(params => {
      this.meetingID = params['meetingID'];
    });
    await this.getMeetings(this.meetingID);
  }
} 

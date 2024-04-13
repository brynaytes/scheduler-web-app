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

  SelectedDateList :Array<{ date: string; times: Array<{ startTime: string; endTime: string, timeID : string,isAvailable:boolean }> }>= [];

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

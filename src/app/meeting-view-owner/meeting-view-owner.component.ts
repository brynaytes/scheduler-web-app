import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgFor } from '@angular/common';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JwtService } from '../services/jwt/jwt.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-meeting-view-owner',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule, NgFor, FormsModule,SpinnerComponent, MatExpansionModule],
  templateUrl: './meeting-view-owner.component.html',
  styleUrl: './meeting-view-owner.component.css',
  encapsulation : ViewEncapsulation.None
})
export class MeetingViewOwnerComponent {
  meetingTitle = "";
  meetingDescription = "";
  isDataLoaded = false;
  meetingID = "";
  @Input() name: string;
  isMeetingOwner = false;

  SelectedDateList: Array<{ date: string; times: Array<{ startTime: string; endTime: string, isAvailable: boolean, availableUsers: Array<string>, topPick : boolean, len : number }> }> = [];

  constructor(public _route: ActivatedRoute, private jwtService: JwtService) {
    let tempName = this.name = this.jwtService.getClaim(localStorage.getItem("access_token")!, "username");
    if (tempName) {
      this.name = tempName;
    }
  }

  public async getMeetings(meetingID: string) {
    let obj = {
      meetingID: meetingID
    }
    let path = "/meetings";
    let resp = await RequestHandlerService.sendData(obj, "getMeetingAvailabilityList", path)
    let name = "";





    this.SelectedDateList = resp.dateTimes;
    
   //let largest_meeting : Array<{items :Array<{number : number}>}>= [];
   let largest_meeting :any = [];

    for(let dates=0; dates < this.SelectedDateList.length;dates++){
      for(let times=0; times < this.SelectedDateList[dates].times.length;times++){
        if(this.SelectedDateList[dates].times[times].availableUsers == undefined ){
          this.SelectedDateList[dates].times[times].len = 0;
          continue;
        }
        this.SelectedDateList[dates].times[times].len = this.SelectedDateList[dates].times[times].availableUsers.length;
        if(largest_meeting.length === 0){
          largest_meeting.push([dates,times]);
        }else if(this.SelectedDateList[dates].times[times].availableUsers.length == this.SelectedDateList[largest_meeting[0][0]].times[largest_meeting[0][1]].availableUsers.length ){
          largest_meeting.push([dates,times])
        }else if(this.SelectedDateList[dates].times[times].availableUsers.length > this.SelectedDateList[largest_meeting[0][0]].times[largest_meeting[0][1]].availableUsers.length){
          largest_meeting = [[dates,times]];
        }
      }
    }

    if(largest_meeting.length > 0){
      largest_meeting.forEach((element: ( number)[]) => {
        this.SelectedDateList[element[0]].times[element[1]].topPick = true
      });
    }

    this.meetingTitle = resp.title;
    this.meetingDescription = resp.description;

    let ownerId = resp.UserID;

    let userId = RequestHandlerService.getUserId();
    if (userId == ownerId) {
      this.isMeetingOwner = true;
    }

    this.isDataLoaded = true;
  }

  async ngOnInit() {
    this._route.params.subscribe(params => {
      this.meetingID = params['meetingID'];
    });
    await this.getMeetings(this.meetingID);
  }

} 

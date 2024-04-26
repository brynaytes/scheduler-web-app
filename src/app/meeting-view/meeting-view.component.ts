import { Component  } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule ,NgFor} from '@angular/common';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { FormsModule } from '@angular/forms';
import { MeetingViewOwnerComponent } from '../meeting-view-owner/meeting-view-owner.component';
import { MeetingViewPublicComponent } from '../meeting-view-public/meeting-view-public.component';
import { JwtService } from '../services/jwt/jwt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meeting-view',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule ,NgFor,FormsModule ,MeetingViewOwnerComponent,MeetingViewPublicComponent],
  templateUrl: './meeting-view.component.html',
  styleUrl: './meeting-view.component.css'
})

export class MeetingViewComponent {
  meetingID = '';
  isMeetingOwner =false;
  isDataLoaded = false;

  constructor(public _route: ActivatedRoute, private jwtService :JwtService){   }
  
  public async getMeetings(meetingID : string){
    let obj = {
      meetingID : meetingID
    }
    let path = "/meetings/"+meetingID;
    let resp = await RequestHandlerService.sendData(obj,"getMeeting",path)
    let ownerId = resp.body.UserID;

    let userId = RequestHandlerService.getUserId();
    if(userId == ownerId){
      console.log("logged in");
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

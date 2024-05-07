import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { RouterModule, Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-my-meetings',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule,SpinnerComponent],
  templateUrl: './my-meetings.component.html',
  styleUrl: './my-meetings.component.css'
})
export class MyMeetingsComponent {
  isDataLoaded = false;
  url: string = window.location.origin+"/viewmeeting/";
  meetings: Array<{ title: string, description: string, meetingID: string }>;

  constructor(private router: Router) { }
  public async setupTable() {
    let meetingsRequest = await RequestHandlerService.sendData({}, "getMeetingList", "/meetings");
    this.meetings = meetingsRequest.body;
    this.isDataLoaded = true;
  }

  async ngOnInit() {

    await this.setupTable();
  }

}

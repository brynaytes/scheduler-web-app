import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { RouterModule, Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RequestHandler2Service } from '../services/request-handler-2/request-handler-2.service';

@Component({
  selector: 'app-my-meetings',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule,SpinnerComponent],
  templateUrl: './my-meetings.component.html',
  styleUrl: './my-meetings.component.css'
})
export class MyMeetingsComponent {
  private dataService = inject(RequestHandler2Service)
  isDataLoaded = false;
  url: string = window.location.origin+"/viewmeeting/";
  meetings: Array<{ title: string, description: string, meetingID: string }>;

  constructor(private router: Router) { }
  public async setupTable() {
    let meetingsRequest = await this.dataService.sendData({}, "getMeetingList", "/meetings");
    this.meetings = meetingsRequest;
    this.isDataLoaded = true;
  }

  async ngOnInit() {

    await this.setupTable();
  }

  copyToClipboard(meetingID : string){
    let url = window.location.hostname+'/meetingView/'+meetingID;
    navigator.clipboard.writeText(url);
  }
}

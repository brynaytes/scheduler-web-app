import { Component, inject, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgFor } from '@angular/common';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JwtService } from '../services/jwt/jwt.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-meeting-view-public',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule, NgFor, FormsModule,SpinnerComponent],
  templateUrl: './meeting-view-public.component.html',
  styleUrl: './meeting-view-public.component.css'
})
export class MeetingViewPublicComponent {
  private dataService = inject(RequestHandlerService)
  
  meetingTitle = "";
  meetingDescription = "";
  isDataLoaded = false;
  meetingID = "";
  @Input() name: string;
  isMeetingOwner = false;

  SelectedDateList: Array<{ date: string; times: Array<{ startTime: string; endTime: string, isAvailable: boolean, availableUsers: Array<string> }> }> = [];

  constructor(public _route: ActivatedRoute, private jwtService: JwtService,public dialog: MatDialog) {
    let tempName = this.name = this.jwtService.getClaim(localStorage.getItem("access_token")!, "username");
    if (tempName) {
      this.name = tempName;
    }
  }

  public updateAvailability(id: number, it: number) {
    this.SelectedDateList[id].times[it].isAvailable = !this.SelectedDateList[id].times[it].isAvailable;
  }

  public async getMeetings(meetingID: string) {
    let obj = {
      meetingID: meetingID
    }
    let path = "/meetings";
    let resp = await this.dataService.sendData(obj, "getMeeting", path)

    this.SelectedDateList = resp.data.dateTimes;
    this.meetingTitle = resp.data.title;
    this.meetingDescription = resp.data.description;
    this.isDataLoaded = true;
  }

  async ngOnInit() {
    this._route.params.subscribe(params => {
      this.meetingID = params['meetingID'];
    });
    await this.getMeetings(this.meetingID);
  }

  public async createTimeRecord() {
    let obj = {
      MeetingID: this.meetingID,
      name: this.name,
      dateTimes: this.SelectedDateList
    }
    let response = await this.dataService.sendData(obj, "addTimes", "/meetings", "POST");
  
    if(response){
      this.openDialog("Time Successfully Added","")
    }else{
      this.openDialog("An Error has occurred","")

    }
  }

  openDialog(title : string, text : string): void {
    this.dialog.open(GenericDialogComponent, {
      width: '500px',
      height: '250px',
      data : {
        title : title,
        text : text
      }
    });
  }
} 

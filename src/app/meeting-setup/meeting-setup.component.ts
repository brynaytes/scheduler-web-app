import { Component, Input  } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule ,NgFor} from '@angular/common';
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerToggleIconDirective} from 'ngx-material-timepicker';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MeetingConfirmationDialogComponent } from '../meeting-confirmation-dialog/meeting-confirmation-dialog.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';


@Component({
  selector: 'app-meeting-setup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule ,NgFor ,NgxMaterialTimepickerModule,FormsModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,SpinnerComponent ],
  templateUrl: './meeting-setup.component.html',
  styleUrl: './meeting-setup.component.css',
  providers: [provideNativeDateAdapter()],
})

export class MeetingSetupComponent {
  SelectedDateList :Array<{ date: string; times: Array<{ startTime: string ; endTime: string; error: boolean }> }>= [];
  @Input() meetingDescription: string;
  @Input() meetingTitle: string;
  isloading = false;
  meetingDisabled = true;

  constructor(public dialog: MatDialog) {}

  public dateUpdate(event : any){
    let chosenDate = event.target.value;
    let localFormattedDate : string = chosenDate.toLocaleDateString();
    this.SelectedDateList.push({
      date : localFormattedDate,
      times : [{
        startTime : 'null',
        endTime : 'null',
        error : false
      }
      ]
    });
    this.meetingDisabled = false;
  }

  public removeItem(i : number){ 
      this.SelectedDateList.splice(i,1);
    }
    public removeItemFromEvent(index :string){
      this.removeItem(+index);
    }
    public getfullObject(){

    }
  public addTime(id:number){
    console.log(this.SelectedDateList)

    if(!this.SelectedDateList[id].times)
      this.SelectedDateList[id].times = []
    this.SelectedDateList[id].times.push(
      {
        startTime :'null',
        endTime : 'null',
        error : false
      }
      );
  }
  public removeTime(id : number,it : number){
    this.SelectedDateList[id].times.splice(it,1);
  }
  addStartTime(event: NgxMaterialTimepickerToggleIconDirective, id : number,it :number) {
    this.SelectedDateList[id].times[it].startTime = event.toString();

    //error validation
    if(this.SelectedDateList[id].times[it].endTime != 'null'){
      if(!this.compareTimes(this.SelectedDateList[id].times[it].startTime,this.SelectedDateList[id].times[it].endTime )){
        //end time is before start time. Set error for the field 
        this.SelectedDateList[id].times[it].error =true;
      }else{
        //remove error 
        this.SelectedDateList[id].times[it].error =false;
      }
    } else{
     // this.SelectedDateList[id].times[it].error =true;
    }
  }
  addEndTime(event: NgxMaterialTimepickerToggleIconDirective, id : number,it :number) {
    this.SelectedDateList[id].times[it].endTime = event.toString();

    //error validation
    if(this.SelectedDateList[id].times[it].startTime != 'null'){
      if(!this.compareTimes(this.SelectedDateList[id].times[it].startTime,this.SelectedDateList[id].times[it].endTime )){
        //end time is before start time. Set error for the field 
        this.SelectedDateList[id].times[it].error =true;
      }else{
        //remove error 
        this.SelectedDateList[id].times[it].error =false;
      }
    } else {
     // this.SelectedDateList[id].times[it].error =true;
    }
  }
  public getTimeList(){
    console.log(this.SelectedDateList)
  }
  public doStuff(){
    console.log(this.SelectedDateList)
  }

  public async createMeeting(){
    this.isloading = true;
    let wasError = false;

    //do validation
    for(let i =0; i < this.SelectedDateList.length;i++){
      for(let o =0; o < this.SelectedDateList[i].times.length ;o++){
        if(this.SelectedDateList[i].times[o].startTime == 'null' || this.SelectedDateList[i].times[o].endTime == 'null' || this.SelectedDateList[i].times[o].error){
          wasError = true;
          this.SelectedDateList[i].times[o].error = true;
        }
      }
    }
    if(wasError){
      this.isloading = false;
      return;
    }

    let obj = {
      title : this.meetingTitle,
      description :this.meetingDescription,
      dateTimes : this.SelectedDateList
    }
    let response = await RequestHandlerService.sendData(obj,"createMeeting","/meetings");
    this.isloading = false;

    if(response == "error")
    {
      this.openErrorDialog("An Error Has Occurred" , "Oops, something happened that we didnt expect! If this continues to happen please contact support.");
    }else{
      this.openDialog(response.meetingID);
    }
  }

  openDialog(meetingID : string): void {
    this.dialog.open(MeetingConfirmationDialogComponent, {
      width: '500px',
      height: '250px',
      data : {
        url : window.origin+'/meetingView/'+meetingID
      }
    });
  }

  openErrorDialog(title : string, text : string): void {
    this.dialog.open(GenericDialogComponent, {
      width: '500px',
      height: '250px',
      data : {
        title : title,
        text : text
      }
    });
  }

  compareTimes(time1 : string, time2 : string) {
    const date1 = new Date(`1970-01-01 ${time1}`);
    const date2 = new Date(`1970-01-01 ${time2}`);
    const temp = date1.getTime() - date2.getTime();

    return temp < 0;
  }
} 

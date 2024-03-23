import { Component  } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule ,NgFor} from '@angular/common';
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerToggleIconDirective} from 'ngx-material-timepicker';

@Component({
  selector: 'app-meeting-setup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule ,NgFor ,NgxMaterialTimepickerModule ],
  templateUrl: './meeting-setup.component.html',
  styleUrl: './meeting-setup.component.css',
  providers: [provideNativeDateAdapter()],
})

export class MeetingSetupComponent {
  SelectedDateList :Array<{ date: string; times: Array<{ startTime: string; endTime: string }> }>= [];

  public dateUpdate(event : any){
    let chosenDate = event.target.value;
    let localFormattedDate : string = chosenDate.toLocaleDateString();
    this.SelectedDateList.push({
      date : localFormattedDate,
      times : [{
        startTime : '11:11 am',
        endTime : '11:12 am'
      }
      ]
    });
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
        startTime :"11:11 AM",
        endTime : "11:11 AM"
      }
      );
  }
  public removeTime(id : number,it : number){
    this.SelectedDateList[id].times.splice(it,1);
  }
  addStartTime(event: NgxMaterialTimepickerToggleIconDirective, id : number,it :number) {
    this.SelectedDateList[id].times[it].startTime = event.toString();
  }
  addEndTime(event: NgxMaterialTimepickerToggleIconDirective, id : number,it :number) {
    this.SelectedDateList[id].times[it].endTime = event.toString();
  }
  public getTimeList(){
    console.log(this.SelectedDateList)
  }
  public doStuff(){
    console.log(this.SelectedDateList)

  }
} 

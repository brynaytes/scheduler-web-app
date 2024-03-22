import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor} from '@angular/common';
import {NgxMaterialTimepickerModule, NgxMaterialTimepickerToggleIconDirective} from 'ngx-material-timepicker';

@Component({
  selector: 'app-timepickerforday',
  standalone: true,
  imports: [NgFor ,NgxMaterialTimepickerModule , TimepickerfordayComponent],
  templateUrl: './timepickerforday.component.html',
  styleUrl: './timepickerforday.component.css'
})

export class TimepickerfordayComponent {
  @Input() date = "";
  @Input() itemIndex :number;
  @Output() removeDateEvent = new EventEmitter<string>();

  SelectedTimeList : Array<{startTime: string, endTime: string}> = [];


  public addTime(){
    this.SelectedTimeList.push(
      {
        startTime :"11:11 AM",
        endTime : "11:11 AM"
      }
      );
  }

  public removeDate(){
    this.removeDateEvent.next(this.itemIndex.toString())
  }
  public removeTime(i : number){
    this.SelectedTimeList.splice(i,1);
  }
  addStartTime(event: NgxMaterialTimepickerToggleIconDirective, index : number) {
    this.SelectedTimeList[index].startTime = event.toString();
  }
  addEndTime(event: NgxMaterialTimepickerToggleIconDirective,index : number) {
    this.SelectedTimeList[index].endTime = event.toString();
  }
}

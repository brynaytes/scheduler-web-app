import { Component  } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule ,NgFor} from '@angular/common';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TimepickerfordayComponent } from './timepickerforday/timepickerforday.component';

@Component({
  selector: 'app-meeting-setup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule ,NgFor ,NgxMaterialTimepickerModule , TimepickerfordayComponent],
  templateUrl: './meeting-setup.component.html',
  styleUrl: './meeting-setup.component.css',
  providers: [provideNativeDateAdapter()],
})


export class MeetingSetupComponent {
  SelectedDateList : string[] = []

  public dateUpdate(event : any){
    let chosenDate = event.target.value;
    let localFormattedDate = chosenDate.toLocaleDateString();
    this.SelectedDateList.push(localFormattedDate);
  }

  public removeItem(i : number){ 
      this.SelectedDateList.splice(i,1);
    }
    public removeItemFromEvent(index :string){
      this.removeItem(+index);
    }
}

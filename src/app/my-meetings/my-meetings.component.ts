import { Component } from '@angular/core';
import { CommonModule ,NgFor} from '@angular/common';

@Component({
  selector: 'app-my-meetings',
  standalone: true,
  imports: [NgFor],
  templateUrl: './my-meetings.component.html',
  styleUrl: './my-meetings.component.css'
})
export class MyMeetingsComponent {
  meetings :Array<{title:string,description:string,code:string }> =[ 
  {
    "title" : "meeting1",
    "description" : "stuff",
    "code" : "kdjfjh"
  },
  {
    "title" : "meeting2",
    "description" : "thigns",
    "code" : "dlkfj"
  },
];
  
}

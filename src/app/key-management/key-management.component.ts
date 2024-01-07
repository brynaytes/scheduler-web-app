import { Component } from '@angular/core';
import {KeyInfoComponent} from './sub-objects/key-info/key-info.component';
import {KeyListComponent} from './sub-objects/key-list/key-list.component';
import {KeyStatsComponent} from './sub-objects/key-stats/key-stats.component';

@Component({
  selector: 'app-key-management',
  standalone: true,
  imports: [KeyInfoComponent,KeyListComponent,KeyStatsComponent],
  template: `
    <div class="api-key-management-page">
        <app-key-list (keyClicked)="switchActiveKey($event)" /> 
        <app-key-info [targetID]="targetID"/>
        <app-key-stats />
    </div>
  `,
  styleUrl: './key-management.component.css'
})
export class KeyManagementComponent {
  targetID = 0;
  switchActiveKey(val : number){
    this.targetID = val
    console.log("parent fired", val , this.targetID);

  }

}

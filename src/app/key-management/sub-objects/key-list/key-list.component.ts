import { Component ,Input,Output,EventEmitter } from '@angular/core';
import {KeyObject} from '../../../key-object';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {RequestHandlerService} from '../../../services/request-handler.service';

@Component({
  selector: 'app-key-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="list-group" *ngFor="let keyObj of keyObjectList">
      <a class="list-group-item list-group-item-action" (click)="test1(this.keyObj.id)">{{keyObj.name}}</a>
    </div>
  `,
  styleUrl: './key-list.component.css'
})
export class KeyListComponent {
  keyObjectList : KeyObject[] = []

  constructor(private requestHandler : RequestHandlerService  ) {
     this.requestHandler.getKeys().subscribe(data => this.keyObjectList = data.items);

  }

  @Output() keyClicked = new EventEmitter<any>();
  test1(val : number){
    this.keyClicked.emit(val);
  }
}


import { Component , Input } from '@angular/core';
import {RequestHandlerService} from '../../../services/request-handler.service';
import {KeyObject} from '../../../key-object';

@Component({
  selector: 'app-key-info',
  standalone: true,
  imports: [],
  template: `
  <div>
    <form>
      <div class="form-group row">
        <label for="keyID" class="col-sm-2 col-form-label">ID</label>
        <div class="col-sm-10">
          <input type="text" readonly class="form-control-plaintext" id="keyID" value={{this.keyObj?.id}}>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputName" placeholder="key name" value={{this.keyObj?.name}}>
        </div>
      </div>
      <div class="form-group row">
        <label for="createdDate" class="col-sm-2 col-form-label">Creation Date</label>
        <div class="col-sm-10">
          <input type="text" readonly class="form-control-plaintext" id="createdDate" value={{this.keyObj?.createdDate}}>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Enabled</label>
        <select class="form-control" id="exampleFormControlSelect1" value={{this.keyObj?.enabled}}>
          <option>true</option>
          <option>false</option>
        </select>
      </div>
    </form>
  <div>
  `,
  styleUrl: './key-info.component.css'
})
export class KeyInfoComponent {
  @Input() targetID = 0;
  keyObjectList : KeyObject[] = []
  keyObj : KeyObject | undefined;
  constructor(private requestHandler : RequestHandlerService  ) {
    // this.keyObj = this.keyObjectList.find(i => i.id === this.targetID);
  }
  ngOnChanges(){
    this.getKeyObjectValue();
  }
  getKeyObjectValue(){
    this.requestHandler.getKeys().subscribe(data => this.keyObj = data.items.find(i => i.id === this.targetID));
  }
}

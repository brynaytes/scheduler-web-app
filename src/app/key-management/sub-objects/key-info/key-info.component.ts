import { Component , Input } from '@angular/core';
import {RequestHandlerService} from '../../../services/request-handler.service';
import {KeyObject} from '../../../key-object';

@Component({
  selector: 'app-key-info',
  standalone: true,
  imports: [],
  template: `
  <div>
    <p>
      key-info works! {{targetID}}
    </p>

    <form>
      <div class="form-group row">
        <label for="keyID" class="col-sm-2 col-form-label">ID</label>
        <div class="col-sm-10">
          <input type="text" readonly class="form-control-plaintext" id="keyID" value={{this.keyObj?.id}}>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
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
     this.requestHandler.getKeys().subscribe(data => this.keyObjectList = data.items);
     this.keyObj = this.keyObjectList.find(i => i.id === this.targetID);
  }
}

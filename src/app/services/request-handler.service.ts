import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {KeyObjectItemsArray} from '../key-object-items-array';


@Injectable({
  providedIn: 'root',
})
export class RequestHandlerService {

  constructor(private http: HttpClient) { }
  private url = 'https://xqzxb7pm2a.execute-api.us-east-1.amazonaws.com/prod/keys';


  getKeys(){
    let keyItemList = this.http.get<KeyObjectItemsArray>(this.url);
    return keyItemList;
  }
}

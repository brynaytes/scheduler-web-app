import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {KeyObjectItemsArray} from '../key-object-items-array';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'any',
})
export class RequestHandlerService {

  constructor(private http: HttpClient) { }
  private url = 'https://xqzxb7pm2a.execute-api.us-east-1.amazonaws.com/prod';


  getKeys(){
    let keyItemList = this.http.get<KeyObjectItemsArray>(this.url + "/keys");
    return keyItemList;
  }

  doStuff(){
    console.log("stuff");
  }
  getAuthTokens(code : string){
    let authstuff = this.http.get<string>(this.url + "/login/"+code);
    return authstuff;

  }
}

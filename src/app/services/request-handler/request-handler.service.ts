import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { JwtService } from '../../jwt.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'any',
})

export class RequestHandlerService {

  private code : string | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router ) {}
  public static url = environment.apiUrl;

  static async sendData(obj :any = {}, action="", path ="", method = "POST") {

    const data = {
      "action" : action,
      "user" : this.getUserId(),
      "data" : obj 
    };
    let token = localStorage.getItem('access_token')
    token = token ? token : "";

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    // Default options are marked with *
    const response = await fetch(this.url+path, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: myHeaders,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  public static getUserId(){
    let jwtService = new JwtService();
    let token = localStorage.getItem('id_token')
    token = token ? token : "";
    return jwtService.getClaim(token , "sub")
  }


}

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JwtService } from '../jwt/jwt.service';
import { environment } from '../../../environments/environment.current';

@Injectable({
  providedIn: 'root',
})

export class RequestHandlerService {

  private code: string | undefined;

  constructor( public http: HttpClient) { }
  public static url = environment.apiUrl;

  static async sendData(obj: any = {}, action = "", path = "", method = "POST") {
    const instance = new RequestHandlerService(Inject(HttpClient));
    let response : any ;
    response = await instance.nonStaticsendData(obj,action,  this.url + '/' + path, method);
    return response;
    
  }



  private async nonStaticsendData(obj: any = {}, action = "", url = "" , method = "POST"){
    let corsMode: RequestMode = environment.environment == "local" ? "no-cors" : "cors";
    let token = localStorage.getItem('access_token')
    token = token ? token : "";

        const data = {
          "action": action,
          "user": RequestHandlerService.getUserId(),
          "data": obj
        };

    let headers = new HttpHeaders();
    headers= headers.set('content-type', 'application/json');
    headers= headers.set('authentication', token);
    headers= headers.set('Access-Control-Allow-Origin', '*');
    headers= headers.set('Mode', corsMode);
    let response : any ;
    response =  this.http.post(url, data, {headers : headers}).subscribe(res => {
      response = res
    });
    return response;
  }

  public static getUserId() {
    let jwtService = new JwtService();
    let token = localStorage.getItem('id_token')
    token = token ? token : "";
    return jwtService.getClaim(token, "sub")
  }
}

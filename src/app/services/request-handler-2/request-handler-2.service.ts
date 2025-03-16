import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';
import { environment } from '../../../environments/environment.current';

@Injectable({
  providedIn: 'root'
})
export class RequestHandler2Service {
  /**
   * I really need to move this to be in the version 1 option. 
   * Also adapt all other references to this to work correclty like the mymeetings page. 
   */
  constructor(public http: HttpClient) {}
  public url = environment.apiUrl;

  async sendData(obj: any = {}, action = "", path = "", method = "POST") {
    let corsMode: RequestMode = environment.environment == "local" ? "no-cors" : "cors";
    let token = localStorage.getItem('access_token')
    token = token ? token : "";

        const data = {
          "action": action,
          "user": this.getUserId(),
          "data": obj
        };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*',
       'Authorization' : token,
       //'Mode' : corsMode

    });
    let response : any;
     
    response = await this.http.post(this.url  + path, data, {headers : headers}).toPromise();
    return response;
  }

    public  getUserId() {
      let jwtService = new JwtService();
      let token = localStorage.getItem('id_token')
      token = token ? token : "";
      return jwtService.getClaim(token, "sub")
    }
  
}

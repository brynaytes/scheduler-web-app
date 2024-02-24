import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {KeyObjectItemsArray} from '../key-object-items-array';
import { HttpClientModule } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { TokenStorage } from '../token-storage';


@Injectable({
  providedIn: 'any',
})
export class RequestHandlerService {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router ) { }
  private url = 'https://xqzxb7pm2a.execute-api.us-east-1.amazonaws.com/prod';


  getKeys(){
    let keyItemList = this.http.get<KeyObjectItemsArray>(this.url + "/keys");
    return keyItemList;
  }

  doStuff(){
    console.log("stuff");
  }
  getAuthTokens(code : string){
    let authstuff = this.http.get<TokenStorage>(this.url + "/login/"+code);
    return authstuff;
  }

  checkForAuthcodeInParams(){
    let access_token = "",id_token = "";
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      let tokens;
      if(code){
        let data = this.getAuthTokens(code).subscribe((data) => {
          if(!data.error){
            console.log("dfdfdfdfdfd",data);
            tokens = data;
            console.log(tokens.access_token);
            access_token = tokens.access_token;
            id_token = tokens.id_token;
          }
        });
        
        // this.router.navigate(
        //   [], 
        //   {
        //     relativeTo: this.activatedRoute,
        //     queryParams: {  },
        //     queryParamsHandling: null
        //   }
        // );
      }

    });
    console.log(access_token);
    sessionStorage.setItem("key", "value");
    sessionStorage.setItem('access_token',access_token)
    sessionStorage.setItem('id_token', id_token);
    
  }
}

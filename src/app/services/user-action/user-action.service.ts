import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {KeyObjectItemsArray} from '../../key-object-items-array';
import { HttpClientModule } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { TokenStorage } from '../../token-storage';


@Injectable({
  providedIn: 'any'
})
export class UserActionService {
  private code : string | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router ) {}
  private url = 'https://xqzxb7pm2a.execute-api.us-east-1.amazonaws.com/prod';


  async getAuthTokens(code: string): Promise<TokenStorage | undefined> {
    try {
      const authstuff = await this.http.get<TokenStorage>(this.url + '/login/' + code).toPromise();
      return authstuff;
    } catch (error) {
      console.error('Error fetching auth tokens:', error);
      throw error;
    }
  }

  public async beginAuth(){
    var tokens : TokenStorage |undefined;
    var code : string | null =this.activatedRoute.snapshot.queryParamMap.get('code');;

    if(code){

      tokens = await  this.getAuthTokens(code);



      if(!tokens?.error && tokens?.access_token){
        localStorage.setItem("access_token" , tokens?.access_token!);
        localStorage.setItem("id_token" , tokens?.id_token!);
      }
    }

    this.router.navigate(['/home'])
      // this.router.navigate(
      //   ['.'], 
      //   {
      //     relativeTo: this.activatedRoute,
      //     queryParams: {  },
      //     queryParamsHandling: null
      //   }
      // );
    return tokens;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TokenStorage } from '../jwt/token-storage';
import { environment } from '../../../environments/environment.current';

@Injectable({
  providedIn: 'any'
})
export class UserActionService {
  private code: string | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }
  private url = environment.authUrl;


  async getAuthTokens(code: string): Promise<TokenStorage | undefined> {
    try {
      const authstuff = await this.http.get<TokenStorage>(this.url + '/login/' + code).toPromise();
      return authstuff;
    } catch (error) {
      console.error('Error fetching auth tokens:', error);
      throw error;
    }
  }

  public async beginAuth() {
    var tokens: TokenStorage | undefined;
    var code: string | null = this.activatedRoute.snapshot.queryParamMap.get('code');;

    if (code) {

      tokens = await this.getAuthTokens(code);



      if (!tokens?.error && tokens?.access_token) {
        localStorage.setItem("access_token", tokens?.access_token!);
        localStorage.setItem("id_token", tokens?.id_token!);
      }
    }

    return tokens;
  }

}

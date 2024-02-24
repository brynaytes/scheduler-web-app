import { Component } from '@angular/core';
import {RequestHandlerService} from '../services/request-handler.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { TokenStorage } from '../token-storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <p>
      login works!
    </p>
    <a href="https://testing-authentication-bryn.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=4m9eg4mrjosm9d17clp9iqpdhu&response_type=code&scope=openid+test-resource-server%2Ftest&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin">go </a>

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(public requestHandler : RequestHandlerService ,private activatedRoute: ActivatedRoute, public http : HttpClient) {

  }
  async ngOnInit() {
    await this.requestHandler.checkForAuthcodeInParams();
  }
  
}



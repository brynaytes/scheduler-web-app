import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `

    <a href="{{cognitoUrl}}/oauth2/authorize?client_id=4m9eg4mrjosm9d17clp9iqpdhu&response_type=code&scope=openid+test-resource-server%2Ftest+aws.cognito.signin.user.admin+email+phone+profile&redirect_uri={{url}}">go </a>

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //all additional scopes must be added directly to the scope section of the href for the login link

  url : string = encodeURIComponent(window.location.origin+"/login");
  cognitoUrl = environment.cognitoUrl;
  constructor( public http : HttpClient ) {

  }
  async ngOnInit() {

  }
  
}



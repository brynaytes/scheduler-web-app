import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <p>
      login works!
    </p>
    <a href="{{cognitoUrl}}/oauth2/authorize?client_id=4m9eg4mrjosm9d17clp9iqpdhu&response_type=code&scope=openid+test-resource-server%2Ftest&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin">go </a>

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  cognitoUrl = environment.cognitoUrl;
  constructor( public http : HttpClient ) {

  }
  async ngOnInit() {

  }
  
}



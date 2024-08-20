import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../services/jwt/jwt.service';
import { CommonModule } from '@angular/common';
import { UserActionService } from '../services/user-action/user-action.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shared-header.component.html',
  styleUrl: './shared-header.component.css'
})
export class SharedHeaderComponent {

  public username: string;
  public logoutUrl: string;

  constructor(public userService: UserActionService, private activatedRoute: ActivatedRoute, public http: HttpClient, private jwtService: JwtService, private router: Router) {


    this.router.events.subscribe(async value => {
      if (await this.runAuthFlow(value) != undefined) {
        await this.runAuthFlow(value);
        this.router.navigate(['/']) //navigate to home and remove code from url
      }
      if ("access_token" in localStorage) {
        let cognitoUrl = environment.cognitoUrl;
        let clientID = this.jwtService.getClaim(localStorage.getItem("access_token")!, "client_id")
        let callBackUrl = window.location;
        //this.logoutUrl = cognitoUrl + '/logout?client_id=' + clientID + "&logout_uri=" + callBackUrl;


        let url = new URL(cognitoUrl + "/logout");
        let params = new URLSearchParams(url.search);

        params.append("client_id", clientID);
        params.append("logout_uri", "http://" + callBackUrl.host + "/logout");

        this.logoutUrl = url.toString() + "?" + params;
      }
    });
  }
  async ngOnInit() {

  }

  public async runAuthFlow(value: any) {
    if (value instanceof NavigationEnd) {

      if ("access_token" in localStorage) {
        let expiration = this.jwtService.getClaim(localStorage.getItem("access_token")!, "exp");
        let now = Math.floor(new Date().getTime() / 1000);
        if (expiration <= now) {
          //localStorage expried - clear localStorage storage
          localStorage.clear();

        } else {
          //valid token - show as logged in 
          this.username = this.jwtService.getClaim(localStorage.getItem("access_token")!, "username");
        }
      } else {
        //no token, not logged in 
        this.username = "";
        return await this.userService.beginAuth();
      }

    }
    return undefined;
  }
}

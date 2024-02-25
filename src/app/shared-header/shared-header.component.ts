import { Component } from '@angular/core';
import { RouterModule ,ActivatedRoute} from '@angular/router';
import {RequestHandlerService} from '../services/request-handler.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [  RouterModule  ],
  templateUrl: './shared-header.component.html',
  styleUrl: './shared-header.component.css'
})
export class SharedHeaderComponent {
  
  public isLoggedin = false;
  public username = "";

  constructor(public requestHandler : RequestHandlerService ,private activatedRoute: ActivatedRoute, public http : HttpClient, private jwtService :JwtService) {

  }
  async ngOnInit() {
    if("access_token" in sessionStorage ){
      let expiration =  this.jwtService.getClaim(sessionStorage.getItem("access_token")!,"exp" );
      if(expiration <= Date.now() ){
        //session expried - clear session storage
        sessionStorage.clear();
        this.isLoggedin = false;
      }else{
        //valid token - show as logged in 
        this.isLoggedin = true;
        this.username = this.jwtService.getClaim(sessionStorage.getItem("access_token")!,"username" );
      }
    }else{
      //no token, not logged in 
      this.isLoggedin = false;
    }
 
  }
}

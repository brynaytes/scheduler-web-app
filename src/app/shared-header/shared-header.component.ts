import { Component } from '@angular/core';
import { RouterModule ,ActivatedRoute,Router, NavigationEnd} from '@angular/router';
import {RequestHandlerService} from '../services/request-handler.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../jwt.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shared-header',
  standalone: true,
  imports: [  RouterModule ,CommonModule ],
  templateUrl: './shared-header.component.html',
  styleUrl: './shared-header.component.css'
})
export class SharedHeaderComponent {
  
  public username  : string;

  constructor(public requestHandler : RequestHandlerService ,private activatedRoute: ActivatedRoute, public http : HttpClient, private jwtService :JwtService, private router: Router ) {


    this.router.events.subscribe(async value => {
      if(value instanceof NavigationEnd){

        if("access_token" in localStorage ){
          let expiration =  this.jwtService.getClaim(localStorage.getItem("access_token")!,"exp" );
          let now = Math.floor(new Date().getTime() / 1000);
          if(expiration <= now ){
            //localStorage expried - clear localStorage storage
            localStorage.clear();

          }else{
            //valid token - show as logged in 
            this.username = this.jwtService.getClaim(localStorage.getItem("access_token")!,"username" );
            console.log("username",this.username);
          }
        }else{
          //no token, not logged in 
          const auth_response = await this.requestHandler.beginAuth();
        }

      }
    });
  }
  async ngOnInit() {

  }
}

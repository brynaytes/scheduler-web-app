import { Component } from '@angular/core';
import { JwtService } from '../services/jwt/jwt.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public username : string;
  public firstName : string;
  public lastName : string;
  public address : string;
  public email : string;
  public phone : string;

  constructor(private jwtService :JwtService){}
  
  async ngOnInit() {
    this.username =  this.jwtService.getClaim(localStorage.getItem("access_token")!,"username" );
    this.firstName =  this.jwtService.getClaim(localStorage.getItem("id_token")!,"name" ).split(" ")[0];
    this.lastName =  this.jwtService.getClaim(localStorage.getItem("id_token")!,"name" ).split(" ")[1];
    this.address =  this.jwtService.getClaim(localStorage.getItem("id_token")!,"address" ).formatted;
    this.email =  this.jwtService.getClaim(localStorage.getItem("id_token")!,"email" );
    this.phone =  this.jwtService.getClaim(localStorage.getItem("id_token")!,"phone_number" );
  }
}

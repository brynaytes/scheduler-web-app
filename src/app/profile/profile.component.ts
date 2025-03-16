import { Component, inject } from '@angular/core';
import { JwtService } from '../services/jwt/jwt.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RequestHandlerService } from '../services/request-handler/request-handler.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,SpinnerComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public username: string;
  public firstName: string;
  public lastName: string;
  public address: string;
  public email: string;
  public phone: string;
  public isloading: boolean = false;

  private dataService = inject(RequestHandlerService)

  constructor(private jwtService: JwtService  ) { }


  async ngOnInit() {
    this.username = this.jwtService.getClaim(localStorage.getItem("access_token")!, "username");
    this.firstName = this.jwtService.getClaim(localStorage.getItem("id_token")!, "name").split(" ")[0];
    this.lastName = this.jwtService.getClaim(localStorage.getItem("id_token")!, "name").split(" ")[1];
    this.address = this.jwtService.getClaim(localStorage.getItem("id_token")!, "address").formatted;
    this.email = this.jwtService.getClaim(localStorage.getItem("id_token")!, "email");
    this.phone = this.jwtService.getClaim(localStorage.getItem("id_token")!, "phone_number");
  }
  async Submit(){
    this.isloading = true;

    let obj = {
      UserAttributes : [
        { 
          Name: "name",
          Value: this.firstName + " " + this.lastName,
        },
        { 
          Name: "address",
          Value: this.address,
        },        
        { 
          Name: "email",
          Value: this.email,
        },
        { 
          Name: "phone_number",
          Value: this.phone,
        },
        //this will cause the user email to be un-verified and is required to be sent when email is updated.
       /* {
          Name: "email_verified", 
          Value: "false"
        }*/
    
      ],
      AccessToken :  localStorage.getItem('access_token')
    }
    console.log(obj);
    let response = await this.dataService.sendData(obj,"profile_update","/user");
    this.isloading = false;
  }
}

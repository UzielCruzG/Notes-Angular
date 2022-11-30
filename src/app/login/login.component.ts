import { Component } from "@angular/core";
import { NgModel } from "@angular/forms";
import { UserService } from "../content/create-user-component/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  constructor(public userService:UserService){}

  login(username:string, password: string){
    this.userService.login(username, password)
  }

}

import { Component} from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent{


  constructor(public userService:UserService){}

  onCreateUser(username: string, email: string, password: string){
    this.userService.createUser(username, email, password)
  }
}

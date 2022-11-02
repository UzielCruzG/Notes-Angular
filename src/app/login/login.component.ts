import { Component } from "@angular/core";
import { NgModel } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  isLoading = false;

  toggleLoading = () =>{
    this.isLoading = true;
    setTimeout(()=>{
      this.isLoading = false
    }, 3000)
  }

}

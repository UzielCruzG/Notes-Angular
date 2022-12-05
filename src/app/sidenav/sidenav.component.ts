import { Component, OnInit } from '@angular/core';
import { ListService } from '../content/list-component/list.service';
import { MatDialog } from "@angular/material/dialog";
import { AddListCard } from '../content/add-list-card/add-list-card.component';
import { UserService } from '../content/create-user-component/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent{

  shouldRun = true;

  constructor(public listService:ListService, public dialog:MatDialog, public userService: UserService){}

  openDialog(): void {
    this.dialog.open(AddListCard, {
      width: '250px',
    })
  }

  checked = false;

    changed(){
      if(true){
        var boton = document.body;
        boton.classList.toggle(".btnCerrarSesion");
      }
    }

<<<<<<< HEAD
    onSessionClosed(){
      this.userService.idUser = ""
    }
=======
    darkMode() {
      var cuerpoweb = document.body;
      cuerpoweb.classList.toggle("dark-mode");
  }
>>>>>>> 7e4ef7f1eea9626d990b5e2f57a4de43dbd83546
}




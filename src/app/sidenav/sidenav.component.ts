import { Component, OnInit } from '@angular/core';
import { ListService } from '../content/list-component/list.service';
import { MatDialog } from "@angular/material/dialog";
import { AddListCard } from '../content/add-list-card/add-list-card.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent{

  shouldRun = true;

  constructor(public listService:ListService, public dialog:MatDialog){}

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

    darkMode() {
      var cuerpoweb = document.body;
      cuerpoweb.classList.toggle("dark-mode");
  }
}




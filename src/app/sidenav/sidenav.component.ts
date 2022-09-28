import { Component, OnInit } from '@angular/core';
import { ListService } from '../content/list-component/list.service';
import { PopupService } from '../content/popup-card-component/popup.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent{

  shouldRun = true;

  constructor(public popupService: PopupService, public listService:ListService){}

  turnOnPopup(popup:boolean){
    this.popupService.turnOnPopup(popup)
  }

}




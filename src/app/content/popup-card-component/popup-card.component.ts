import { Component, OnDestroy, OnInit } from "@angular/core";
import { PopupService } from "./popup.service";
import { Subscription } from "rxjs";
import { Popup } from "./popup.model";
import { ListService } from "../list-component/list.service";
@Component({
  selector: 'popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit, OnDestroy{
  popup = false
  private popupSub: Subscription

  constructor(public popupService: PopupService, public listsService:ListService){}
  ngOnInit(){
    this.popupSub = this.popupService.popupUpdateListener()
    .subscribe((popup: Popup[])=> {
      this.popup = popup[0].popup
    })
  }
  ngOnDestroy(){
    this.popupSub.unsubscribe()
  }

  onAddList(title:string){
    if(title == ""){
      return
    }
    this.listsService.addList(title)
    this.popup = false
  }
}

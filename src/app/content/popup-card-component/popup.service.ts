import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Popup } from "./popup.model";
@Injectable({providedIn: 'root'})

export class PopupService{
  private popup: Popup[] = []
  private popupSubject = new Subject<Popup[]>()

  popupUpdateListener(){
    return this.popupSubject.asObservable()
  }

  turnOnPopup(turnOn:boolean){
    const popup:Popup = {popup: turnOn}
    this.popup[0] = popup
    this.popupSubject.next([...this.popup])
  }
}

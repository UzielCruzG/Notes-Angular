import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { List } from "./list.model";
import { ListService } from "./list.service";
import { Subscription } from "rxjs";
import { AddActivityCard } from "../add-activity-card/add-activity-card.component";
import { DeleteCard } from "../delete-card/delete-card.component";

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit, OnDestroy{

  lists:List[] = []
  private listSub:Subscription

  constructor(public listService:ListService, public dialog:MatDialog){}

  ngOnInit(){
    this.listService.getLists()
    this.listSub = this.listService.getListsUpdateListener()
    .subscribe((lists:List[])=>{
      this.lists = lists
    })
  }

  ngOnDestroy(){
    this.listSub.unsubscribe()
  }

  OnDelete(id: string){
    console.log("OnDeleteID:" + id)
    this.listService.deleteList(id)

  }

  openDialog(id:string, title: string): void {
    this.dialog.open(AddActivityCard, {
      width: '250px',
      data: {idList: id, title: title}
    });
    console.log(this.lists)
  }

  openDialogUpdate(idList:string, title :string, idActivity: string, name: string, date:Date): void {

    this.dialog.open(AddActivityCard, {
      width: '250px',
      data: {idList: idList, title: title, idActivity: idActivity, name: name, date: date}
    });

  }

  openDialogDelete(idList:string, idActivity: string, name: string, date:Date): void {

    this.dialog.open(DeleteCard, {
      width: '250px',
      data: {idList: idList, idActivity: idActivity, name: name, date: date}
    });

  }


}

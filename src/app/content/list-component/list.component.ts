import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { List } from "./list.model";
import { ListService } from "./list.service";
import { Subscription } from "rxjs";
import { AddActivityCard } from "../add-activity-card/add-activity-card.component";

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

  HEROES = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
  ];

  //Testing this button

  openDialog(id:string, title: string): void {
    this.dialog.open(AddActivityCard, {
      width: '250px',
      data: {id: id, title: title}

    });

  }

}

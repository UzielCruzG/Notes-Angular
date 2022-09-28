import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { List } from "./list.model";
import { ListService } from "./list.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit, OnDestroy{

  lists:List[] = []
  private listSub:Subscription

  constructor(public listService:ListService){}

  ngOnInit(){
    this.lists = this.listService.getLists()
    this.listSub = this.listService.getListsUpdateListener()
    .subscribe((lists:List[])=>{
      this.lists = lists
    })
  }

  ngOnDestroy(){
    this.listSub.unsubscribe()
  }

  HEROES = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
  ];


}

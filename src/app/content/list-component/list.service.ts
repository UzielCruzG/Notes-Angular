import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { List } from "./list.model";


@Injectable({providedIn: 'root'})

export class ListService{
  private lists:List[] = []
  private listSub = new Subject<List[]>()

  getListsUpdateListener(){
    return this.listSub.asObservable()
  }

  getLists(){
    return [...this.lists]
  }

  addList(title:string){
    const list:List = {title:title}

    this.lists.push(list)
    this.listSub.next([...this.lists])
  }

}


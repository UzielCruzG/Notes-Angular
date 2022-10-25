import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { List } from "./list.model";
import { HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class ListService{
  private lists:List[] = []
  private listSub = new Subject<List[]>()
  constructor(private http:HttpClient){}

  getListsUpdateListener(){
    return this.listSub.asObservable()
  }

  getLists(){
    this.http.get<{message:string, lists: any}>('http://localhost:3000/api/lists')
    .pipe(map((listData) => {
      return listData.lists.map(list => {
        return {
          title: list.title,
          id: list._id
        }
      })
    }))
    .subscribe((transformedLists)=>{
      this.lists = transformedLists
      this.listSub.next([...this.lists])
    })
  }

  getList(id: string){
    return this.http.get<{id: string, title: string}>
    ('http://localhost:3000/api/lists' + id)
  }

  addList(title:string){
    const list:List = {id: null, title:title}
    this.http.post<{message: string, listId: string}>('http://localhost:3000/api/lists', list)
    .subscribe((responseData) => {
      const id = responseData.listId
      list.id = id
      this.lists.push(list)
      this.listSub.next([...this.lists])
    })
  }

  updateList(id: string, title: string){
    const list: List = {id: id, title: title}
    this.http.put('http://localhost:3000/api/lists' + id, list)
    .subscribe(response => {
      const updatedLists = [...this.lists]
      const oldListIndex = updatedLists.findIndex(p => p.id === list.id)
      updatedLists[oldListIndex] = list
      this.lists = updatedLists
      this.listSub.next([...this.lists])
    })
  }

  deleteList(id: string){
    if (id != null) {
      this.http.delete<{message: string}>('http://localhost:3000/api/lists' + id)
      .subscribe((responseData) => {
        console.log("ResponseData:" + responseData.message)
        const updateLists = this.lists.filter(list => list.id !== id)
        this.lists = updateLists
        this.listSub.next([...this.lists])
      })
    }
  }
}


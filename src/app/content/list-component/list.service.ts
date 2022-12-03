import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { List } from './list.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Activity } from './activity.model';
import { UserService } from '../create-user-component/user.service';

@Injectable({ providedIn: 'root' })
export class ListService {
  private lists: List[] = [];
  private listSub = new Subject<List[]>();
  constructor(private http: HttpClient, private userService: UserService) {}
  private userId = this.userService.idUser
  getListsUpdateListener() {
    return this.listSub.asObservable();
  }

  getLists() {
    this.http
      .get<{ message: string; lists: any }>('http://localhost:3000/api/notes/lists/' + this.userId)
      .pipe(
        map((listData) => {
          return listData.lists.map((list) => {
            return {
              title: list.title,
              activities: list.activities,
              id: list._id,
            };
          });
        })
      )
      .subscribe((transformedLists) => {
        this.lists = transformedLists;
        this.listSub.next([...this.lists]);
      });
  }

  /*
  getList(id: string) {
    return this.http.get<{
      id: string;
      title: string;
      activities: [{ name: string; date: Date }];
    }>('http://localhost:3000/api/lists' + id);
  }
*/

  addList(title: string) {
    const list: List = { id: null, title: title, activities: null };
    this.http.post<{ message: string, listId: string }>('http://localhost:3000/api/notes/createList/'+ this.userId , list)
    .subscribe((responseData) => {
      const id = responseData.listId;
      list.id = id;
      this.lists.push(list);
      this.listSub.next([...this.lists]);
    });
  }

  updateList(id: string, title: string) {
    const list: List = { id: id, title: title, activities: null };
    this.http.put('http://localhost:3000/api/notes/updateList/' + id, list)
    .subscribe((response) => {
      const updatedLists = [...this.lists];
      const oldListIndex = updatedLists.findIndex((p) => p.id === list.id);
      updatedLists[oldListIndex] = list;
      this.lists = updatedLists;
      this.listSub.next([...this.lists]);
    });
  }

  deleteList(id: string) {
    console.log(id)
    if (id != null) {
      this.http.delete<{ message: string }>('http://localhost:3000/api/notes/' + this.userId + "/" + id)
      .subscribe((responseData) => {
        const updateLists = this.lists.filter((list) => list.id !== id);
        this.lists = updateLists;
        this.listSub.next([...this.lists]);
      });
    }
  }

  addActivity(idList: string, title: string, name: string, date: Date) {
    const activity: Activity = { _id: null, name, date };
    console.log(activity)
    this.http
      .post<{ message: string; activityId: string }>(
        'http://localhost:3000/api/notes/createActivity/' + this.userId + "/" + idList,
        activity
      )
      .subscribe((responseData) => {
        const id = responseData.activityId;
        activity._id = id;
        const updatedLists = [...this.lists];
        const oldListIndex = updatedLists.findIndex((p) => p.id === idList);
        if (updatedLists[oldListIndex].activities != null) {
          updatedLists[oldListIndex].activities.push(activity);
        } else {
          updatedLists[oldListIndex].activities = [activity];
        }
        this.lists = updatedLists;
        console.log([...this.lists]);
        this.listSub.next([...this.lists]);
      });
  }

  updateActivity(idList: string, idActivity: string, name: string, date: Date) {
    const activity: Activity = { _id: idActivity, name, date };
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/api/lists/editActivity/' + idList,
        activity
      )
      .subscribe((responseData) => {
        const updatedLists = [...this.lists];
        const updatedActivitiesService = updatedLists.find(
          (p) => p.id === idList
        )['activities'];
        const oldActivityIndexService = updatedActivitiesService.findIndex(
          (p) => p._id === idActivity
        );
        updatedActivitiesService[oldActivityIndexService] = activity;
        console.log(this.lists)
        this.listSub.next([...this.lists]);
      });
  }

  deleteActivity(idList: string, idActivity: string, name: string, date: Date) {
    const activity: Activity = { _id: idActivity, name, date };
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/api/lists/deleteActivity/' + idList,
        activity
      )
      .subscribe((responseData) => {
        const updatedLists = [...this.lists];
        const activitiesService = updatedLists.find(
          (p) => p.id === idList
        )['activities']
        console.log(activitiesService)

        const listIndex = updatedLists.findIndex(
          p => p.id === idList
        )
        console.log(listIndex)
        const updatedActivities = activitiesService.filter(p => p._id !== activity._id)
        console.log(this.lists[listIndex])
        console.log(updatedActivities)

        this.lists[listIndex]['activities'] = updatedActivities
        console.log(this.lists)
        this.listSub.next([...this.lists]);
      });
  }
}

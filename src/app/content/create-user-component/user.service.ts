import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class UserService{
  private users: User[] = [];
  private userSub = new Subject<User[]>();
  constructor(private http: HttpClient, private router:Router) {}


  getUsersUpdateListener() {
    return this.userSub.asObservable();
  }
  /*
  getLists() {
    this.http
      .get<{ message: string; lists: any }>('http://localhost:3000/api/lists')
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
  }*/

  getUser(id: string) {
    return this.http.get<{
      id: string,
      username: string,
      email: string,
      password: string,
      image_path: string,
      lists: []
    }>('http://localhost:3000/api/lists/user/' + id);
  }

  createUser(username: string, email: string, password: string) {
    const user: User = {
      id: null,
      username: username,
      email: email,
      password: password,
      image_path: null,
      lists: null
    };

    this.http
      .post<{ message: string; userId: string }>('http://localhost:3000/api/lists/createUser', user)
      .subscribe((responseData) => {
        const id = responseData.userId;
        user.id = id;
        this.users.push(user);
        this.userSub.next([...this.users]);
      });
  }

  login(username: string, password: string){
    const user = {
      username: username,
      password: password
    }

    this.http.post<{_id: string}>('http://localhost:3000/api/lists/login', user)
      .subscribe((response) => {
        if (response) {
          this.router.navigate(['/'])
        }else{
        }
      });

  }

  updateUser(id: string, username: string, email: string, password: string) {
    const user: User = {
      id: id,
      username: username,
      email: email,
      password: password,
      image_path: null,
      lists: null
    };

    this.http.put('http://localhost:3000/api/lists/editUser/' + id, user)
      .subscribe((response) => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex((p) => p.id === user.id);
        updatedUsers[oldUserIndex] = user;
        this.users= updatedUsers;
        this.userSub.next([...this.users]);
      });
  }
  /*
  deleteList(id: string) {
    console.log(id)
    if (id != null) {
      this.http
        .delete<{ message: string }>('http://localhost:3000/api/lists/' + id)
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
      .put<{ message: string; activityId: string }>(
        'http://localhost:3000/api/lists/addActivity/' + idList,
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
  }*/
}

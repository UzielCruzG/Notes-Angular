import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { List } from '../list-component/list.model';


@Injectable({ providedIn: 'root' })
export class UserService{
  public user: User
  private userSub = new Subject<User>()
  constructor(private http: HttpClient, private router:Router) {}

  getUsersUpdateListener() {
    return this.userSub.asObservable();
  }

  //To test
  /*
  getUser(id: string) {
    return this.http.get<{
      id: string,
      username: string,
      email: string,
      password: string,
      image_path: string,
      lists: []
    }>('http://localhost:3000/api/lists/user/' + id);
  }*/

  createUser(username: string, email: string, password: string) {
    const user = {
      id: null,
      username: username,
      email: email,
      password: password,
      lists: null
    }
    this.http
      .post<{ message: string; userId: string }>('http://localhost:3000/api/notes/createUser', user)
      /*
      .subscribe((responseData) => {
        const id = responseData.userId;
        user.id = id;
        this.users.push(user);
        this.userSub.next([...this.users]);
      })
      */
  }

  login(username: string, password: string){
    const user = {
      username: username,
      password: password
    }

    this.http.post<{message: string, userLogged: User, result: boolean}>('http://localhost:3000/api/notes', user)
      .subscribe((response) => {
        if (response.result) {
          this.user = response.userLogged
          console.log(this.user)
          this.userSub.next(this.user)
          this.router.navigate(['/']) //To test
        }else{

        }
      })

  }

  //To test
  updateUser(id: string, username: string, email: string, password: string, lists:[List]) {
    const user = {
      username: username,
      password: password,
    };

    this.http.put('http://localhost:3000/api/notes/' + id, user)
      .subscribe((response) => {
        this.user.username = user.username
        this.user.password = user.password
        this.userSub.next(this.user);
      });
  }

  deleteUser(id: string){
    this.http.delete('http://localhost:3000/api/notes/' + id)
    this.router.navigate(['/'])
  }

}

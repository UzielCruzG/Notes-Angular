import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { List } from './list.model';
import { ListService } from './list.service';
import { Subscription } from 'rxjs';
import { AddActivityCard } from '../add-activity-card/add-activity-card.component';
import { DeleteCard } from '../delete-card/delete-card.component';
import { DeleteList } from '../delete-list/delete-list.component';
import { DatePipe } from '@angular/common';
import { UserService } from '../create-user-component/user.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DatePipe],
})
export class ListComponent implements OnInit, OnDestroy {
  lists: List[] = [];
  private listSub: Subscription;
  private date = new Date();
  formattedDate;
  constructor(
    public listService: ListService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    public userService: UserService
  ) {}

  ngOnInit() {
    if (this.userService.idUser != null) {
      this.listService.getLists();
      this.listSub = this.listService
        .getListsUpdateListener()
        .subscribe((lists: List[]) => {
          this.lists = lists;
          this.runOnDate();
        });
    }
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

  OnDelete(id: string) {
    console.log('OnDeleteID:' + id);
    this.listService.deleteList(id);
  }

  openDialog(id: string, title: string): void {
    this.dialog.open(AddActivityCard, {
      width: '250px',
      data: { idList: id, title: title },
    });
  }

  openDialogUpdate(
    idList: string,
    title: string,
    idActivity: string,
    name: string,
    date: Date
  ): void {
    this.dialog.open(AddActivityCard, {
      width: '250px',
      data: {
        idList: idList,
        title: title,
        idActivity: idActivity,
        name: name,
        date: date,
      },
    });
  }

  openDialogDelete(
    idList: string,
    idActivity: string,
    name: string,
    date: Date
  ): void {
    this.dialog.open(DeleteCard, {
      width: '250px',
      data: { idList: idList, idActivity: idActivity, name: name, date: date },
    });
  }

  openDialogDeleteList(idList: string): void {
    this.dialog.open(DeleteList, {
      width: '250px',
      data: { idList: idList },
    });
  }

  runOnDate() {
    if (this.lists.length > 0) {
      let activities = [];
      var now = new Date();
      for (let i = 0; i < this.lists.length; i++) {
        if (this.lists[i].activities != null) {
          for (let j = 0; j < this.lists[i].activities.length; j++) {
            if (
              new Date(this.lists[i].activities[j].date).getTime() - 4.32e7 >
              now.getTime()
            ) {
              activities.push(this.lists[i].activities[j]);
            }
          }
        }
      }
      console.log(activities);
      let activitiesSorted = activities.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      console.log(activitiesSorted);
      var dateFormatted = new Date(activitiesSorted[0].date);
      let time = dateFormatted.getTime() - 4.32e7 - now.getTime();
      console.log(time);
      if (time > 0) {
        setTimeout(() => {
          this.sendEmail(), this.runOnDate();
        }, time);
      } else {
        this.runOnDate();
      }
    }
  }

  sendEmail() {
    this.listService.sendEmail();
    console.log('Entro sendEmail');
  }
}

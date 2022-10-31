import { Component, Inject, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Activity } from "../list-component/activity.model";
import { ListService } from "../list-component/list.service";

@Component({
  selector: "add-activity-card",
  templateUrl: "./add-activity-card.component.html",
  styleUrls: ["./add-activity-card.component.css"]
})

export class AddActivityCard implements OnInit{

  activity: Activity

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string, title:string}, public listsService:ListService, public dialog:MatDialogRef<AddActivityCard>){}

  ngOnInit(){
    console.log(this.data.id," ", this.data.title)
  }

  onAddActivity(name: string, date: string, titleForm, dateForm: NgModel){
    if (titleForm.invalid || dateForm.invalid) {
      return
    }

    const dateFormatted = new Date(date)
    console.log(dateFormatted)
    this.listsService.addActivity(this.data.id, this.data.title, name, dateFormatted)
    this.dialog.close()
  }
}

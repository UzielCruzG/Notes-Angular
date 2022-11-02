import { Component, Inject, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ListService } from "../list-component/list.service";

@Component({
  selector: "delete-card",
  templateUrl: "./delete-card.component.html",
  styleUrls: ["./delete-card.component.css"]
})
export class DeleteCard{

  constructor(@Inject(MAT_DIALOG_DATA) public data: {idList: string, title:string, idActivity: string, name:string, date:Date}, public listsService:ListService, public dialog:MatDialogRef<DeleteCard>){}

  onDelete(){
    this.listsService.deleteActivity(this.data.idList, this.data.idActivity, this.data.name, this.data.date)
    this.dialog.close()
  }

}

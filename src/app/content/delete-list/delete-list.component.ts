import { Component, Inject, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ListService } from "../list-component/list.service";

@Component({
  selector: "delete-list",
  templateUrl: "./delete-list.component.html",
  styleUrls: ["./delete-list.component.css"]
})

export class DeleteList{

  constructor(@Inject(MAT_DIALOG_DATA) public data: {idList: string, title:string, idActivity: string, name:string, date:Date}, public listsService:ListService, public dialog:MatDialogRef<DeleteList>){}

  onDelete(){
    this.listsService.deleteList(this.data.idList)
    this.dialog.close()
  }

}

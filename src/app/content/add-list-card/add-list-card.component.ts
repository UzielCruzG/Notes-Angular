import { Component } from "@angular/core";
import { FormControl, NgForm, NgModel, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { List } from "../list-component/list.model";
import { ListService } from "../list-component/list.service";

@Component({
  selector: "add-list-card",
  templateUrl: "./add-list-card.component.html",
  styleUrls: ["./add-list-card.component.css"]
})
export class AddListCard{
  list: List

  constructor(public listsService:ListService, public dialog: MatDialogRef<AddListCard>){}

  onAddList(title:string, form:NgModel){
    if (form.invalid) {
      return
    }

    this.listsService.addList(title)
    this.dialog.close()
  }

}

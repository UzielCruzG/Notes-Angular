import { Component } from "@angular/core";
import { FormControl, FormGroup, NgForm, NgModel, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { List } from "../list-component/list.model";
import { ListService } from "../list-component/list.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "./mime-type.validator"; //importamos el mimeType

@Component({
  selector: "add-list-card",
  templateUrl: "./add-list-card.component.html",
  styleUrls: ["./add-list-card.component.css"]
})
export class AddListCard{
  list: List

  form: FormGroup

  constructor(public listsService:ListService, public dialog: MatDialogRef<AddListCard>){}

  ngOnInit(){
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required],
      asyncValidators: [mimeType]})
    })
  }

  onAddList(title:string){
    this.listsService.addList(title)
    this.dialog.close()
  }

}

import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgModel, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Activity } from "../list-component/activity.model";
import { ListService } from "../list-component/list.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "./mime-type.validator"; //importamos el mimeType


@Component({
  selector: "add-activity-card",
  templateUrl: "./add-activity-card.component.html",
  styleUrls: ["./add-activity-card.component.css"]
})

export class AddActivityCard implements OnInit{

  form: FormGroup //despues de quitar Form

  activity: Activity

  constructor(@Inject(MAT_DIALOG_DATA) public data: {idList: string, title:string, idActivity: string, name:string, date:Date}, public listsService:ListService, public dialog:MatDialogRef<AddActivityCard>, public route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      "titleActivity": new FormControl(null, {validators: [Validators.required]}),
      'date': new FormControl(null, {validators: [Validators.required],
      asyncValidators: [mimeType]})
    })

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('name')) {
        this.activity = {_id: this.data.idActivity, name: this.data.name, date: this.data.date}
        .subscribe(Activity => {
          this.activity = {
            _id: Activity._id,
            name: Activity.name,
            date: Activity.date,
          }
          this.form.setValue({
            name: this.activity.name,
            date: this.activity.date
          })
        })
        //this.post = this.postsService.getPost(this.postId)
      }else{

      }
    })
  }
    /*
  ngOnInit(){
    if (this.data.idActivity) {
      this.activity = {_id: this.data.idActivity, name: this.data.name, date: this.data.date}
    }
    console.log(this.data)
  }*/

  onAddActivity(name: string, date: string, titleForm, dateForm: NgModel){
    if (titleForm.invalid || dateForm.invalid) {
      return
    }
    console.log(this.data.idList)
    const dateFormatted = new Date(date)
    this.listsService.addActivity(this.data.idList, this.data.title, name, dateFormatted)
    this.dialog.close()
  }

  onUpdateActivity(name: string, date: Date){
    this.listsService.updateActivity(this.data.idList, this.data.idActivity, name, date)
    this.dialog.close()
  }

  onSave(name: string, date: string, titleForm, dateForm: NgModel){
    const dateFormatted = new Date(date)
    if (this.data.idActivity != undefined ) {
      this.onUpdateActivity(name, dateFormatted)
    }else{
      this.onAddActivity(name, date, titleForm, dateForm)
    }
  }
}

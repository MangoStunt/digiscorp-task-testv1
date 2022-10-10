import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {DialogDataInterface} from "../../../interfaces/dialog-data.interface";

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.scss']
})
export class BasicDialogComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataInterface) { }
}

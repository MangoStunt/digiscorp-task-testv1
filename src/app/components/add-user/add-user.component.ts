import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {UserInterface} from "../../interfaces/user.interface";
import {filter} from "rxjs";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  @Output() newUserEvent = new EventEmitter<UserInterface>()

  constructor(private dialog: MatDialog) { }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      height: '400px'
    })

    dialogRef.afterClosed()
      .pipe(filter(val => val))
      .subscribe(user => {
        this.newUserEvent.emit(user);
      })
  }
}

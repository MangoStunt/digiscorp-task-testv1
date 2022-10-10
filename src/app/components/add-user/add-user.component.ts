import {MatDialog} from "@angular/material/dialog";
import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {filter} from "rxjs";

import {AddUserDialogComponent} from "../dialogs/add-user-dialog/add-user-dialog.component";
import {UserInterface} from "../../interfaces/user.interface";
import {addUsers} from "../../store/user.action";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  constructor(
    private dialog: MatDialog,
    private store: Store<{ usersList: UserInterface[] }>
  ) {}

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      height: '400px'
    });

    dialogRef.afterClosed()
      .pipe(filter(val => val))
      .subscribe(user =>
        this.store.dispatch(
          addUsers({
            usersList: [{...user, dateOfAdding: new Date()}]
          })
        )
      );
  }
}

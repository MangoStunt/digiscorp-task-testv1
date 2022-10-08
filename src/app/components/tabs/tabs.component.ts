import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../interfaces/user.interface";
import {selectUsers} from "../../store/user.selector";
import {Store} from "@ngrx/store";
import {distinctUntilChanged, tap} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  public usersList!: UserInterface[];
  public usersListIndexes: string[] = [];
  public usersListIds: string[] = [];
  public selectedUsers: Set<UserInterface> = new Set;
  public tabSelectControl: FormControl = new FormControl('');
  constructor(private store: Store<{ usersList: UserInterface[] }>) { }

  ngOnInit(): void {
    this.selectUsersList()
      .pipe(
        tap((usersList: UserInterface[]) => {
          this.usersList = [...usersList]

          usersList.forEach(user => {
            this.usersListIndexes.push(user.name);
            this.usersListIds.push(this.makeIdFromDate(user.dateOfAdding));
          })
        })
      ).subscribe()

    this.tabSelectControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(controlVal => {
        this.usersList.forEach(user => {
          if (this.makeIdFromDate(user.dateOfAdding) === controlVal || user.name === controlVal) {
            this.selectUser(user)
          }
        })
      })
  }

  selectUsersList() {
    return this.store.select(selectUsers)
  }

  makeIdFromDate(date: Date): string {
    return String(date.valueOf()).replace(/([:.-])\w/g, '')
  }


  selectUser(user: UserInterface) {
    this.selectedUsers.add(user)
    this.usersListIds = this.usersListIds.filter(id => id != this.makeIdFromDate(user.dateOfAdding))
    this.usersListIndexes = this.usersListIndexes.filter(index => index != user.name)
  }

  deselectUser(user: UserInterface) {
    this.selectedUsers.delete(user);
    this.usersListIds.push(this.makeIdFromDate(user.dateOfAdding));
    this.usersListIndexes.push(user.name);
  }
}

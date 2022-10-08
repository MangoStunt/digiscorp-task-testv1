import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInterface} from "../../interfaces/user.interface";
import {selectUsers} from "../../store/user.selector";
import {Store} from "@ngrx/store";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  @Input() searchString$!: Observable<any>;
  @Output() usersListSelectedEvent = new EventEmitter<UserInterface[]>();

  public usersList$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([]);
  public usersListValue!: UserInterface[];

  constructor(private store: Store<{ usersList: UserInterface[] }>) {}

  ngOnInit(): void {
    this.selectUsersList()
      .pipe(
        tap((usersList: UserInterface[]) => {
          this.usersListSelectedEvent.emit(usersList);
          this.usersList$.next(usersList);
          this.usersListValue = [...usersList];
        })
      ).subscribe()

    this.searchString$
      .pipe(
        tap(searchValue =>
          searchValue
            ? this.usersList$.next(
              this.filterUsersList(this.usersList$.getValue(), searchValue)
            )
            : this.usersList$.next(this.usersListValue)
        )
      )
      .subscribe()
  }

  filterUsersList(usersList: UserInterface[], searchString: string): UserInterface[] {
    return usersList.filter(user => user.email.includes(searchString))
  }

  selectUsersList() {
    return this.store.select(selectUsers)
  }
}


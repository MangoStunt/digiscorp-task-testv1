import {Component, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {liveQuery} from "dexie";

import {BasicDialogComponent} from "../dialogs/basic-dialog/basic-dialog.component";
import {UserInterface} from "../../interfaces/user.interface";
import {compareArrays} from "../../utils/compareArray";
import {selectUsers} from "../../store/user.selector";
import {addUsers} from "../../store/user.action";
import {db} from "../../services/db.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() searchString$!: Observable<string>;

  @ViewChild('userInfoDialogTemplate') userDialogTemplate!: TemplateRef<any>;

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHAndler() { this.updateDb(this.usersListValue, this.oldUsersListValue) }

  public usersList$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([]);
  private usersListSelector$: Observable<UserInterface[]> = this.store.select(selectUsers);
  private endSubscription: Subject<void> = new Subject();
  private oldUsersListValue!: UserInterface[];
  private usersListValue!: UserInterface[];

  constructor(
    private store: Store<{ usersList: UserInterface[] }>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //GET users list from our indexed DB and set Store value
    liveQuery(
      () => db.usersListTable.toArray()
    )
    .subscribe(
      (dbUsersListsStates: UserInterface[][] | undefined ) => {
        this.setUsersFromDB(dbUsersListsStates?.at(-1))
      });

    //SELECT users list from store and show
    this.usersListSelector$
      .pipe(
        tap((usersList: UserInterface[]) => {
          this.usersList$.next(usersList);
          this.usersListValue = [...usersList];
        }),
        takeUntil(this.endSubscription)
      ).subscribe()

    //Subscribe to search string and filter the list
    this.searchString$
      .pipe(
        tap(text => console.log(text)),
        tap(searchValue =>
          searchValue
            ? (
                this.usersList$.next(this.usersListValue),
                this.usersList$.next(this.filterUsersList(this.usersList$.getValue(), searchValue))
            )
            : this.usersList$.next(this.usersListValue)
        ),
        takeUntil(this.endSubscription)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    //Unsubscribe from subscriptions
    this.endSubscription.next();
    this.endSubscription.complete();
  }


  private filterUsersList(usersList: UserInterface[], searchString: string): UserInterface[] {
    return usersList.filter(user => user.email.includes(searchString))
  }

  private async updateDb(usersList: UserInterface[], oldUsersList: UserInterface[]) {
    if (!compareArrays(usersList, oldUsersList)) await db.usersListTable.add(this.usersListValue);
  }

  private setUsersFromDB(dbUsersList: UserInterface[] | undefined) {
    dbUsersList
      ? (this.oldUsersListValue = dbUsersList, this.setUsersToStore(dbUsersList))
      : (this.oldUsersListValue = [], this.setUsersToStore([]))
  }

  private setUsersToStore(usersList: UserInterface[]) {
    this.store.dispatch(addUsers({ usersList: usersList }))
  }

  public openUserInfoDialog(user: UserInterface) {
    this.dialog.open(BasicDialogComponent, {
      width: '400px',
      height: '300px',
      data: {
        title: `User: ${user.name}`,
        contentTemplate: this.userDialogTemplate,
        templateContext: user
      }
    })
  }
}

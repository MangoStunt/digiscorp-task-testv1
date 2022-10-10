import {distinctUntilChanged, filter, tap} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Store} from "@ngrx/store";

import {UserTabInterface} from "../../interfaces/tabs.interface";
import {UserInterface} from "../../interfaces/user.interface";
import {selectUsers} from "../../store/user.selector";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  public usersTabList: Map<number, UserInterface> = new Map<number, UserInterface>;
  public selectedTabs: Set<UserTabInterface> = new Set<UserTabInterface>;
  public tabSelectControl: FormControl = new FormControl('');
  public usersTabIndexes: number[] = [];

  constructor(private store: Store<{ usersList: UserInterface[] }>) {
  }

  ngOnInit(): void {
    this.selectUsersList()
      .pipe(
        tap((usersList: UserInterface[]) =>
          usersList.forEach((user, index) => {
              index += 1
              this.usersTabList.set(index, user)
              this.usersTabIndexes.push(index);
              this.usersTabIndexes = [...new Set(this.usersTabIndexes)];
            }
          )))
      .subscribe()

    this.tabSelectControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter(val => val)
      )
      .subscribe(controlVal => {
        this.selectTab(controlVal);
        this.usersTabIndexes = this.usersTabIndexes.filter(index => index != controlVal);
      })
  }

  selectUsersList() {
    return this.store.select(selectUsers)
  }

  selectTab(index: number) {
    this.selectedTabs.add({index, userInfo: this.usersTabList.get(index)})
  }

  deselectTab(userTab: UserTabInterface) {
    this.selectedTabs.delete(userTab);
    this.usersTabIndexes.push(userTab.index);
    //Need to make this one hack to prevent unexpected behavior
    this.tabSelectControl.setValue('');
  }
}

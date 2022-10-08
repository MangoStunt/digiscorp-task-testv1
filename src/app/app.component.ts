import {Component, HostListener, OnInit} from '@angular/core';
import {UserInterface} from "./interfaces/user.interface";
import {Store} from "@ngrx/store";
import {CookiesService} from "./services/cookie.service";
import {CookieKeyEnum} from "./utils/cookie.enum";
import {addUsers} from "./store/user.action";
import {isJsonString} from "./utils/isJSON";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHAndler() {
    this.addUsersToCookieStorage();
  }

  public newUsersList: UserInterface[] = [];
  public oldUsersList!: UserInterface[];
  public searchInput!: FormControl;
  public searchInputValue$!: Observable<any>;

  private readonly usersCookieData!: string;

  constructor(private cookieStorageService: CookiesService, private store: Store<{ users: UserInterface[] }>) {
    this.usersCookieData = this.cookieStorageService.getCookies(CookieKeyEnum.USERS_STORAGE_KEY);
  }

  ngOnInit(): void {
    this.cleanStorage();
    this.searchInput = new FormControl('')

    this.searchInputValue$ = this.searchInput.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged()
      )

    this.store.dispatch(
      addUsers({
        usersList: isJsonString(this.usersCookieData)
          ? JSON.parse(this.usersCookieData)
          : []
      })
    )
  }

  public storeAddedUser(user: UserInterface) {
    this.newUsersList.push({...user, dateOfAdding: new Date()})
  }

  public storeOldUsers(usersList: UserInterface[]) {
    this.oldUsersList = [...usersList];
  }

  private addUsersToCookieStorage() {
    this.cookieStorageService.setCookies(CookieKeyEnum.USERS_STORAGE_KEY, [...this.oldUsersList, ...this.newUsersList]);
  }

  private cleanStorage() {
    this.cookieStorageService.cleanCookies(CookieKeyEnum.USERS_STORAGE_KEY);
  }
}

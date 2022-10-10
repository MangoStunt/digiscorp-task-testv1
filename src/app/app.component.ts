import {debounceTime, distinctUntilChanged, Observable} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public searchInputValue$!: Observable<any>;
  public searchInput!: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.searchInput = new FormControl('')

    this.searchInputValue$ = this.searchInput.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged()
      )
  }
}

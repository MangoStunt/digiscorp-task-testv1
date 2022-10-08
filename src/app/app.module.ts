import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {StoreModule} from '@ngrx/store';
import {userReducer} from "./store/user.reducer";
import {AddUserDialogComponent} from './components/add-user-dialog/add-user-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {CookieModule} from "ngx-cookie";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {TabComponent} from './components/tab/tab.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserListComponent,
    TabsComponent,
    AddUserDialogComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CookieModule.withOptions({expires: new Date(Date.now() + 1000000000 * 100000000)}),
    StoreModule.forRoot({users: userReducer}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatTabsModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

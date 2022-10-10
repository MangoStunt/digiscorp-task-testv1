import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from '@angular/platform-browser';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';

import {AddUserDialogComponent} from './components/dialogs/add-user-dialog/add-user-dialog.component';
import {BasicDialogComponent} from './components/dialogs/basic-dialog/basic-dialog.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabComponent} from './components/tab/tab.component';
import {environment} from '../environments/environment';
import {userReducer} from "./store/user.reducer";
import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserListComponent,
    TabsComponent,
    AddUserDialogComponent,
    TabComponent,
    BasicDialogComponent
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
    StoreModule.forRoot({users: userReducer}),
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
export class AppModule {}

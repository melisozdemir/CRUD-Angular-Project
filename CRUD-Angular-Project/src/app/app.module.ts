import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AppRoutingModule } from './app-routing.module';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {AngularFireModule} from "@angular/fire";
// import {AngularFireDatabaseModule} from "@angular/fire/database";
// import { environment } from 'src/environments/environment';
// import {AngularFireStoreModule} from "@angular/fire/firestore";


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-right"
    }),
    // AngularFireModule.initializApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFireStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

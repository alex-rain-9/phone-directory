import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeOutputComponent } from './components/employee-output/employee-output.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { DepartmentOutputComponent } from './components/department-output/department-output.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {SharedService} from "./shared.service";

const firebaseConfig = {
  apiKey: "AIzaSyADvo1SUYZbkzRDWgbYcclCsOOVAAy9tbc",
  authDomain: "phonedirectorydb.firebaseapp.com",
  databaseURL: "https://phonedirectorydb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "phonedirectorydb",
  storageBucket: "phonedirectorydb.appspot.com",
  messagingSenderId: "494105144",
  appId: "1:494105144:web:ab460a7917c033c272eccd"
};


@NgModule({
  declarations: [
    AppComponent,
    EmployeeOutputComponent,
    EmployeeAddComponent,
    DepartmentAddComponent,
    DepartmentOutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

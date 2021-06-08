import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table'
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';

import {fakultetComponent} from '../app/components/Project/fakultet/fakultet-component';
import {studentComponent} from '../app/components/Project/student/student.component';
import {departmanComponent} from '../app/components/Project/departman/departman.component';
import {statusComponent} from '../app/components/Project/status/status.component';


import { FakultetDialogComponent } from './components/dialogs/fakultet-dialog/fakultet-dialog.component';
import { StatusDialogComponent } from './components/dialogs/status-dialog/status-dialog.component';
import { DepartmanDialogComponent } from './components/dialogs/departman-dialog/departman-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { StudentDialogComponent } from './components/dialogs/student-dialog/student-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './components/Project/home/home.component';
import { AuthorComponent } from './components/Project/author/author.component';
import { OnamaComponent } from './components/Project/onama/onama.component';

@NgModule({
  declarations: [
    AppComponent,
    fakultetComponent,
    studentComponent,
    departmanComponent,
    statusComponent,
    FakultetDialogComponent,
    StatusDialogComponent,
    DepartmanDialogComponent,
    StudentDialogComponent,
    HomeComponent,
    AuthorComponent,
    OnamaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {fakultetComponent} from '../app/components/Project/fakultet/fakultet-component';
import {studentComponent} from '../app/components/Project/student/student.component';
import {departmanComponent} from '../app/components/Project/departman/departman.component';
import {statusComponent} from '../app/components/Project/status/status.component';
import { HomeComponent } from './components/Project/home/home.component';
import { AuthorComponent } from './components/Project/author/author.component';
import { OnamaComponent } from './components/Project/onama/onama.component';


const routes: Routes = [

  {path: 'fakultet', component: fakultetComponent},
  {path: 'departman', component: departmanComponent},
  {path: 'status', component: statusComponent},
  {path: 'student', component: studentComponent},
  {path: 'home', component: HomeComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'about', component: OnamaComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

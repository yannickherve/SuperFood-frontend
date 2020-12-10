import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModeratorDashboardComponent} from './moderator-dashboard/moderator-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full' ,
    component: ModeratorDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }

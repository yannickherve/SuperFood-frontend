import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {DashboardNavigationComponent} from './dashboard-navigation/dashboard-navigation.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardNavigationComponent,
    children: [
      { path: 'profile', component: UserProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

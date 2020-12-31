import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {DashboardNavigationComponent} from './dashboard-navigation/dashboard-navigation.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {UserOrdersComponent} from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardNavigationComponent,
    children: [
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      {path: 'orders', component: UserOrdersComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

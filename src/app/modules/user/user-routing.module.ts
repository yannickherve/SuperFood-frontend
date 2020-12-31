import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {DashboardNavigationComponent} from './dashboard-navigation/dashboard-navigation.component';
import {OrderViewComponent} from '../order/order-view/order-view.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardNavigationComponent,
    children: [
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      {path: 'order-view', component: OrderViewComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

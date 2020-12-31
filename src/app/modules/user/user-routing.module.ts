import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {DashboardNavigationComponent} from './dashboard-navigation/dashboard-navigation.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardNavigationComponent,
    children: [
      { path: '', component: UserDashboardComponent, canActivate: [AuthGuard]},
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      {path: 'orders', component: UserOrdersComponent, canActivate: [AuthGuard] },
      {
        path: 'addresses',
        loadChildren: () => import('../address/address.module').then(m => m.AddressModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

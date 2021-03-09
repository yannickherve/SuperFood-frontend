import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModeratorDashboardComponent} from './moderator-dashboard/moderator-dashboard.component';
import {ModeratorDashboardHomeComponent} from './moderator-dashboard-home/moderator-dashboard-home.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {ModeratorProfileComponent} from './moderator-profile/moderator-profile.component';
import {ManageRestaurantsComponent} from './manage-restaurants/manage-restaurants.component';

const routes: Routes = [
  {
    path: '',
    component: ModeratorDashboardComponent,
    children: [
      {path: '', component: ModeratorDashboardHomeComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ModeratorProfileComponent, canActivate: [AuthGuard]},
      {path: 'restaurants', component: ManageRestaurantsComponent, canActivate: [AuthGuard]},
      {
        path: 'addresses',
        loadChildren: () => import('../address/address.module').then(m => m.AddressModule)
      },
      {
        path: 'resto',
        loadChildren: () => import('../restaurants/restaurants.module').then(m => m.RestaurantsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }

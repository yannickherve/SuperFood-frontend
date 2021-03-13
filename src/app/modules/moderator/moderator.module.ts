import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { ManageRestaurantsComponent } from './manage-restaurants/manage-restaurants.component';
import { ModeratorProfileComponent } from './moderator-profile/moderator-profile.component';
import { ModeratorDashboardHomeComponent } from './moderator-dashboard-home/moderator-dashboard-home.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [ModeratorDashboardComponent, ManageRestaurantsComponent, ModeratorProfileComponent, ModeratorDashboardHomeComponent],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    SharedModule
  ]
})
export class ModeratorModule { }

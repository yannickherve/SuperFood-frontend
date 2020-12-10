import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { ManageRestaurantsComponent } from './manage-restaurants/manage-restaurants.component';
import { ModeratorProfileComponent } from './moderator-profile/moderator-profile.component';


@NgModule({
  declarations: [ModeratorDashboardComponent, ManageRestaurantsComponent, ModeratorProfileComponent],
  imports: [
    CommonModule,
    ModeratorRoutingModule
  ]
})
export class ModeratorModule { }

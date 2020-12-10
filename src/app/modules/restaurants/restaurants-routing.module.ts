import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantHomeComponent} from './restaurant-home/restaurant-home.component';

const routes: Routes = [
  { path: '', component: RestaurantHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }

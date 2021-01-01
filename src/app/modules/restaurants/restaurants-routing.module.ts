import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantHomeComponent} from './restaurant-home/restaurant-home.component';
import {RestaurantAddComponent} from './restaurant-add/restaurant-add.component';
import {RoleGuard} from '../../core/guards/role.guard';
import {RestaurantProductsComponent} from './restaurant-products/restaurant-products.component';

const routes: Routes = [
  { path: '', component: RestaurantHomeComponent},
  {
    path: 'restaurant-add',
    component: RestaurantAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'moderator'
    }
  },
  { path: 'restaurant-menu/:id', component: RestaurantProductsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }

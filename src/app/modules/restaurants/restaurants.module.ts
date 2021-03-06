import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantItemComponent } from './restaurant-item/restaurant-item.component';
import { RestaurantViewComponent } from './restaurant-view/restaurant-view.component';
import { RestaurantProductsComponent } from './restaurant-products/restaurant-products.component';

import {SharedModule} from '../../shared/shared.module';
import {ProductsModule} from '../products/products.module';


@NgModule({
  declarations: [
    RestaurantHomeComponent,
    RestaurantListComponent,
    RestaurantAddComponent,
    RestaurantEditComponent,
    RestaurantItemComponent,
    RestaurantViewComponent,
    RestaurantProductsComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    SharedModule,
    ProductsModule
  ]
})
export class RestaurantsModule { }

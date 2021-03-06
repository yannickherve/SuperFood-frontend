import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';
import {SharedModule} from '../../shared/shared.module';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [OrderCreateComponent, OrderViewComponent, OrderDetailsComponent],
  imports: [
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }

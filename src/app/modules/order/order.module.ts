import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderCreateComponent } from './order-create/order-create.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [OrderCreateComponent],
  imports: [
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }

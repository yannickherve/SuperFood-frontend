import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartHomeComponent } from './cart-home/cart-home.component';
import { CartButtonWidgetComponent } from './cart-button-widget/cart-button-widget.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CartHomeComponent, CartButtonWidgetComponent],
  exports: [
    CartButtonWidgetComponent
  ],
  imports: [
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }

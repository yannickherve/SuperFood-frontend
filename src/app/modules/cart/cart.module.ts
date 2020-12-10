import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }

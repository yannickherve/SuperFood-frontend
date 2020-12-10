import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartHomeComponent} from './cart-home/cart-home.component';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: CartHomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderCreateComponent} from './order-create/order-create.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {OrderViewComponent} from './order-view/order-view.component';

const routes: Routes = [
  {path: '', component: OrderCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

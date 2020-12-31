import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddressCreateComponent} from './address-create/address-create.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {AddressViewComponent} from './address-view/address-view.component';
import {AddressEditComponent} from './address-edit/address-edit.component';

const routes: Routes = [
  { path: '', component: AddressViewComponent, canActivate: [AuthGuard]},
  { path: 'address-create', component: AddressCreateComponent, canActivate: [AuthGuard]},
  { path: 'address-edit/:id', component: AddressEditComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }

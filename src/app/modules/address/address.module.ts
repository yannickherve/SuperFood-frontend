import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressCreateComponent } from './address-create/address-create.component';
import { AddressViewComponent } from './address-view/address-view.component';
import {SharedModule} from '../../shared/shared.module';
import { AddressEditComponent } from './address-edit/address-edit.component';


@NgModule({
  declarations: [AddressCreateComponent, AddressViewComponent, AddressEditComponent],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedModule
  ]
})
export class AddressModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressCreateComponent } from './address-create/address-create.component';
import { AddressViewComponent } from './address-view/address-view.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AddressCreateComponent, AddressViewComponent],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedModule
  ]
})
export class AddressModule { }

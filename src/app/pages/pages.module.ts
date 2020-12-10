import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
})
export class PagesModule { }

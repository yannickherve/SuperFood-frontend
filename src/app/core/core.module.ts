import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import {httpInterceptorProviders} from './http-interceptors';
import { CoreEntryComponent } from './core-entry/core-entry.component';
import {RouterModule} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';


@NgModule({
  declarations: [CoreEntryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    NgxSpinnerModule,
  ],
  providers: [
    httpInterceptorProviders,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ]
})
export class CoreModule { }

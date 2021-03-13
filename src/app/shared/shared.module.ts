import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './materials/material.module';

import { SidenavLeftComponent } from './navigation/sidenav-left/sidenav-left.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidebarItemComponent } from './navigation/sidebar-item/sidebar-item.component';
import { FooterComponent } from './navigation/footer/footer.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [SidenavLeftComponent, HeaderComponent, SidebarItemComponent,
    FooterComponent, UpdateUserDialogComponent, FileUploadComponent],
    imports: [
        RouterModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule,
        MaterialModule,
        DragDropModule,
        CommonModule,
    ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    SidenavLeftComponent,
    FooterComponent,
    NgxSpinnerModule,
    CommonModule
  ]
})
export class SharedModule { }

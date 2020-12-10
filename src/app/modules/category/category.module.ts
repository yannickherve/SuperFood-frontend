import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryHomeComponent } from './category-home/category-home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryAddComponent } from './category-add/category-add.component';


@NgModule({
  declarations: [CategoryHomeComponent, CategoryListComponent, CategoryItemComponent, CategoryEditComponent, CategoryAddComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductViewComponent} from './product-view/product-view.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CartModule} from '../cart/cart.module';


@NgModule({
    declarations: [
        ProductListComponent,
        ProductViewComponent,
        ProductEditComponent,
        ProductAddComponent,
        ProductItemComponent,
        ProductHomeComponent
    ],
    exports: [
        ProductHomeComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        SharedModule,
        NgxSpinnerModule,
        CartModule
    ]
})
export class ProductsModule {
}

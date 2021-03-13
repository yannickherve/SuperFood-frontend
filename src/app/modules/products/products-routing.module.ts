import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductHomeComponent} from './product-home/product-home.component';
import {ProductViewComponent} from './product-view/product-view.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {RoleGuard} from '../../core/guards/role.guard';

const routes: Routes = [
  {path: 'products', component: ProductHomeComponent},
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
  },
  {
    path: 'product-add', component: ProductAddComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'moderator'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}

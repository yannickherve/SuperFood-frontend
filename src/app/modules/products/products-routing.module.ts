import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductHomeComponent} from './product-home/product-home.component';
import {ProductViewComponent} from './product-view/product-view.component';

const routes: Routes = [
  { path: 'products', component: ProductHomeComponent },
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
  },
  // {
  //   path: 'cart',
  //   loadChildren: () => import('../cart/cart.module').then((m) => m.CartModule),
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

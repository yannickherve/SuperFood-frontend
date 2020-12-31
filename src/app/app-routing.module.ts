import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreEntryComponent} from './core/core-entry/core-entry.component';


const routes: Routes = [
  {
    path: '',
    component: CoreEntryComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'products-center',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'restaurants-center',
        loadChildren: () =>
          import('./modules/restaurants/restaurants.module').then(
            (m) => m.RestaurantsModule
          ),
      },
      {
        path: 'cart-center',
        loadChildren: () => import('./modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'order-center',
        loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'moderator',
        loadChildren: () => import('./modules/moderator/moderator.module').then(m => m.ModeratorModule)
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

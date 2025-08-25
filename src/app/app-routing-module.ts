import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from './core/constants/app-const';

const routes: Routes = [
  {
    path: PATHS.AUTH,
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: PATHS.PRODUCTS,
    loadChildren: () =>
      import('./features/products/products-module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: PATHS.CART,
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: PATHS.ADMIN,
    loadChildren: () =>
      import('./features/admin/admin-module').then((m) => m.AdminModule),
  },
  {
    path: PATHS.THIS,
    redirectTo: PATHS.PRODUCTS,
    pathMatch: 'full',
  },
  {
    path: PATHS.NOT_FOUND,
    redirectTo: PATHS.PRODUCTS,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

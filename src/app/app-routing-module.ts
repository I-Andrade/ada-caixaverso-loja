import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
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
    path: PATHS.THIS,
    redirectTo: PATHS.PRODUCTS,
    pathMatch: 'full',
  },
  // {
  //   path: PATHS.NOT_FOUND,
  //   component: NotFoundComponent, // TODO: Implement a NotFoundComponent

  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

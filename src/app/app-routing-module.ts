import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products-module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent, // TODO: Implement a NotFoundComponent

  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

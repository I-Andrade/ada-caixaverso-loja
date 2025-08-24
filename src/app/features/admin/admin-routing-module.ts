import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './products/products.component';
import { AdminGuard } from '../../core/auth/admin-guard';
import { PATHS } from '../../core/constants/app-const';

const routes: Routes = [
  {
    path: PATHS.ADMIN_PRODUCTS,
    component: AdminProductsComponent,
    // canActivate: [AdminGuard],
  },
  {
    path: PATHS.THIS,
    redirectTo: PATHS.ADMIN_PRODUCTS,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

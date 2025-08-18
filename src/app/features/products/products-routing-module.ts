import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from './list/list';
import { Details } from './details/details';
import { PATHS } from '../../core/constants/app-const';

const routes: Routes = [
  {
    path: PATHS.LIST,
    component: List,
  },
  {
    path: PATHS.DETAILS_ID,
    component: Details,
  },
  {
    path: PATHS.THIS,
    redirectTo: PATHS.LIST,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

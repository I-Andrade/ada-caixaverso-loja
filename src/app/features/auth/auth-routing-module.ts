import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { PATHS } from '../../core/constants/app-const';

const routes: Routes = [
  { path: PATHS.LOGIN, component: Login },
  { path: PATHS.REGISTER, component: Register },
  { path: PATHS.THIS, redirectTo: PATHS.LOGIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

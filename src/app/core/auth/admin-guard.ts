import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { PATHS } from '../constants/app-const';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUserSignal();
    if (user() && user()?.role === 'admin') {
      return true;
    }
    this.router.navigate([PATHS.BASE]);
    return false;
  }
}

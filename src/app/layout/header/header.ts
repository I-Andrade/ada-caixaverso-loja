import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth-service';
import { PATHS, SUBTITLE, TITLE } from '../../core/constants/app-const';
import { UserModel } from '../../shared/models/user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  title = TITLE;
  subtitle = SUBTITLE;
  PATHS = PATHS;

  userSignal = this.authService.getUserSignal();
  isLoggedIn = this.authService.isLoggedIn;
  userFirstNameSignal = this.authService.getUserFirstNameSignal();

  ngOnInit() {}

  logout = () => {
    this.authService.logout();
    this.router.navigate([PATHS.THIS]);
  };
}

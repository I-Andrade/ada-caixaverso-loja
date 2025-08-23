import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth-service';
import { PATHS, SUBTITLE, TITLE } from '../../core/constants/app-const';
import { UserModel } from '../../shared/models/user-model';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart-service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  cartService = inject(CartService);

  title = TITLE;
  subtitle = SUBTITLE;
  PATHS = PATHS;

  userSignal = this.authService.getUserSignal();
  isLoggedIn = this.authService.isLoggedIn;
  userFirstNameSignal = this.authService.getUserFirstNameSignal();
  cartCountSignal = this.cartService.cartCount();

  ngOnInit() {}

  logout = async () => {
    await this.authService.logoutWithConfirm(this.router, PATHS.THIS);
  };
}

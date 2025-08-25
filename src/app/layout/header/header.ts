import { Component, inject, OnInit, HostListener } from '@angular/core';
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
  // Services
  authService = inject(AuthService);
  router = inject(Router);
  cartService = inject(CartService);

  // UI State
  showUserMenu = false;

  // Constantes
  title = TITLE;
  subtitle = SUBTITLE;
  PATHS = PATHS;

  // Signals
  userSignal = this.authService.getUserSignal();
  isLoggedIn = this.authService.isLoggedIn;
  userFirstNameSignal = this.authService.getUserFirstNameSignal();
  cartCountSignal = this.cartService.cartCount;

  // Lifecycle
  ngOnInit() {}

  // Métodos
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.showUserMenu &&
      !target.closest('.user-menu') &&
      !target.closest('.avatar-btn')
    ) {
      this.showUserMenu = false;
    }
  }

  async logout() {
    await this.authService.logoutWithConfirm(this.router, PATHS.LOGIN);
  }
}

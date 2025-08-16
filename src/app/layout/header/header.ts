import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth-service';
import { SUBTITLE, TITLE } from '../../core/constants/app-const';
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

  userSignal = this.authService.getUserSignal();

  ngOnInit() {}

  logout = () => {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  };
}

import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { LoginDto } from '../../../shared/dtos/login-dto';
import { Router } from '@angular/router';
import { PATHS } from '../../../core/constants/app-const';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);

  protected PATHS = PATHS;
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected loading = signal(false);
  protected errorMessage = signal('');
  protected router = inject(Router);

  protected isLoggedIn = this.authService.isLoggedIn;
  protected user = this.authService.getUserSignal();

  constructor() {}

  submit() {
    if (this.form.invalid) return;

    const loginData: LoginDto = this.form.value as LoginDto;

    if (!loginData.email || !loginData.password) {
      this.errorMessage.set('Email e senha são obrigatórios');
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(loginData).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate([PATHS.THIS]);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message || 'Erro ao fazer login');
      },
    });
  }

  async logout() {
    await this.authService.logoutWithConfirm(this.router, PATHS.LOGIN);
  }
}

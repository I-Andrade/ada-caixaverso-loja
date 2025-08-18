import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth-service';
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
  private authService = inject(AuthService);

  protected PATHS = PATHS;

  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected loading = signal(false);
  protected errorMessage = signal('');
  protected router = inject(Router);

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
}

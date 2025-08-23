import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth-service';
import { RegisterDto } from '../../../shared/dtos/register-dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PATHS } from '../../../core/constants/app-const';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  protected PATHS = PATHS;
  loading = signal(false);
  errorMessage = signal('');

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;

    const { password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.errorMessage.set('As senhas não conferem');
      return;
    }

    const userName = this.form.value.name?.trim() || 'costumer';
    const encodedName = encodeURIComponent(userName);
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=128`;

    const registerData: RegisterDto = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      avatar: avatarUrl,
    };

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.register(registerData).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open(
          'Registro realizado com sucesso! Você já pode fazer login.',
          'Fechar',
          { duration: 3000 }
        );
        this.router.navigate([PATHS.AUTH, PATHS.LOGIN]);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err?.error?.message || 'Erro ao registrar');
      },
    });
  }
}

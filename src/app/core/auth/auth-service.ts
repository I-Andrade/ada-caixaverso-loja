import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserModel } from '../../shared/models/user-model';
import { switchMap, tap } from 'rxjs';
import { LoginDto } from '../../shared/dtos/login-dto';
import { RegisterDto } from '../../shared/dtos/register-dto';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints-const';
import { LoginResponseModel } from '../../shared/models/login-response-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loading = signal(false);
  private http: HttpClient = inject(HttpClient);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  private readonly apiUsers = environment.apiUsers;

  private user = signal<UserModel | null>(null);
  public isLoggedIn = computed(() => !!this.user());
  getUserFirstNameSignal = () =>
    computed(() => this.user()?.name?.split(' ')[0] || '');

  getUserSignal = () => this.user;

  constructor() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.fetchUser().subscribe();
    }
  }

  login(data: LoginDto) {
    this.loading.set(true);
    return this.http
      .post<LoginResponseModel>(
        `${this.apiUsers}${API_ENDPOINTS.AUTH.LOGIN}`,
        data
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        }),
        switchMap(() => this.fetchUser()),
        tap({
          error: (err: any) => {
            this.loading.set(false);
            this.snackBar.open(
              `Erro ao fazer login: ${
                err?.error?.message || err?.message || 'Erro desconhecido'
              }`,
              'Fechar',
              { duration: 3500 }
            );
          },
        }),
        tap(() => this.loading.set(false))
      );
  }

  async logoutWithConfirm(router: any, redirectPath: any = null) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Sair da conta',
        message: 'Deseja realmente sair da sua conta?',
      },
    });
    try {
      const confirmed = await firstValueFrom(dialogRef.afterClosed());
      if (confirmed) {
        this.loading.set(true);
        this.user.set(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setTimeout(() => {
          this.loading.set(false);
          if (redirectPath) {
            router.navigate([redirectPath]);
          }
          this.snackBar.open('Logout realizado com sucesso!', 'Fechar', {
            duration: 2500,
          });
        }, 300);
      }
    } catch (err: any) {
      this.loading.set(false);
      this.snackBar.open(
        `Erro ao sair: ${
          err?.error?.message || err?.message || 'Erro desconhecido'
        }`,
        'Fechar',
        { duration: 3500 }
      );
    }
  }

  register(data: RegisterDto) {
    this.loading.set(true);
    return this.http
      .post(`${this.apiUsers}${API_ENDPOINTS.AUTH.USERS}`, data)
      .pipe(
        tap(() => this.loading.set(false)),
        tap({
          error: (err: any) => {
            this.loading.set(false);
            this.snackBar.open(
              `Erro ao registrar: ${
                err?.error?.message || err?.message || 'Erro desconhecido'
              }`,
              'Fechar',
              { duration: 3500 }
            );
          },
        })
      );
  }

  fetchUser() {
    this.loading.set(true);
    this.user.set(null);
    return this.http
      .get<UserModel>(`${this.apiUsers}${API_ENDPOINTS.AUTH.PROFILE}`)
      .pipe(
        tap((user) => {
          this.user.set(user);
          this.loading.set(false);
        }),
        tap({
          error: (err: any) => {
            this.loading.set(false);
            this.snackBar.open(
              `Erro ao buscar usuário: ${
                err?.error?.message || err?.message || 'Erro desconhecido'
              }`,
              'Fechar',
              { duration: 3500 }
            );
          },
        })
      );
  }
}

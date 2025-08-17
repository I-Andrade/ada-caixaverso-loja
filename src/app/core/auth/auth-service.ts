import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../../shared/models/user-model';
import { switchMap, tap } from 'rxjs';
import { LoginDto } from '../../shared/dtos/login-dto';
import { RegisterDto } from '../../shared/dtos/register-dto';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints-const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  // Usuário
  private user = signal<UserModel | null>(null);
  public isLoggedIn = computed(() => !!this.user());

  getUserSignal = () => this.user;

  constructor() {
    const token = localStorage.getItem('auth_token');

    if (token) {
      this.fetchUser().subscribe();
    }
  }

  login(data: LoginDto) {
    return this.http
      .post<{ token: string }>(
        `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
        data,
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.token);
        }),
        switchMap(() => this.fetchUser())
      );
  }

  logout() {
    return this.http
      .post(
        `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGOUT}`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          this.user.set(null);
          localStorage.removeItem('auth_token');
        })
      );
  }

  register(data: RegisterDto) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.AUTH.REGISTER}`, data);
  }

  // Função para buscar o usuário com o token
  fetchUser() {
    // Limpa a variável user antes de buscar
    this.user.set(null);
    return this.http
      .get<UserModel>(`${this.apiUrl}${API_ENDPOINTS.AUTH.ME}`, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          this.user.set(user);
        })
      );
  }
}

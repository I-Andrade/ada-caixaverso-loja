import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
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
  private http: HttpClient = inject(HttpClient);

  private readonly apiUsers = environment.apiUsers;

  // Usuário
  private user = signal<UserModel | null>(null);
  public isLoggedIn = computed(() => !!this.user());

  getUserSignal = () => this.user;

  constructor() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.fetchUser().subscribe();
    }
  }

  login(data: LoginDto) {
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
        switchMap(() => this.fetchUser())
      );
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  register(data: RegisterDto) {
    return this.http.post(`${this.apiUsers}${API_ENDPOINTS.AUTH.USERS}`, data);
  }

  fetchUser() {
    this.user.set(null);
    return this.http
      .get<UserModel>(`${this.apiUsers}${API_ENDPOINTS.AUTH.PROFILE}`)
      .pipe(
        tap((user) => {
          this.user.set(user);
        })
      );
  }
}

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

  private user = signal<UserModel | null>(null);
  private readonly apiUrl = environment.apiUrl;

  constructor() {}

  login(data: LoginDto) {
    return this.http
      .post(`${this.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`, data, {
        withCredentials: true,
      })
      .pipe(switchMap(() => this.fetchUser()));
  }

  logout() {
    return this.http
      .post(
        `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGOUT}`,
        {},
        { withCredentials: true }
      )
      .pipe(tap(() => this.user.set(null)));
  }

  register(data: RegisterDto) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.AUTH.REGISTER}`, data);
  }

  fetchUser() {
    return this.http
      .get<UserModel>(`${this.apiUrl}${API_ENDPOINTS.AUTH.ME}`, {
        withCredentials: true,
      })
      .pipe(tap((user) => this.user.set(user)));
  }

  getUser = computed(() => this.user());
  isLoggedIn = computed(() => !!this.user());
}

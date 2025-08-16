import { Component, inject } from '@angular/core';
import { AuthService } from './core/auth/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  constructor() {}
}

import { Component, inject } from '@angular/core';
import { AuthService } from './core/auth/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: false,
})
export class App {
  constructor() {}
}

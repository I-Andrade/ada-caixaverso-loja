import { Component } from '@angular/core';
import { SUBTITLE, TITLE } from '../../core/constants/app';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  title = TITLE;
  subtitle = SUBTITLE;

  constructor() {
    // Initialization logic can go here if needed
  } 
}

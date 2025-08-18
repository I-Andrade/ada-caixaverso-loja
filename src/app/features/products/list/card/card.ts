import { Component, Input } from '@angular/core';
import { ProductModel } from '../../../../shared/models/product-model';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() product?: ProductModel;
}

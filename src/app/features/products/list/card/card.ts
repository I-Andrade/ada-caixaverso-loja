import { Component, Input, inject } from '@angular/core';
import { AddToCartButtonComponent } from '../../../../shared/components/add-to-cart-button/add-to-cart-button.component';
import { ProductModel } from '../../../../shared/models/product-model';
import { PATHS } from '../../../../core/constants/app-const';
import { CartService } from '../../../../shared/services/cart-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: false,
})
export class Card {
  @Input() product?: ProductModel;
  protected PATHS = PATHS;
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  addToCart($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.product) {
      this.cartService.addItem(this.product);
      this.snackBar.open('Produto adicionado ao carrinho!', 'Fechar', {
        duration: 2500,
      });
    }
  }
}

import { Component, Input, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart-service';
import { ProductModel } from '../../models/product-model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss'],
  standalone: true,
  imports: [MatButton],
})
export class AddToCartButtonComponent {
  @Input() product!: ProductModel;
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.product) {
      this.cartService.addItem(this.product);
      this.snackBar.open('Produto adicionado ao carrinho!', 'Fechar', {
        duration: 2500,
      });
    }
  }
}

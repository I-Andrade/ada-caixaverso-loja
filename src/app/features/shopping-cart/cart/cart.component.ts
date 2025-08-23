import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

import { CartService } from '../../../shared/services/cart-service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PATHS } from '../../../core/constants/app-const';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false,
})
export class CartComponent {
  public cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  public PATHS = PATHS;

  cartItems = this.cartService.cartItems;

  async increaseQty(productId: number) {
    this.cartService.increaseQty(productId);
    this.snackBar.open('Quantidade aumentada!', 'Fechar', { duration: 2000 });
  }

  async decreaseQty(productId: number) {
    const item = this.cartItems().find((i) => i.product.id === productId);
    if (item && item.qty === 1) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Remover Produto',
          message: 'Deseja remover este produto do carrinho?',
        },
      });
      const confirmed = await firstValueFrom(dialogRef.afterClosed());
      if (confirmed) {
        this.cartService.decreaseQty(productId);
        this.snackBar.open('Produto removido do carrinho!', 'Fechar', {
          duration: 2500,
        });
      }
    } else {
      this.cartService.decreaseQty(productId);
      this.snackBar.open('Quantidade reduzida!', 'Fechar', { duration: 2000 });
    }
  }

  async removeProduct(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remover Produto',
        message: 'Deseja remover este produto do carrinho?',
      },
    });
    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    if (confirmed) {
      this.cartService.removeProduct(productId);
      this.snackBar.open('Produto removido do carrinho!', 'Fechar', {
        duration: 2500,
      });
    }
  }

  async clearCart() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Limpar Carrinho',
        message: 'Deseja realmente limpar o carrinho?',
      },
    });
    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    if (confirmed) {
      this.cartService.clearCart();
      this.snackBar.open('Carrinho limpo!', 'Fechar', { duration: 2500 });
    }
  }

  async checkout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Finalizar Compra',
        message: 'Deseja finalizar a compra?',
      },
    });
    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    if (confirmed) {
      this.snackBar.open('Compra finalizada! Obrigado.', 'Fechar', {
        duration: 3000,
      });
      this.cartService.clearCart();
    }
  }
}

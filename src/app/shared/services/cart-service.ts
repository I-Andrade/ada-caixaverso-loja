import { Injectable, signal, computed } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<Array<{ product: ProductModel; qty: number }>>([]);

  isEmpty = computed(() => this.cartItems().length === 0);
  cartCount = computed(() =>
    this.cartItems().reduce(
      (acc: number, item: { product: ProductModel; qty: number }) =>
        acc + item.qty,
      0
    )
  );
  cartTotal = computed(() =>
    this.cartItems().reduce(
      (acc: number, item: { product: ProductModel; qty: number }) =>
        acc + item.product.price * item.qty,
      0
    )
  );

  addItem(product: ProductModel) {
    const items = this.cartItems();
    const idx = items.findIndex(
      (i: { product: ProductModel; qty: number }) => i.product.id === product.id
    );
    if (idx > -1) {
      items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
      this.cartItems.set([...items]);
    } else {
      this.cartItems.set([...items, { product, qty: 1 }]);
    }
  }

  increaseQty(productId: number) {
    const items = this.cartItems();
    const idx = items.findIndex(
      (i: { product: ProductModel; qty: number }) => i.product.id === productId
    );
    if (idx > -1) {
      items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
      this.cartItems.set([...items]);
    }
  }

  decreaseQty(productId: number) {
    const items = this.cartItems();
    const idx = items.findIndex(
      (i: { product: ProductModel; qty: number }) => i.product.id === productId
    );
    if (idx > -1) {
      if (items[idx].qty > 1) {
        items[idx] = { ...items[idx], qty: items[idx].qty - 1 };
        this.cartItems.set([...items]);
      } else {
        this.removeProduct(productId);
      }
    }
  }

  removeProduct(productId: number) {
    const items = this.cartItems().filter(
      (i: { product: ProductModel; qty: number }) => i.product.id !== productId
    );
    this.cartItems.set(items);
  }

  clearCart() {
    this.cartItems.set([]);
  }
}

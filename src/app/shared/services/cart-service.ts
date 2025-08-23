import { Injectable, signal, computed } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Injectable({ providedIn: 'root' })
export class CartService {
  public loading = signal(false);
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
    this.loading.set(true);
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
    this.loading.set(false);
  }

  increaseQty(productId: number) {
    this.loading.set(true);
    const items = this.cartItems();
    const idx = items.findIndex(
      (i: { product: ProductModel; qty: number }) => i.product.id === productId
    );
    if (idx > -1) {
      items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
      this.cartItems.set([...items]);
    }
    this.loading.set(false);
  }

  decreaseQty(productId: number) {
    this.loading.set(true);
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
    this.loading.set(false);
  }

  removeProduct(productId: number) {
    this.loading.set(true);
    const items = this.cartItems().filter(
      (i: { product: ProductModel; qty: number }) => i.product.id !== productId
    );
    this.cartItems.set(items);
    this.loading.set(false);
  }

  clearCart() {
    this.loading.set(true);
    setTimeout(() => {
      this.cartItems.set([]);
      this.loading.set(false);
    }, 1200); // Simula uma requisição, para teste do loading
  }
}

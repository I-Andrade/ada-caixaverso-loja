import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { CartModel, CartProduct } from '../models/cart-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth-service';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints-const';

@Injectable({ providedIn: 'root' })
export class CartService {
  public loading = signal(false);
  cartItems = signal<Array<{ product: ProductModel; qty: number }>>([]);
  cartId: number | null = null;
  private http: HttpClient = inject(HttpClient);
  private apiBase = environment.apiProducts;
  private authService = inject(AuthService);

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

  constructor() {
    this.cartId = Number(localStorage.getItem('cart_id')) || null;
    if (this.cartId) {
      this.fetchCart();
    }

    let lastUserId = 0;
    effect((): void => {
      const userSignal = this.authService.getUserSignal();
      const user = userSignal ? userSignal() : undefined;
      const userId = user?.id ?? 0;
      if (
        userId > 0 &&
        lastUserId === 0 &&
        this.cartItems().length > 0 &&
        this.cartId
      ) {
        this.loading.set(true);
        this.http
          .put(
            `${this.apiBase}${API_ENDPOINTS.CARTS.UPDATE(this.cartId)}`,
            this.getCartPayload()
          )
          .subscribe({
            next: () => this.loading.set(false),
            error: () => this.loading.set(false),
          });
      }
      lastUserId = userId;
    });
  }

  private getCartPayload(): {
    userId: number;
    date: string;
    products: CartProduct[];
  } {
    // Usa o userId do usuário logado, ou 0 se não estiver logado
    return {
      userId: this.authService.getUserSignal()()?.id ?? 0,
      date: new Date().toISOString().split('T')[0],
      products: this.cartItems().map((item) => ({
        productId: item.product.id,
        quantity: item.qty,
      })),
    };
  }

  private fetchCart() {
    if (this.cartId !== null) {
      this.loading.set(true);
      this.http
        .get<CartModel>(
          `${this.apiBase}${API_ENDPOINTS.CARTS.DETAILS(this.cartId)}`
        )
        .subscribe({
          next: (cart) => {
            if (cart && Array.isArray(cart.products)) {
              this.cartItems.set(
                cart.products.map((p) => ({
                  product: { id: p.productId } as ProductModel,
                  qty: p.quantity,
                }))
              );
            } else {
              this.cartItems.set([]);
            }
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        });
    }
  }

  addItem(product: ProductModel) {
    this.loading.set(true);
    const items = this.cartItems();
    const idx = items.findIndex((i) => i.product.id === product.id);
    if (idx > -1) {
      items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
      this.cartItems.set([...items]);
    } else {
      this.cartItems.set([...items, { product, qty: 1 }]);
    }
    // Atualiza na API
    if (this.cartId) {
      this.http
        .put(
          `${this.apiBase}${API_ENDPOINTS.CARTS.UPDATE(this.cartId)}`,
          this.getCartPayload()
        )
        .subscribe(() => {
          this.loading.set(false);
        });
    } else {
      this.http
        .post<CartModel>(
          `${this.apiBase}${API_ENDPOINTS.CARTS.CREATE}`,
          this.getCartPayload()
        )
        .subscribe((cart) => {
          this.cartId = cart.id;
          localStorage.setItem('cart_id', String(cart.id));
          this.loading.set(false);
        });
    }
  }

  increaseQty(productId: number) {
    this.loading.set(true);
    const items = this.cartItems();
    const idx = items.findIndex((i) => i.product.id === productId);
    if (idx > -1) {
      items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
      this.cartItems.set([...items]);
      if (this.cartId) {
        this.http
          .put(
            `${this.apiBase}${API_ENDPOINTS.CARTS.UPDATE(this.cartId)}`,
            this.getCartPayload()
          )
          .subscribe(() => {
            this.loading.set(false);
          });
      }
    } else {
      this.loading.set(false);
    }
  }

  decreaseQty(productId: number) {
    this.loading.set(true);
    const items = this.cartItems();
    const idx = items.findIndex((i) => i.product.id === productId);
    if (idx > -1) {
      if (items[idx].qty > 1) {
        items[idx] = { ...items[idx], qty: items[idx].qty - 1 };
        this.cartItems.set([...items]);
        if (this.cartId) {
          this.http
            .put(
              `${this.apiBase}${API_ENDPOINTS.CARTS.UPDATE(this.cartId)}`,
              this.getCartPayload()
            )
            .subscribe(() => {
              this.loading.set(false);
            });
        }
      } else {
        this.removeProduct(productId);
      }
    } else {
      this.loading.set(false);
    }
  }

  removeProduct(productId: number) {
    this.loading.set(true);
    const items = this.cartItems().filter((i) => i.product.id !== productId);
    this.cartItems.set(items);
    if (this.cartId) {
      this.http
        .put(
          `${this.apiBase}${API_ENDPOINTS.CARTS.UPDATE(this.cartId)}`,
          this.getCartPayload()
        )
        .subscribe(() => {
          this.loading.set(false);
        });
    } else {
      this.loading.set(false);
    }
  }

  clearCart() {
    this.loading.set(true);
    if (this.cartId) {
      this.http
        .delete(`${this.apiBase}${API_ENDPOINTS.CARTS.DELETE(this.cartId)}`)
        .subscribe(() => {
          this.cartItems.set([]);
          localStorage.removeItem('cart_id');
          this.cartId = null;
          this.loading.set(false);
        });
    } else {
      this.cartItems.set([]);
      this.loading.set(false);
    }
  }

  finishPurchase() {
    // Simula finalização: limpa carrinho e remove id
    this.clearCart();
    // Aqui você pode implementar lógica extra, como registrar pedido
  }

  // ...existing code...
}

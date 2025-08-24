import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductModel } from '../models/product-model';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints-const';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Propriedades e sinais
  public loading = signal(false);
  private productsSignal = signal<ProductModel[]>([]);
  private readonly apiProducts = environment.apiProducts;
  private http: HttpClient = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  // Construtor
  constructor() {}

  // Métodos públicos
  public getProductsSignal = () => this.productsSignal;

  getProducts() {
    this.loading.set(true);
    return this.http
      .get<ProductModel[]>(`${this.apiProducts}${API_ENDPOINTS.PRODUCTS.LIST}`)
      .pipe(
        tap({
          next: (products) => {
            this.productsSignal.set(products);
            this.loading.set(false);
          },
          error: (err: any) => {
            this.loading.set(false);
            this.snackBar.open(
              `Erro ao buscar produtos: ${
                err?.error?.message || err?.message || 'Erro desconhecido'
              }`,
              'Fechar',
              { duration: 3500 }
            );
          },
        })
      );
  }

  getProductById(id: string) {
    this.loading.set(true);
    return this.http
      .get<ProductModel>(
        `${this.apiProducts}${API_ENDPOINTS.PRODUCTS.DETAILS(id)}`
      )
      .pipe(
        tap({
          next: () => this.loading.set(false),
          error: (err: any) => {
            this.loading.set(false);
            this.snackBar.open(
              `Erro ao buscar produto: ${
                err?.error?.message || err?.message || 'Erro desconhecido'
              }`,
              'Fechar',
              { duration: 3500 }
            );
          },
        })
      );
  }

  createProduct(product: Partial<ProductModel>) {
    this.loading.set(true);
    return this.http
      .post<ProductModel>(
        `${this.apiProducts}${API_ENDPOINTS.PRODUCTS.CREATE}`,
        product
      )
      .pipe(
        tap({
          next: (created) => {
            const products = [...this.productsSignal(), created];
            this.productsSignal.set(products);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        })
      );
  }

  updateProduct(id: string, product: Partial<ProductModel>) {
    this.loading.set(true);
    return this.http
      .put<ProductModel>(
        `${this.apiProducts}${API_ENDPOINTS.PRODUCTS.UPDATE(id)}`,
        product
      )
      .pipe(
        tap({
          next: (updated) => {
            const products = this.productsSignal().map((p) =>
              p.id === Number(id) ? { ...p, ...updated } : p
            );
            this.productsSignal.set(products);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        })
      );
  }

  deleteProduct(id: string) {
    this.loading.set(true);
    return this.http
      .delete(`${this.apiProducts}${API_ENDPOINTS.PRODUCTS.DELETE(id)}`)
      .pipe(
        tap({
          next: () => {
            const products = this.productsSignal().filter(
              (p) => p.id !== Number(id)
            );
            this.productsSignal.set(products);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        })
      );
  }
}

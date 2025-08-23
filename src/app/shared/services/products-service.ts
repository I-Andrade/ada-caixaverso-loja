import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductModel } from '../models/product-model';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints-const';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public loading = signal(false);
  private http: HttpClient = inject(HttpClient);

  private readonly apiProducts = environment.apiProducts;

  private productsSignal = signal<ProductModel[]>([]);

  public getProductsSignal = () => this.productsSignal;

  constructor() {}

  getProducts() {
    this.loading.set(true);
    return this.http
      .get<ProductModel[]>(`${this.apiProducts}${API_ENDPOINTS.PRODUCTS.LIST}`)
      .pipe(
        tap((products) => {
          this.productsSignal.set(products);
          this.loading.set(false);
        })
      );
  }

  getProductById(id: string) {
    this.loading.set(true);
    return this.http
      .get<ProductModel>(
        `${this.apiProducts}${API_ENDPOINTS.PRODUCTS.DETAILS(id)}`
      )
      .pipe(tap(() => this.loading.set(false)));
  }
}

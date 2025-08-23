import { Component, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../../../shared/services/products-service';
import { ProductModel } from '../../../shared/models/product-model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public productsService = inject(ProductsService);

  protected productsSignal = this.productsService.getProductsSignal();
  protected totalProducts = signal<number>(0);

  protected searchTermSignal = signal<string>('');
  protected filteredProducts = signal<ProductModel[]>([]);

  protected pageSizeOptions = [5, 10, 20, 30, 50, 100];
  protected pageSize = signal<number>(10);
  protected pageIndex = signal<number>(0);
  protected displayedProducts = signal<ProductModel[]>([]);

  constructor() {
    effect(() => {
      this.filteredProducts.set(
        this.productsSignal().filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(this.searchTermSignal().toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.searchTermSignal().toLowerCase())
        )
      );
    });

    effect(() => {
      const startIndex = this.pageIndex() * this.pageSize();
      const endIndex = startIndex + this.pageSize();
      this.displayedProducts.set(
        this.filteredProducts().slice(startIndex, endIndex)
      );
    });

    effect(() => {
      this.totalProducts.set(this.filteredProducts().length);
    });

    this.productsService.getProducts().subscribe();
  }

  ngOnInit() {}

  onSearchTermChange(term: string) {
    this.searchTermSignal.set(term);
    this.pageIndex.set(0);
  }

  onPageChange(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }
}

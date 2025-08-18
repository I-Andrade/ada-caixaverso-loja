import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products-service';
import { ProductModel } from '../../../shared/models/product-model';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  private productId = signal<string | null>(null);
  protected product = signal<ProductModel | null>(null);

  constructor() {
    effect(() => {
      let productId = this.productId();

      if (productId === null) {
        this.product.set(null);
      } else {
        this.productService.getProductById(productId).subscribe((product) => {
          this.product.set(product);
        });
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId.set(params.get('id'));
    });
  }
}

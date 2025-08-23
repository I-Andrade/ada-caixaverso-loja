import { Component, effect, inject, signal } from '@angular/core';
import { AddToCartButtonComponent } from '../../../shared/components/add-to-cart-button/add-to-cart-button.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products-service';
import { ProductModel } from '../../../shared/models/product-model';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.scss',
  standalone: false,
})
export class Details {
  private activatedRoute = inject(ActivatedRoute);
  public productService = inject(ProductsService);

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

  addToCart() {
    const product = this.product();
    if (product) {
      window.alert(`Produto "${product.title}" adicionado ao carrinho!`);
    }
  }
}

import { Component, inject, signal, effect } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductsService } from '../../../shared/services/products-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProductModel } from '../../../shared/models/product-model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: false,
})
export class AdminProductsComponent {
  // Função para identificar linha vazia na tabela
  isEmptyRow = () => this.displayedProducts().length === 0;
  // Objeto fictício para linha de vazio
  showFormDialog = signal(false);
  editingProduct = signal<ProductModel | null>(null);

  openAddProductDialog() {
    this.editingProduct.set(null);
    this.showFormDialog.set(true);
  }

  openEditProductDialog(product: ProductModel) {
    this.editingProduct.set(product);
    this.showFormDialog.set(true);
  }

  onFormDialogClose(result: any) {
    this.showFormDialog.set(false);
    if (!result) {
      this.editingProduct.set(null);
      return;
    }
    const editing = this.editingProduct();
    if (editing) {
      // Editar produto
      this.productsService
        .updateProduct(editing.id.toString(), result)
        .subscribe({
          next: () => {
            this.snackBar.open('Produto editado com sucesso!', 'Fechar', {
              duration: 2500,
            });
          },
          error: () => {
            this.snackBar.open('Erro ao editar produto!', 'Fechar', {
              duration: 2500,
            });
          },
        });
    } else {
      // Adicionar produto
      this.productsService.createProduct(result).subscribe({
        next: () => {
          this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', {
            duration: 2500,
          });
        },
        error: () => {
          this.snackBar.open('Erro ao adicionar produto!', 'Fechar', {
            duration: 2500,
          });
        },
      });
    }
    this.editingProduct.set(null);
  }
  public productsService = inject(ProductsService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  productsSignal = this.productsService.getProductsSignal();
  loading = this.productsService.loading;
  searchTerm = signal('');
  filteredProducts = signal<ProductModel[]>([]);
  pageIndex = signal(0);
  pageSize = signal(5);
  displayedProducts = signal<ProductModel[]>([]);

  constructor() {
    effect(() => {
      const term = this.searchTerm().toLowerCase();
      this.filteredProducts.set(
        this.productsSignal().filter((p) =>
          p.title.toLowerCase().includes(term)
        )
      );
    });

    effect(() => {
      const start = this.pageIndex() * this.pageSize();
      const end = start + this.pageSize();
      const filtered = this.filteredProducts();
      let pageItems = filtered.slice(start, end);
      // Se a página ficou vazia mas ainda há produtos, resetar paginação
      if (
        pageItems.length === 0 &&
        filtered.length > 0 &&
        this.pageIndex() > 0
      ) {
        this.pageIndex.set(0);
        pageItems = filtered.slice(0, this.pageSize());
      }
      this.displayedProducts.set(pageItems);
    });

    this.productsService.getProducts().subscribe();
  }

  async deleteProduct(product: ProductModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remover Produto',
        message: `Deseja remover o produto "${product.title}"?`,
      },
    });
    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    if (confirmed) {
      this.productsService.deleteProduct(product.id.toString()).subscribe({
        next: () => {
          this.snackBar.open('Produto removido com sucesso!', 'Fechar', {
            duration: 2500,
          });
          // Se a página ficou vazia mas ainda há produtos, resetar paginação
          setTimeout(() => {
            if (
              this.displayedProducts().length === 0 &&
              this.productsSignal().length > 0
            ) {
              this.pageIndex.set(0);
            }
          });
        },
        error: () => {
          this.snackBar.open('Erro ao remover produto!', 'Fechar', {
            duration: 2500,
          });
        },
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}

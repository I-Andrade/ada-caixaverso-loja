import { Component, inject, signal, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild, AfterViewInit } from '@angular/core';
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
export class AdminProductsComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<ProductModel>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator: any;
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

  constructor() {
    effect(() => {
      const term = this.searchTerm().toLowerCase();
      const filtered = this.productsSignal().filter((p) =>
        p.title.toLowerCase().includes(term)
      );
      this.filteredProducts.set(filtered);
      this.dataSource.data = filtered;
    });

    this.productsService.getProducts().subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
        },
        error: () => {
          this.snackBar.open('Erro ao remover produto!', 'Fechar', {
            duration: 2500,
          });
        },
      });
    }
  }
}

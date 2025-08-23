import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing-module';
import { List } from './list/list';
import { MatCard, MatCardActions } from '@angular/material/card';
import {
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardFooter,
} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Card } from './list/card/card';
import { Details } from './details/details';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddToCartButtonComponent } from '../../shared/components/add-to-cart-button/add-to-cart-button.component';

@NgModule({
  declarations: [List, Card, Details],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatInputModule,
    MatPaginatorModule,
    MatCardFooter,
    MatCardActions,
    MatIconModule,
    AddToCartButtonComponent,
  ],
})
export class ProductsModule {}

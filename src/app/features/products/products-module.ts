import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing-module';
import { List } from './list/list';
import { MatCard } from '@angular/material/card';
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

@NgModule({
  declarations: [List, Card],
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
  ],
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule,
    ShoppingCartRoutingModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class ShoppingCartModule {}

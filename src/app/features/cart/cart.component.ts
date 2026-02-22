import { Component, inject } from '@angular/core';
import { CartFacade } from '../../facades/cart.facade';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [RouterLink]
})
export class CartComponent {
  readonly cartFacade = inject(CartFacade)

  onQuantityChange(productCode: string, value: string): void {
    const quantity = Number(value);
  this.cartFacade.updateQuantity(productCode, Number.isFinite(quantity) ? quantity : 1);
  }
}

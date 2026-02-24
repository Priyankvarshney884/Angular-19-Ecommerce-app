import { Component,  input,  output } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-details-view',
  standalone: true,
  templateUrl: './product-details-view.component.html',
  styleUrl: './product-details-view.component.scss',
  imports: [RouterLink]
})
export class ProductDetailsViewComponent {
 readonly loading = input.required<boolean>();
  readonly error = input.required<string | null>();
  readonly product = input.required<Product | null>();
  readonly addToCart = output<void>();

 
 onAddToCart(): void {
  this.addToCart.emit();
 }

}

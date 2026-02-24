import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input( {required:true} ) loading = false;
 @Input({required: true}) error:string |null = null;
 @Input ({required :true}) product:Product |null = null;
 @Output() addToCart = new EventEmitter<void>();
 
 onAddToCart(): void {
  this.addToCart.emit();
 }

}

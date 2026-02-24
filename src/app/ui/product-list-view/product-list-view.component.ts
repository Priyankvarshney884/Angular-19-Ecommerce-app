import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductFilter } from '../../facades/product.facade';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list-view.component.html',
  styleUrl: './product-list-view.component.scss'
})
export class ProductListViewComponent {
  readonly loading = input.required<boolean>();
  readonly error = input.required<string | null>();
  readonly products = input.required<Product[]>();
  readonly filters = input<ProductFilter>({
    searchTerm: '',
    minPrice: null,
    maxPrice: null
  });


  @Output() searchTermChange = new EventEmitter<String>();
  @Output() minPriceChange = new EventEmitter<number | null>();
  @Output() maxPriceChange = new EventEmitter<number | null>();
  @Output() clearFilters = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Product>();

  onSearchTermInput(value:string): void {
    this.searchTermChange.emit(value);
  }
  onMinPriceInput(value:string): void {
    const parsedValue = parseFloat(value);
    this.minPriceChange.emit(isNaN(parsedValue) ? null : parsedValue);
  }

  onMaxPriceInput(value:string): void {
    const parsedValue = parseFloat(value);
    this.maxPriceChange.emit(isNaN(parsedValue) ? null : parsedValue);
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }

  onAddToCart(product:Product): void {
    this.addToCart.emit(product);
  }
  

}

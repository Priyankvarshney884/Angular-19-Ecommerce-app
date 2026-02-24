import { Component, inject, OnInit } from '@angular/core';
import { ProductFacade } from '../../facades/product.facade';
import { CartFacade } from '../../facades/cart.facade';
import { Product } from '../../shared/models/product.model';
import { ProductListViewComponent } from "../../ui/product-list-view/product-list-view.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [ProductListViewComponent]
})
export class ProductListComponent implements OnInit {

  readonly productFacade = inject(ProductFacade);
  private readonly cartFacade = inject(CartFacade);

  ngOnInit(): void {
    this.productFacade.loadProducts();
  }

  onSearchTermChange(value: string): void {
    this.productFacade.setSearchTerm(value);
  }

  onMinPriceChange(value: number | null): void {
    this.productFacade.setMinPrice(value);
  }

  onMaxPriceChange(value: number | null): void {
    this.productFacade.setMaxPrice(value);
  }

  clearFilters(): void {
    this.productFacade.clearFilters();
  }

  addToCart(product: Product): void {
    this.cartFacade.addToCart(product);
  }
}
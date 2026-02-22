import { Component, inject } from '@angular/core';
import { ProductFacade } from '../../facades/product.facade';
import { CartFacade } from '../../facades/cart.facade';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [RouterLink]
})
export class ProductListComponent {

  readonly productFacade = inject(ProductFacade);
  private readonly cartFacade = inject(CartFacade);

  ngOnInit(): void {
    this.productFacade.loadProducts();
  }

  onSearhTermChange(value: string): void {
    this.productFacade.setSearchTerm(value);
  }

  onMinPriceChange(value: string): void {
    const parsedValue = Number(value);
    this.productFacade.setMinPrice(value ? parsedValue : null);
  }

  onMaxPriceChange(value: string): void {
    const parsedValue = Number(value);
    this.productFacade.setMaxPrice(value ? parsedValue : null);
  }

  addToCart(productCode: string): void {
     const product = this.productFacade.products().find((item) => item.code === productCode);
    if (product) {
      this.cartFacade.addToCart(product);
    }
  }
  
}

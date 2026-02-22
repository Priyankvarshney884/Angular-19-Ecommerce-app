import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartFacade } from '../../facades/cart.facade';
import { ProductFacade } from '../../facades/product.facade';
import { Product } from '../../shared/models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  imports: [RouterLink]
})
export class ProductDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productFacade = inject(ProductFacade);
  private readonly cartFacade = inject(CartFacade);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly product = signal<Product | null>(null);

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.paramMap.get('code');

    if (!code) {
      this.error.set('Product code is missing in route.');
      this.loading.set(false);
      return;
    }

    await this.loadProduct(code);
  }

  async loadProduct(code: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const foundProduct = await this.productFacade.getProductByCode(code);
      if (!foundProduct) {
        this.error.set('Product not found.');
        this.product.set(null);
      } else {
        this.product.set(foundProduct);
      }
    } catch {
      this.error.set('Unable to load product details.');
      this.product.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  addToCart(): void {
    const selectedProduct = this.product();
    if (selectedProduct) {
      this.cartFacade.addToCart(selectedProduct);
    }
  }
}

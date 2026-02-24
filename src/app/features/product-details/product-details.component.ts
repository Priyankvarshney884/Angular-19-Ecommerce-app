import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartFacade } from '../../facades/cart.facade';
import { ProductFacade } from '../../facades/product.facade';
import { Product } from '../../shared/models/product.model';
import { RouterLink } from '@angular/router';
import { ProductDetailsViewComponent } from '../../ui/product-details-view/product-details-view.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  imports: [ProductDetailsViewComponent]
})
export class ProductDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
   readonly productFacade = inject(ProductFacade);
  private readonly cartFacade = inject(CartFacade);

  readonly routeError = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const code = this.route.snapshot.paramMap.get('code');

    if (!code) {
     this.routeError.set('No product code provided in the route.');
      return;
    }

    await this.productFacade.loadProductByCode(code);
  }


  addToCart(): void {
    const selectedProduct = this.productFacade.selectedProduct ();
    if (selectedProduct) {
      this.cartFacade.addToCart(selectedProduct);
    }
  }
}

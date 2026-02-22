import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/product-list/product-list.component').then((m) => m.ProductListComponent)
  },
  {
    path: 'product/:code',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then((m) => m.ProductDetailsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent)
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];

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
      import('./features/product-list/product-list.component').then((m) => m.ProductListComponent),
    data: { preload: true }
  },
  {
    path: 'product/:code',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
    data: { preload: false }
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    data: { preload: false }
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];

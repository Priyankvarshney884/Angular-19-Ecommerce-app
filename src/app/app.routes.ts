import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
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
    redirectTo: 'home'
  }
];

# Phase 2 Development Log

This document explains exactly what was implemented for Phase 2 and why.

## Goal Covered
Implemented the requested Phase 2 scope:
1. Product list with Signals state (`products`, `loading`, `error`, `filters`) and `@for`
2. Product details as lazy-loaded route
3. Cart with `CartFacade` and computed totals
4. `@if` loading/empty/error blocks

## 1) Mock Data Source Added
- Created `public/mock-api/products.json`

Why:
- Keeps development backend-free (mock API mode)
- Lets adapter layer read realistic product data

## 2) OCC Adapter + Connector Layer Implemented
- Created `src/app/occ/adapters/product.adapter.ts`
- Created `src/app/occ/connectors/product.connector.ts`

Flow used:
- `ProductAdapter` owns URL and `HttpClient`
- `ProductConnector` exposes domain operations to facades

Why:
- Keeps HTTP details out of UI/facades
- Mirrors Spartacus architecture boundaries

## 3) Product Facade Implemented with Signals
- Updated `src/app/facades/product.facade.ts`

State added:
- `products`
- `loading`
- `error`
- `filters`
- `filteredProducts` (`computed`)

Methods added:
- `loadProducts()`
- `getProductByCode(code)`
- `setSearchTerm(...)`
- `setMinPrice(...)`
- `setMaxPrice(...)`
- `clearFilters()`

Why:
- Product list and product details read from one domain state source
- Filtering logic stays reusable and testable

## 4) Cart Facade Implemented with Computed Totals
- Updated `src/app/facades/cart.facade.ts`

State/derived values:
- `items`
- `totalItems` (`computed`)
- `subtotal` (`computed`)

Actions:
- `addToCart(product)`
- `updateQuantity(productCode, quantity)`
- `removeItem(productCode)`
- `clearCart()`

Why:
- Cart behavior remains independent from UI pages
- Any future page can reuse the same cart logic

## 5) Feature Pages Implemented

### Product List
- `src/app/features/product-list/product-list.page.ts`
- `src/app/features/product-list/product-list.page.html`
- `src/app/features/product-list/product-list.page.css`

What it demonstrates:
- Signals-driven rendering from facade
- `@for` for product cards
- `@if` for loading/error/empty states
- Filter inputs updating facade filter signal
- Add-to-cart interaction

### Product Details (Lazy)
- `src/app/features/product-details/product-details.page.ts`
- `src/app/features/product-details/product-details.page.html`
- `src/app/features/product-details/product-details.page.css`

What it demonstrates:
- Lazy route component load
- Route param lookup (`:code`)
- `@if` loading/error/content states
- Add selected product to cart

### Cart
- `src/app/features/cart/cart.page.ts`
- `src/app/features/cart/cart.page.html`
- `src/app/features/cart/cart.page.css`

What it demonstrates:
- `@for` cart rows
- `@if` empty/non-empty behavior
- Reactive totals from computed signals

## 6) Routing and App Shell Wired
- Updated `src/app/app.routes.ts`
- Updated `src/app/app.component.ts`
- Updated `src/app/app.component.html`
- Updated `src/app/app.component.css`

Routes now:
- `/products`
- `/product/:code` (lazy-loaded details)
- `/cart`
- redirect rules for root and unknown paths

Why:
- Gives navigable feature flow for testing architecture

## 7) Development Environment Config Updated
- Updated `src/environments/environment.development.ts`

Change:
- `apiBaseUrl` set to `/mock-api`

Why:
- Adapter can fetch `products.json` directly from app assets in dev mode

## 8) End-to-End Request Flow (Now Working)

```txt
Product List Page
  -> ProductFacade
  -> ProductConnector
  -> ProductAdapter
  -> GET /mock-api/products.json
  -> Facade signals update
  -> UI rerenders through @if/@for
```

## 9) How to Continue Smoothly (Next Step)
Recommended next implementation slice:
1. Add unit tests for `ProductFacade` filter logic and `CartFacade` computed totals.
2. Add a mock error simulation flag to validate error UI states intentionally.
3. Add one reusable `ProductCardComponent` in `shared/ui` for cleaner templates.

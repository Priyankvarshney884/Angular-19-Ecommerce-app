# Phase 4 Development Log

This document explains exactly what was implemented for Phase 4 and why.

## Goal Covered
Implemented the requested Phase 4 scope:
1. Converted component inputs to the `input()` API.
2. Converted component outputs to the `output()` API.
3. Added `@defer` to a below-the-fold product list section.
4. Introduced one `effect()` side effect for cart localStorage sync.

Definition of done achieved:
- Concrete usage of `input()`, `output()`, `@defer`, and `effect()` now exists in working feature flows.

## 1) Presentational Inputs Migrated to `input()`
- Updated `src/app/shared/ui/product-list-view/product-list-view.component.ts`
- Updated `src/app/shared/ui/product-details-view/product-details-view.component.ts`

What changed:
- Replaced `@Input` decorators with signal inputs:
  - `input.required<boolean>()`
  - `input.required<string | null>()`
  - `input.required<Product[]>()`
  - `input.required<Product | null>()`
  - `input<ProductFilters>(...)`

Why:
- Aligns presentational components with Angular 19 function-based APIs.
- Makes input reads signal-based and consistent with other signal usage.

## 2) Presentational Outputs Migrated to `output()`
- Updated `src/app/shared/ui/product-list-view/product-list-view.component.ts`
- Updated `src/app/shared/ui/product-details-view/product-details-view.component.ts`

What changed:
- Replaced `@Output() ... = new EventEmitter<...>()` with:
  - `output<string>()`
  - `output<number | null>()`
  - `output<void>()`
  - `output<Product>()`

Why:
- Uses Angular 19 function-based output API.
- Keeps dumb component event contracts unchanged for containers.

## 3) Templates Updated for Signal Inputs
- Updated `src/app/shared/ui/product-list-view/product-list-view.component.html`
- Updated `src/app/shared/ui/product-details-view/product-details-view.component.html`

What changed:
- Updated template reads from property access to signal calls:
  - `loading` -> `loading()`
  - `error` -> `error()`
  - `products` -> `products()`
  - `filters` -> `filters()`
  - `product` -> `product()`

Why:
- Required by function-based inputs, which are `InputSignal`s.

## 4) Added `@defer` for Below-the-Fold Product Grid
- Updated `src/app/shared/ui/product-list-view/product-list-view.component.html`

What changed:
- Wrapped the product card grid in:
  - `@defer (on viewport) { ... }`
  - `@placeholder { ... }`

Why:
- Defers non-critical card rendering until the deferred section reaches viewport.
- Demonstrates Angular deferrable views in a real feature section.

## 5) Added One `effect()` for Side Effects (Cart Persistence)
- Updated `src/app/facades/cart.facade.ts`

What changed:
- Added Angular `effect()` in `CartFacade` to persist `items()` into `localStorage`.
- Added browser guard via `isPlatformBrowser(...)`.
- Added initial localStorage hydration in constructor to restore previous cart state.

Why:
- Meets Phase 4 requirement for one concrete side-effect usage.
- Keeps cart persistence concern in facade (domain state boundary), not UI components.

## 6) End-to-End Flow Impact (Phase 4)

```txt
Product List Container
  -> passes facade signals to ProductListView input()s
  -> ProductListView renders signal reads
  -> product grid enters viewport
  -> @defer block resolves and renders cards
```

```txt
Cart Domain
  -> user adds/removes/updates cart item
  -> CartFacade.items signal changes
  -> effect() runs
  -> localStorage storefront-cart-items updated
```

## 7) Validation Run
Commands run:
- `./node_modules/.bin/tsc -p tsconfig.app.json --noEmit` (passed)
- `./node_modules/.bin/tsc -p tsconfig.spec.json --noEmit` (passed)

## 8) Recommended Next Step
For Phase 5 readiness:
1. Implement CMS component mapping (`type -> standalone component`).
2. Render home sections from JSON layout config.
3. Keep composition orchestration in container-level components and leave section components presentational.

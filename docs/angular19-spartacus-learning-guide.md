# Angular 19 + Spartacus-Style Learning Project Guide

## 1) Goal
Build one real project that teaches:
- Modern Angular 19 features in practical use
- Enterprise architecture patterns used by SAP Spartacus
- Clean, scalable frontend design for commerce-style applications

Project name suggestion: **`storefront-lab`**.

## 2) What You Already Have
Your current workspace already uses Angular 19:
- `@angular/*`: `^19.2.0`
- `@angular/cli`: `^19.2.20`

So you can start implementing immediately.

## 3) Learning Outcomes
By the end of this project, you should be comfortable with:
- Standalone APIs (`bootstrapApplication`, standalone components, functional providers)
- Signals-based component state (`signal`, `computed`, `effect`)
- Built-in control flow (`@if`, `@for`, `@switch`)
- Deferrable views (`@defer`) for performance
- Function-based `input()` and `output()` APIs
- Route-level code splitting and lazy features
- SSR readiness basics (`@angular/ssr`)
- Facade + Connector + Adapter pattern (core Spartacus architecture idea)
- CMS-driven composition mindset (container/page + pluggable sections)
- i18n, feature flags, and environment-based configuration

## 4) Project Scope (Commerce-Lite, Mock API Only)
Implement a mini storefront with these features:
- Home page with CMS-like sections (hero, promos, featured products)
- Product list page (filter/sort/pagination)
- Product details page
- Cart page (add/remove/update quantity)
- Auth mock page (login/logout placeholder)
- Checkout shell page (multi-step UI, mocked backend)

Backend will be mocked using static JSON + `HttpClient` only (no real backend dependency).

## 5) Architecture (Spartacus-Inspired)
Use this folder structure:

```txt
src/app/
  core/
    auth/
    config/
    http/
    i18n/
    site-context/
  shared/
    models/
    ui/
    pipes/
    directives/
  features/
    home/
    product-list/
    product-details/
    cart/
    checkout/
    auth/
  cms/
    page-layout/
    component-mapper/
  occ/
    adapters/
    connectors/
  facades/
    product.facade.ts
    cart.facade.ts
    auth.facade.ts
  state/
    (optional: ngrx or signal-store style)
```

### Why this mirrors Spartacus best practices
- `facades/`: UI never talks directly to HTTP , from UI we use facade as helper to take care about http related request 
- `connectors/`: domain-level communication layer;, its a domain gateway which help to provide business friendly method to facade to use 
- `adapters/`: low-level endpoint mapping/DTO transformation , it own the transform detail and help in convert the bakend dtp to app model 
- `cms/`: page assembly from reusable blocks
- `core/` vs `features/`: strict separation of reusable infrastructure and business flows

## 6) Implementation Phases (Prioritizing Spartacus Architecture Depth)

## Phase 1: Foundation
1. Keep standalone bootstrapping (`src/main.ts`) as-is.
2. Set up global providers in `src/app/app.config.ts`:
   - `provideRouter(routes)`
   - `provideHttpClient()`
   - optional interceptors (auth token, error mapping)
3. Create domain models in `shared/models`.
4. Add environment config for API base URL + feature toggles.

Definition of done:
- App runs
- Routing works
- Basic shell layout exists

## Phase 2: Core Commerce Features
1. Build `product-list` with:
   - Signal state (`products`, `loading`, `error`, `filters`)
   - `@for` loops for rendering cards
2. Build `product-details` route with lazy loading.
3. Build `cart` with `cartFacade` + computed totals.
4. Use `@if` for loading/empty/error blocks.

Definition of done:
- Browse products, open details, add to cart

## Phase 3: Spartacus-Like Abstractions
1. Implement `ProductFacade` + `ProductConnector` + `ProductAdapter`.
2. Move all API URL construction into adapters.
3. Keep UI components dumb (input/output driven) where possible.

Definition of done:
- Component code does not contain raw HTTP URLs

## Phase 4: Angular 19 Feature Deep Dive
1. Convert component inputs to `input()` API.
2. Convert outputs to `output()` API.
3. Add `@defer` to below-the-fold sections.
4. Introduce one `effect()` for side effects (analytics/logging/localStorage sync).

Definition of done:
- At least one concrete usage of every modern API above

## Phase 5: CMS Composition Pattern
1. Create a simple CMS mapping table:
   - key: component type string
   - value: Angular standalone component
2. Home page receives JSON layout config and renders components dynamically.

Definition of done:
- Home page layout changes by config, not template rewrite

## Phase 6: Performance + SSR + i18n
1. Add SSR: `ng add @angular/ssr`
2. Test hydration compatibility of dynamic sections.
3. Add i18n setup for 2 locales (for example `en` + `de`).
4. Add route-level preloading strategy.

Definition of done:
- SSR build runs
- 2 locale output works

## 7) Recommended Route Design

```ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.page').then(m => m.HomePage) },
  { path: 'products', loadComponent: () => import('./features/product-list/product-list.page').then(m => m.ProductListPage) },
  { path: 'product/:code', loadComponent: () => import('./features/product-details/product-details.page').then(m => m.ProductDetailsPage) },
  { path: 'cart', loadComponent: () => import('./features/cart/cart.page').then(m => m.CartPage) },
  { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.page').then(m => m.CheckoutPage) },
  { path: 'auth', loadComponent: () => import('./features/auth/auth.page').then(m => m.AuthPage) },
];
```

## 8) Example: Facade + Connector + Adapter

```ts
// facades/product.facade.ts
@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly connector = inject(ProductConnector);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);

  async loadProducts(): Promise<void> {
    this.loading.set(true);
    try {
      this.products.set(await firstValueFrom(this.connector.getProducts()));
    } finally {
      this.loading.set(false);
    }
  }
}
```

```ts
// occ/connectors/product.connector.ts
@Injectable({ providedIn: 'root' })
export class ProductConnector {
  private readonly adapter = inject(ProductAdapter);

  getProducts(): Observable<Product[]> {
    return this.adapter.getProducts();
  }
}
```

```ts
// occ/adapters/product.adapter.ts
@Injectable({ providedIn: 'root' })
export class ProductAdapter {
  private readonly http = inject(HttpClient);
  private readonly config = inject(AppConfigService);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.apiBaseUrl}/products`);
  }
}
```

## 9) Example: Angular 19 Template Features

```html
<section>
  @if (loading()) {
    <p>Loading products...</p>
  } @else {
    @for (product of products(); track product.code) {
      <app-product-card [product]="product" (open)="goToDetails(product.code)" />
    }
  }
</section>

@defer (on viewport) {
  <app-recommendations />
} @placeholder {
  <p>Loading recommendations...</p>
}
```

## 10) Personalized Schedule (4 Hours/Week)
This plan assumes steady progress at 4 hours per week.

- Week 1: establish folder boundaries (`core`, `features`, `occ`, `facades`, `cms`) and routing shell
- Week 2: product list with mock API adapter + connector + facade (first full vertical slice)
- Week 3: product details with strict dumb/presentational components
- Week 4: cart domain with computed totals and local persistence
- Week 5: CMS-style home composition from JSON layout + component mapper
- Week 6: Angular 19 deep dive (`input()`, `output()`, `@defer`, `effect`)
- Week 7: i18n + interceptors + config layering (site context mindset)
- Week 8: optional SSR + architecture cleanup + tests + documentation

Target cadence each week:
- Session A (2h): implement one architecture slice
- Session B (2h): refactor, test, and document tradeoffs

## 11) Quality Checklist
- No direct HTTP calls inside feature page components
- Route-level lazy loading everywhere possible
- Signal-first local state for presentational flows
- Smart/dumb component separation
- Error/loading/empty states for every async block
- Typed models only (no `any`)
- Unit tests for facade and adapter layers
- One end-to-end happy-path test (browse -> cart -> checkout shell)

## 12) Commands You’ll Use

```bash
npm install
npm start
npm run build
npm test
```

Optional for SSR:

```bash
ng add @angular/ssr
npm run build
```

## 13) How to Compare With Real Spartacus
When reviewing Spartacus code, map concepts like this:
- Spartacus `Facade` -> your `facades/*`
- Spartacus `Connector` -> your `occ/connectors/*`
- Spartacus `Adapter` -> your `occ/adapters/*`
- Spartacus CMS components -> your `cms/component-mapper/*`
- Spartacus feature libs -> your `features/*` with strict boundaries

This keeps your learning project close to enterprise patterns without the full Spartacus complexity.

## 14) Stretch Goals
- Add NgRx only for cross-feature complex state (not everywhere)
- Add retry + circuit-breaker style logic in adapters
- Add analytics abstraction service
- Add contract tests for adapters
- Add feature-level theming support

## 15) Signals First, Then NgRx Comparison
Recommended path for this project:
- Start with Signals for all feature-local and facade-managed state
- Introduce NgRx only after Week 5, and only for shared/global cross-feature flows

### When Signals are enough
- Product list filters, loading, sort, local cart view state
- Feature state managed by one facade
- Minimal async orchestration complexity

### When NgRx adds value
- Many features reading/writing same global state
- Complex side effects, retries, cancellation, or action history
- Need for time-travel debugging and strict action audit

### Code complexity impact (practical)
Signals-first slice usually needs:
- 1 facade/service
- 0 actions/reducers/effects files
- Faster onboarding and fewer moving parts

NgRx slice for same domain usually adds:
- `actions.ts`
- `reducer.ts`
- `selectors.ts`
- `effects.ts`
- feature state registration + testing surface

In this project, NgRx will likely add 2x to 4x more state-layer files for each migrated domain.

### Example: Signals cart facade (lower complexity)
```ts
@Injectable({ providedIn: 'root' })
export class CartFacade {
  readonly items = signal<CartItem[]>([]);
  readonly total = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  add(item: CartItem): void {
    this.items.update(list => [...list, item]);
  }
}
```

### Example: NgRx cart flow (higher ceremony, better for scale)
```ts
// actions.ts
export const addToCart = createAction('[Cart] Add', props<{ item: CartItem }>());

// reducer.ts
export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item }) => ({ ...state, items: [...state.items, item] }))
);

// selectors.ts
export const selectCartTotal = createSelector(selectCartItems, items =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);
```

Use this rule:
- Default to Signals
- Upgrade specific domains to NgRx only when coordination complexity appears

---

## References
- Angular v19 docs: https://v19.angular.dev
- Signal inputs migration (`v19` production ready): https://angular.dev/reference/migrations/signal-inputs
- Output migration docs: https://v19.angular.dev/reference/migrations/outputs
- SSR guide: https://v19.angular.dev/guide/ssr
- Angular roadmap status: https://v19.angular.dev/roadmap

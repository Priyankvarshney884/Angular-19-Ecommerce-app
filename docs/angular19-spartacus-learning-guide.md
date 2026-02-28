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

Note:
- Phase 1-6 can stay mock-first for fast learning.
- After Phase 6, move to real SAP Commerce OCC APIs (detailed in Section 16).

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

## 16) Post-Phase-6: SAP Commerce (OCC API) Precision Track
After you complete Phase 1-6, switch from mock APIs to SAP Commerce Cloud OCC APIs for real enterprise flow learning.

### 16.1 Prerequisites
- SAP Commerce environment with OCC enabled (`/occ/v2`).
- Valid `baseSite` (example: `electronics-spa`).
- OAuth client credentials for storefront login/token exchange.
- CORS allowlist updated for your Angular dev host.
- One test catalog with products, stock, prices, and at least one checkout-capable store.

### 16.2 Required Runtime Config
Create/extend config keys in your app config service:
- `occ.baseUrl`
- `occ.prefix` (default `/occ/v2`)
- `occ.baseSite`
- `occ.defaultLanguage`
- `occ.defaultCurrency`
- `occ.clientId`
- `occ.clientSecret` (avoid shipping to browser in production; use backend-for-frontend where possible)

### 16.3 Phase 7: OCC Foundation Layer
1. Build `OccEndpointsService` to generate URLs centrally.
2. Add typed OCC DTOs in `occ/models/*`.
3. Add normalizers/converters in adapters to map OCC DTO -> app domain model.
4. Add shared OCC error mapper (`401`, `403`, `404`, `409`, `422` handling).

Definition of done:
- No feature/facade builds raw OCC URL strings directly.

### 16.4 Phase 8: Auth + User Context (Real Login)
1. Implement `AuthAdapter` with token APIs.
2. Add `AuthInterceptor` to attach bearer token.
3. Implement login/logout/refresh in `AuthFacade`.
4. Implement current user load (`users/current` profile summary).

Definition of done:
- User can log in with SAP Commerce credentials and session survives refresh.

### 16.5 Phase 9: Product & Search Integration
1. Replace mock product list with OCC search endpoint.
2. Replace mock product detail with OCC product detail endpoint.
3. Map pagination/sort/facets from OCC response to UI models.
4. Keep `ProductFacade` API stable so UI components do not change heavily.

Definition of done:
- Product list/detail pages run fully on SAP Commerce data.

### 16.6 Phase 10: Cart Integration (Guest + Auth)
1. Implement create/load active cart.
2. Implement add/update/remove entry APIs.
3. Implement merge cart strategy on login.
4. Add cart validation and stock/price refresh handling.

Definition of done:
- Full cart lifecycle works against SAP Commerce OCC.

### 16.7 Phase 11: Checkout Integration
1. Address step: load/add/select delivery address.
2. Delivery mode step: load/select shipping mode.
3. Payment step: tokenized mock or supported payment integration path.
4. Place order step with final order confirmation fetch.

Definition of done:
- End-to-end checkout shell works with OCC APIs.

### 16.8 Phase 12: Hardening for Spartacus-Like Quality
1. Add contract tests for adapters using real OCC sample payloads.
2. Add retry/backoff only for safe idempotent reads.
3. Add event service (`CartUpdated`, `UserLoggedIn`, `CheckoutStepCompleted`).
4. Add SSR-safe guards for browser-only APIs in auth/cart flows.

Definition of done:
- Integration remains stable through backend payload/latency variations.

### 16.9 OCC Endpoint Mapping (Typical)
- Login token: `/authorizationserver/oauth/token`
- Product search: `/occ/v2/{baseSite}/products/search`
- Product detail: `/occ/v2/{baseSite}/products/{code}`
- Current user: `/occ/v2/{baseSite}/users/current`
- Carts: `/occ/v2/{baseSite}/users/{userId}/carts`
- Cart entries: `/occ/v2/{baseSite}/users/{userId}/carts/{cartId}/entries`
- Checkout resources: `/deliveryaddresses`, `/deliverymodes`, `/paymentdetails`, `/orders`

Note:
- Exact endpoints can vary by SAP Commerce version and extensions. Keep endpoint paths configurable via `OccEndpointsService`.

## 17) Hindi Direction (Quick Action Plan)
- Step 1: Pehle Node `20.x` par SSR + i18n build stable karo, tabhi integration start karo.
- Step 2: Mock APIs ko turant remove mat karo; adapter layer me parallel OCC integration karo.
- Step 3: `Facade -> Connector -> Adapter` boundary strict rakho, UI me direct `HttpClient` bilkul mat use karo.
- Step 4: Login flow pehle complete karo, uske baad hi cart aur checkout integrate karo.
- Step 5: `baseSite`, `language`, `currency` ko config-driven banao, hardcoded values avoid karo.
- Step 6: Har major phase ke baad regression test chalao: login -> product -> add to cart -> checkout.
- Step 7: Agar OCC payload change ho, sirf adapter/normalizer update karo, feature components nahi.

---

## References
- Angular v19 docs: https://v19.angular.dev
- Signal inputs migration (`v19` production ready): https://angular.dev/reference/migrations/signal-inputs
- Output migration docs: https://v19.angular.dev/reference/migrations/outputs
- SSR guide: https://v19.angular.dev/guide/ssr
- Angular roadmap status: https://v19.angular.dev/roadmap

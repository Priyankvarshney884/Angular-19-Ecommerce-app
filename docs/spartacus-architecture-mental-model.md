# Spartacus Architecture Mental Model for Angular Projects

Use this file as your day-to-day thinking guide while building Angular apps.

## 1) `facades/`: UI never talks directly to HTTP

### What it means
A component should call a facade method (`productFacade.loadProducts()`) instead of using `HttpClient` directly.

### Why teams do this in real projects
- Keeps UI simple and testable
- Prevents API details from spreading across many components
- Makes backend/API changes cheaper (change once in lower layers)

### Real-world scenario
If backend API changes from `/products` to `/catalog/items`, only adapter/connector/facade chain changes. UI stays mostly unchanged.

### When to think about this
Think at feature start, before writing first page component.
Ask: "Will multiple components need this data or business rule?" If yes, put it in facade.

### Red flags
- `HttpClient` inside `*.component.ts`
- Same API call duplicated in multiple components
- Components handling complex mapping/transforms

### Rule
UI should express intent, not data plumbing.

## 2) `connectors/`: domain-level communication layer

### What it means
Connector is the domain gateway (`ProductConnector`, `CartConnector`). It exposes business-friendly methods to facades.

### Why teams do this
- Keeps facades focused on state/orchestration
- Allows multiple adapters (mock, OCC, BFF) behind one interface
- Improves replaceability and testing

### Real-world scenario
Development uses mock adapter, staging uses real OCC adapter. Facade doesn’t change.

### When to think about this
Whenever a facade starts containing raw API concerns or too much request logic.

### Red flags
- Facade building URLs
- Facade caring about DTO shapes directly

### Rule
Connector should represent domain operations, not UI needs.

## 3) `adapters/`: low-level endpoint mapping/DTO transformation

### What it means
Adapter owns HTTP transport details and converts backend DTOs into app models.

### Why teams do this
- Isolates backend quirks in one place
- Enables strict typing and safer refactors
- Prevents backend field names leaking into UI

### Real-world scenario
Backend returns:
```json
{ "product_code": "P100", "display_name": "Phone" }
```
Adapter maps to:
```ts
{ code: 'P100', name: 'Phone' }
```
Now UI uses clean model regardless of backend naming.

### When to think about this
At first API integration for each domain.

### Red flags
- `any` used for API response
- UI templates using backend-specific names
- Mapping logic scattered across pages

### Rule
All URL building + DTO mapping belongs in adapter.

## 4) `cms/`: page assembly from reusable blocks

### What it means
Page layout is config-driven. A mapping layer decides which component renders each section.

### Why teams do this
- Non-developers/business teams can influence content structure
- Reuse components across pages
- Faster experiments/A-B style layout changes

### Real-world scenario
Home page sections (hero, banner, product carousel) come from JSON config; page template remains stable.

### When to think about this
When pages start repeating similar section patterns or when layout should vary by market/campaign.

### Red flags
- Huge static page templates with repeated blocks
- Every marketing change requires template rewrite

### Rule
Prefer composition by config over one-off hardcoded page structures.

## 5) `core/` vs `features/`: strict separation

### What it means
- `core/`: app-wide infrastructure and singleton concerns
- `features/`: business flows/screens

### Why teams do this
- Clear boundaries reduce accidental coupling
- Easier onboarding (where code should live is obvious)
- Better scalability as project grows

### Real-world scenario
`core/http` has interceptors and API config; `features/cart` contains cart page, cart UI, cart flow.

### When to think about this
Before creating any new file.
Ask: "Is this app-wide infrastructure or feature behavior?"

### Red flags
- Feature importing from another feature directly
- Shared infra code hidden inside feature folders

### Rule
Features depend on core/shared. Features should not depend directly on other features.

## 6) Request Flow You Should Aim For

```txt
Component -> Facade -> Connector -> Adapter -> HttpClient/API
                     <- mapped models <-
```

Keep this direction consistent. It prevents architecture erosion.

## 7) Practical Decision Checklist (Before Writing Code)

1. Is this UI-only state? Use component signals.
2. Is this feature domain state reused by multiple components? Use facade.
3. Is this a domain data operation? Put it in connector.
4. Is this URL/DTO/transport concern? Put it in adapter.
5. Is this app-wide concern (auth/config/i18n/interceptors)? Put it in core.
6. Is this page/business capability? Put it in features.
7. Is this layout/content composition? Put it in cms.

## 8) Anti-Patterns to Avoid Early

- Fat components (HTTP + mapping + business rules inside page)
- Shared folder as a dump of unrelated utilities
- Skipping adapter layer “for speed”
- Feature-to-feature direct imports
- Mixing DTO types with UI model types

## 9) Your Development Habit (4-hour/week plan)

For each new feature slice:
1. Design flow first: facade -> connector -> adapter -> page.
2. Implement minimal happy path.
3. Add loading/error/empty states.
4. Refactor names and boundaries before next slice.
5. Add tests at facade and adapter levels.

If you follow this repeatedly, you will naturally think in Spartacus-style architecture while building Angular apps.

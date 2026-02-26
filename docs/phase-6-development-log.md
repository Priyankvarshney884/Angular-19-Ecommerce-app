# Phase 6 Development Log: Performance + SSR + i18n

Date: 2026-02-24

## Scope Implemented
1. SSR scaffolding
2. Hydration support
3. i18n setup for `en` and `de`
4. Route-level preloading strategy

## Files Added
- `src/main.server.ts`
- `src/server.ts`
- `src/app/app.config.server.ts`
- `src/app/app.routes.server.ts`
- `src/app/core/routing/selective-preloading.strategy.ts`
- `src/locale/messages.de.xlf`

## Files Updated`
- `package.json`
- `package-lock.json`
- `tsconfig.app.json`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/app/app.component.html`

## Key Implementation Notes

### 1) SSR
- Added Angular SSR server entry + Express node handler.
- Added server-aware app config and server routes.
- Set server route rendering mode to `RenderMode.Server` for dynamic commerce routes.

### 2) Hydration
- Enabled client hydration in app config:
  - `provideClientHydration(withEventReplay())`

### 3) Route-Level Preloading
- Added `SelectivePreloadingStrategy`.
- Wired strategy with:
  - `provideRouter(routes, withPreloading(SelectivePreloadingStrategy))`
- Added route metadata:
  - `products`: preload `true`
  - `product/:code`: preload `false`
  - `cart`: preload `false`

### 4) i18n (`en` + `de`)
- Configured project i18n in `angular.json`:
  - source locale `en`
  - locale file for `de`: `src/locale/messages.de.xlf`
- Added i18n IDs in app shell template.
- Added localized build/serve configurations (`en`, `de`, `development-en`, `development-de`).

## Dependency Additions
- `@angular/ssr`
- `@angular/platform-server`
- `@angular/localize`
- `express`

## Verification Status

### Completed
- Project configuration and code wiring for SSR + hydration + i18n + preloading is in place.

### Blockers in current environment
- Angular build commands currently fail with a Node runtime malloc crash:
  - `pointer being freed was not allocated`
- Current Node version in this environment:
  - `v22.22.0`
- Recommendation: use Node LTS `20.x` and rerun validation commands.

## Validation Commands (to run locally)
```bash
npm run build
npx ng build --configuration=en
npx ng build --configuration=de
npx ng serve --configuration=en
npx ng serve --configuration=de
npm run serve:ssr:angular-self-code
```

## Definition of Done Check
- SSR build runs: pending local runtime verification (blocked by Node crash).
- 2 locale output works: pending local runtime verification (blocked by Node crash).

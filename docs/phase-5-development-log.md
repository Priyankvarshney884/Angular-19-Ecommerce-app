# Phase 5 Development Log

This document explains exactly what was implemented for Phase 5 and why.

## Goal Covered
Implemented the requested Phase 5 scope:
1. Created a CMS mapping table (`type` string -> standalone component).
2. Home page now receives JSON layout config and renders components dynamically.

Definition of done achieved:
- Home page layout composition now changes via JSON config, without rewriting `home.component.html`.

## 1) CMS Layout Model Added
- Added `src/app/shared/models/cms-layout.model.ts`

What changed:
- Introduced typed contracts for:
  - `CmsPageLayout`
  - `CmsSlotConfig`
  - `CmsComponentConfig`
  - `CmsComponentData`

Why:
- Gives a stable schema for config-driven page composition.

## 2) CMS Data Flow Layered (Adapter -> Connector -> Facade)
- Added `src/app/occ/adapter/cms-layout.adapter.ts`
- Added `src/app/occ/connector/cms-layout.connector.ts`
- Added `src/app/facades/cms.facade.ts`

What changed:
- Adapter fetches `/mock-api/home-layout.json` using `apiBaseUrl`.
- Connector exposes `getHomePageLayout()`.
- Facade manages `homeLayout`, `loading`, `error`, and `loadHomeLayout()`.

Why:
- Keeps HTTP and endpoint details out of feature components.
- Preserves Spartacus-style layering pattern.

## 3) CMS Component Mapper Table Added
- Added `src/app/cms/component-mapper/cms-component-mapper.service.ts`

What changed:
- Added `componentMap`:
  - `HeroBannerComponent`
  - `PromoStripComponent`
  - `FeatureTileComponent`
- `getComponent(type)` resolves component class by type string.

Why:
- Satisfies the core Phase 5 requirement: mapping table driven rendering.

## 4) Dynamic CMS Page Layout Renderer Added
- Added `src/app/cms/page-layout/cms-page-layout.component.ts`
- Added `src/app/cms/page-layout/cms-page-layout.component.html`
- Added `src/app/cms/page-layout/cms-page-layout.component.scss`

What changed:
- Iterates through `layout.slots` and `slot.components`.
- Resolves component type from mapper.
- Renders dynamically via `NgComponentOutlet`.
- Passes each block’s JSON config to rendered component as input.

Why:
- Layout is now fully composition-driven rather than hardcoded in home template.

## 5) CMS Standalone Blocks Added
- Added `src/app/cms/components/hero-banner/*`
- Added `src/app/cms/components/promo-strip/*`
- Added `src/app/cms/components/feature-tile/*`

What changed:
- Added reusable standalone CMS components reading configuration from input.

Why:
- Provides concrete render targets for mapper-driven composition.

## 6) Home Feature Switched to CMS Composition
- Updated `src/app/features/home/home.component.ts`
- Updated `src/app/features/home/home.component.html`
- Updated `src/app/features/home/home.component.scss`

What changed:
- Home now loads layout through `CmsFacade`.
- Home renders `<app-cms-page-layout [layout]="layout" />`.
- Includes loading/error/config-disabled states.

Why:
- Home template remains stable while layout/content come from JSON config.

## 7) Routes and Navigation Updated
- Updated `src/app/app.routes.ts`
- Updated `src/app/app.component.html`

What changed:
- Added `/home` route.
- Root (`/`) and wildcard now redirect to `/home`.
- Added top navigation link for Home.

Why:
- Makes CMS-composed home page the default app entry.

## 8) JSON Layout Config Added
- Added `public/mock-api/home-layout.json`

What changed:
- Added slot/component configuration for hero, promo strips, and feature tiles.

Why:
- Enables layout/content changes by config rather than template rewrites.

## 9) End-to-End Request Flow (Phase 5)

```txt
HomeComponent
  -> CmsFacade.loadHomeLayout()
  -> CmsLayoutConnector.getHomePageLayout()
  -> CmsLayoutAdapter.getHomePageLayout()
  -> GET /mock-api/home-layout.json
  -> CmsFacade.homeLayout signal updates
  -> CmsPageLayoutComponent iterates slots/components
  -> CmsComponentMapper resolves type -> component
  -> NgComponentOutlet renders dynamic blocks
```

## 10) Validation Run
Commands run:
- `./node_modules/.bin/tsc -p tsconfig.app.json --noEmit` (passed)
- `./node_modules/.bin/tsc -p tsconfig.spec.json --noEmit` (passed)

## 11) Recommended Next Step
For Phase 6 readiness:
1. Add SSR compatibility checks for CMS dynamic rendering and browser APIs.
2. Add i18n keys into CMS config and map text through translations.
3. Add route preloading strategy for product/details/cart routes.

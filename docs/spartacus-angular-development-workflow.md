# Spartacus-Style Angular Workflow (Start to Finish)

Use this as your repeatable process whenever you build a new feature.

## 1) Golden Rule
Always build in this order:

```txt
Model -> Adapter -> Connector -> Facade -> Feature Page -> Route -> Verify -> Document
```

Do not start from template UI first for data-heavy features.

## 2) Exact Start Point (When Project Is New)
Start from these files, in this order:

1. `src/app/shared/models/*.ts`
2. `src/app/occ/adapters/*.ts`
3. `src/app/occ/connectors/*.ts`
4. `src/app/facades/*.ts`
5. `src/app/features/<feature-name>/*`
6. `src/app/app.routes.ts`
7. `docs/phase-X-*.md`

## 3) One Feature at a Time (Standard Process)
For every new feature (example: wishlist, checkout, profile), follow this checklist.

### Step A: Model first
Create/confirm model interfaces in `shared/models`.

Done when:
- No `any` in domain layer
- You know final data shape used by UI

### Step B: Adapter
Create adapter in `occ/adapters`.

Adapter responsibilities:
- Build endpoint URL
- Call `HttpClient`
- Map response shape if backend differs

Done when:
- Page/Facade does not know URL details

### Step C: Connector
Create connector in `occ/connectors`.

Connector responsibilities:
- Expose domain operations (`getX`, `createY`)
- Delegate to adapter

Done when:
- Facade imports connector, not adapter

### Step D: Facade
Create/update facade in `facades`.

Facade responsibilities:
- Keep Signals state (`loading`, `error`, data)
- Expose actions and computed values
- Manage flow for UI

Done when:
- UI can render only from facade state
- UI does not import `HttpClient`

### Step E: Feature page
Build `features/<name>/<name>.page.ts/html/css`.

Page responsibilities:
- Wire user events to facade methods
- Use `@if` for loading/error/empty states
- Use `@for` for list rendering

Done when:
- Page has no business logic duplication

### Step F: Route
Add lazy route in `app.routes.ts`.

Done when:
- Feature accessible by URL
- Route loads component lazily

### Step G: Verify
Run:

```bash
npm start
npm run build
```

Done when:
- No TypeScript/template errors
- Feature path works in browser

### Step H: Document
Write what was added in `docs/phase-X-development-log.md`.

Done when:
- Future-you can understand why each layer exists

## 4) “Finish This File, Then Move” Path (Concrete)
Use this order exactly each time.

1. Finish one model file.
2. Finish one adapter file.
3. Finish one connector file.
4. Finish one facade file.
5. Finish one feature page TS file.
6. Finish one feature page HTML with `@if`/`@for`.
7. Finish one feature page CSS.
8. Finish route update.
9. Run build.
10. Write log entry.

Move to next step only after current step compiles.

## 5) Where Beginners Usually Get Stuck

### Problem 1: Too many files
Fix:
- Ignore all unrelated folders.
- Focus only on this path for current feature:
  `models -> adapter -> connector -> facade -> feature`

### Problem 2: UI logic mixed with data logic
Fix:
- If you are writing `filter/map/catch` in component repeatedly, move it to facade.

### Problem 3: URL inside page/facade
Fix:
- Move URL and API shape handling to adapter.

### Problem 4: No idea where errors should be handled
Fix:
- Technical API errors: interceptor/adapter
- User-facing state (`loading/error`): facade/page signals

## 6) Definition of Done (Per Feature)
A feature is complete only when all are true:

- Route exists and lazy-loads.
- Page renders with `@if` loading/error/empty.
- Lists render with `@for`.
- Page talks only to facade.
- Facade talks only to connector.
- Connector talks only to adapter.
- Adapter owns endpoint details.
- Build passes.
- Log doc updated.

## 7) Standard Scratch-to-Production Pattern
This is the standard process used in scalable teams:

1. Architecture and contracts first (models/layers)
2. Minimal vertical slice (happy path)
3. Error/loading states
4. Refactor and comments
5. Test
6. Document
7. Move to next slice

This is exactly the same pattern you should follow every time.

## 8) Weekly Learning Loop (for your 4-hour/week plan)

- Session 1 (2h): Implement one slice with full layer flow
- Session 2 (2h): Refactor + add comments + verify + document

Keep repeating this loop. It will make this structure natural.

## 9) What To Do Next Right Now
For your next self-practice feature, pick `wishlist` and follow:

1. `shared/models/wishlist.model.ts`
2. `occ/adapters/wishlist.adapter.ts`
3. `occ/connectors/wishlist.connector.ts`
4. `facades/wishlist.facade.ts`
5. `features/wishlist/wishlist.page.ts/html/css`
6. Add route `/wishlist`
7. Build + document

If you follow this strictly for 3-4 features, you will no longer feel confused by file count.

# Tiny Store Architecture

Tiny Store is a SvelteKit 2 / Svelte 5 storefront. The codebase is moving toward feature-oriented boundaries while preserving the existing route structure.

## Architectural Rules

- Routes compose UI and call stores or remote functions. They should not contain business normalization.
- Remote functions validate inputs, call external APIs, and return typed data or throw SvelteKit errors.
- Pure mapping and projection logic belongs in `src/features/**` or small utility modules with Vitest coverage.
- Stores own UI-facing state and orchestration. External systems are hidden behind small gateway/helper modules.
- Components should receive app-owned DTOs, not vendor SDK models.
- Generic forms are allowed, but each feature must map `FormDataRecord` into a typed feature DTO at the boundary.
- Placeholder features must be visibly disabled or isolated. Do not expose half-wired buttons that imply working behavior.

## Current Feature Boundaries

### Account

`src/features/account` owns account DTOs and form/preference mappers.

- `account.types.ts` defines app-owned account types.
- `account.mapper.ts` maps Appwrite users into `AccountUser`.
- `shipping-address.mapper.ts` maps generic form data into a typed shipping preference.
- `account-navigation.ts` owns account tab visibility and email verification URL parsing.
- Account settings UI is split into avatar upload, profile form, and verification alert components under `src/components/Settings`.

Appwrite remains an infrastructure dependency behind `src/stores/user-store-deps.ts` and `src/stores/session-store-deps.ts`.
User account mutations use small ports for account calls, avatar storage, notifications, and session updates; the `userStore` class should not import the concrete `sessionStore` singleton.
Session account calls, navigation, browser location, and error reporting are isolated in `src/stores/session-store-deps.ts`.

### Checkout

`src/features/checkout` owns checkout form mapping.

- `checkout-form.mapper.ts` maps generic form data into a WooCommerce billing address.
- Checkout route UI is composed from `src/components/Checkout/*`.

### Products

`src/features/products` owns product list, category projection, and suggestion mapping.

- `product.mapper.ts` filters purchasable product lists, removes backend-only category metadata, and converts WooCommerce suggestion IDs into remote include parameters.
- `product-admin.ts` owns product-management display helpers while the UI remains a read-only placeholder.
- Product detail rendering is composed from `src/components/Product/ProductBreadcrumbs.svelte`, `ProductPurchaseControls.svelte`, `ProductTaxonomyLinks.svelte`, and `ProductRecommendations.svelte`.
- Product image behavior is split across `ProductImage.svelte`, `ProductThumbnailStrip.svelte`, and `ProductImagePopover.svelte`; browser class toggling lives behind `product-image-popover.ts`.
- Product, category, and tag route loads return explicit page data objects, so route pages should render from `data` instead of reading `$app/state` params.
- Product list store dependencies live in `src/stores/item-store-deps.ts`; the store should own reactive state while the gateway owns remote loading.

### Cart

Cart state lives in `cartStore`, but infrastructure dependencies are split into `cart-store-deps.ts`.

- Remote cart calls are behind `CartGateway`.
- Cart token persistence is behind `CartTokenStorage`.
- Toast notifications are behind `CartNotifier`.
- `cartStore` synchronizes returned cart tokens after every cart operation, not only the initial cart fetch.

### Remote API

Remote helpers live in `src/routes/api/remote-utils.ts`.

- Use `buildEndpoint` for query string construction.
- Use `createCartHeaders` for cart-token headers.
- Use `fetchJson` for typed JSON requests.
- Use explicit `error(...)` for remote failures instead of returning fake empty data.

### Shell UI

Navbar markup is composed from `src/components/Navbar/*`. The root navbar component owns drawer state and account navigation only.
Route view-transition wiring is isolated in `src/lib/view-transition.ts`; keep direct browser-global mutations behind small helpers.
Authentication modal markup is composed from `src/components/Modal/AuthFields.svelte` and `AuthModalActions.svelte`; the modal root owns only auth mode and input state.

## Testing Expectations

Use Vitest for pure mappers, projections, and remote helper logic. Every new boundary mapper should have a narrow test that proves the conversion and rejects malformed assumptions.

Baseline verification for architecture changes:

```bash
rtk yarn test
rtk yarn run check
rtk yarn build
```

Run `rtk yarn lint` before treating a broad refactor as production-ready.

# Tiny Store – AI Coding Agent Guide

This repo is a SvelteKit 2 + Svelte 5 storefront using:

- WooCommerce Store API (remote WordPress backend) via server functions
- Appwrite (auth/storage) for account and avatars
- Tailwind CSS v4 + Prettier + ESLint + Vitest

## Big Picture

- UI lives under `src/routes/**` and `src/components/**`.
- Data access lives in server functions under `src/routes/api/*.remote.ts` using `$app/server` `query(...)` + `zod`.
- Global state is handled with Svelte 5 runes (`$state`) inside class-like singletons under `src/stores/*.store.svelte.ts` (e.g., `cartStore`).
- Base WooCommerce endpoints are centralized in `src/routes/api/config.const.ts`. Update here for environment changes.
- Appwrite client is in `src/lib/appwrite.lib.ts` (public envs, exported `account`, `databases`, `storage`).

## Build & Test

- Dev: `yarn dev`
- Build: `yarn build` → Preview: `yarn preview` (default port set to 57023)
- Type checks: `yarn check` (svelte-check)
- Lint/format: `yarn lint` / `yarn format`
- Tests: `yarn test` (Vitest; tests under `src/**/*.{test,spec}.{js,ts}`)

## Project Conventions

- Aliases (see `svelte.config.js`): `@` → `./src`, `$constants`, `$stores`, `$utils`, `$interfaces`, `$style`.
- Svelte 5 runes: prefer `$state` fields in classes + exported singletons over classic writable stores.
- Global bootstrapping in `src/routes/+layout.ts` (e.g., `cartStore.getCart()`, preloading categories).
- Experimental remote functions are enabled (`kit.experimental.remoteFunctions = true`).

## Server Functions Pattern (RPC-style)

- Define in `src/routes/api/*.remote.ts` using `$app/server` `query(...)` and validate inputs with `zod`.
- Fetch WooCommerce endpoints from `ENDPOINTS` in `config.const.ts`. Handle headers like `Cart-Token` and `Nonce` when required.
- Example (see `cart.remote.ts`):
  - `getCart(token?)` reads `Cart-Token`/`Nonce` from response headers and returns `{ cart, cartToken, nonce }`.
  - `addItemToCart`, `updateCartItem`, `removeCartItem` POST to `ENDPOINTS.CART/*` and normalize responses via `parseCartResponse`.
- Call these functions directly from client code; SvelteKit handles the network roundtrip.

## State & Stores

- Stores are classes with `$state` fields and exported instances (e.g., `cartStore`, `sessionStore`).
- `cartStore` persists `cart_token`/`nonce` in `localStorage` and exposes helpers like `cartTokenNonceReady()` for flows that require both values.
- Prefer updating state via store methods, not direct fetches from components.

## Auth & Appwrite

- `src/lib/appwrite.lib.ts` wires `Client`, `Account`, `Databases`, `Storage` using public envs.
- `sessionStore` uses `account.get()`, `account.deleteSession('current')`, etc. Prefer calling store methods from UI.

## WooCommerce Integration Notes

- Endpoints and base URL live in `config.const.ts`. Keep CSP `connect-src` in `svelte.config.js` aligned when changing hosts.
- OAuth 1.0a signing (HMAC-SHA256) for admin endpoints (e.g., payment gateways) is done in `checkout.remote.ts` using private envs.

## Security & Headers

- Global security headers set in `src/hooks.server.ts`.
- CSP is configured in `svelte.config.js` (`csp.directives`, `csrf.trustedOrigins`). Update if endpoints/origins change.

## Required Environment Variables

- Public (exposed): `PUBLIC_APPWRITE_ENDPOINT`, `PUBLIC_APPWRITE_PROJECT`, `PUBLIC_STORE_DB_ID`, `PUBLIC_IITEMS_COLLECTION_ID`, `PUBLIC_AVATARS_BUCKET_ID`.
- Private (server): `WC_READ_CONSUMER_KEY`, `WC_READ_CONSUMER_SECRET`.

## When Adding Features

- Add data calls as server functions with `zod` schemas under `src/routes/api/*` and reuse `ENDPOINTS`.
- Consume them from stores/components; prefer store methods to centralize side effects and toasts.
- Follow alias imports (`@/…`) and typing from `src/interfaces/**` (extensive WooCommerce types).

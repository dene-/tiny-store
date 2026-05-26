# Tiny Store Agent Guide

This file is the canonical guide for Codex App and Codex CLI work in this repository.

## Project Snapshot

Tiny Store is a SvelteKit 2 storefront built with Svelte 5, TypeScript, Yarn 1, Tailwind CSS v4, DaisyUI, Appwrite, WooCommerce Store API, ESLint, Prettier, and Vitest.

Key integrations:

- WooCommerce Store API for products, categories, cart, checkout, orders, and payment gateways.
- Appwrite for account/session flows and storage-backed avatar/user data.
- SvelteKit remote functions in `src/routes/api/*.remote.ts`.
- Svelte 5 runes and class-like singleton stores in `src/stores/*.store.svelte.ts`.

## Non-Negotiable Workflow

- Prefix every shell command with `rtk`.
  - Use `rtk git status`, `rtk rg "query" src`, `rtk yarn check`, `rtk yarn test`.
  - If a command must bypass RTK filtering, use `rtk proxy <command>`.
- Protect user work. The worktree may already be dirty; never revert, overwrite, or clean changes you did not make.
- Use `rg` or `rg --files` for searching whenever possible.
- Use `apply_patch` for manual file edits.
- Keep changes scoped to the request. Do not perform broad refactors while touching nearby code unless they are required for correctness.
- Do not commit, push, or open PRs unless explicitly asked.

## Commands

- Install dependencies: `rtk yarn install`
- Dev server: `rtk yarn dev`
- Production build: `rtk yarn build`
- Preview build: `rtk yarn preview` (configured for port `57023`)
- Type and Svelte checks: `rtk yarn check`
- Tests: `rtk yarn test`
- Lint and format check: `rtk yarn lint`
- Format: `rtk yarn format`

Run the narrowest useful verification first, then broaden based on risk. For most Svelte or TypeScript changes, `rtk yarn check` is the baseline. For behavioral changes, add relevant Vitest coverage or run `rtk yarn test`. Before reporting a production-ready change, prefer `rtk yarn lint` and `rtk yarn build` when time allows.

## Architecture Map

- `src/routes/**`: SvelteKit pages, layouts, load functions, and route-specific UI.
- `src/routes/api/*.remote.ts`: SvelteKit remote functions using `$app/server` and `zod`.
- `src/routes/api/config.const.ts`: WooCommerce base URLs, endpoint constants, and OAuth helper.
- `src/components/**`: Reusable Svelte UI components.
- `src/stores/*.store.svelte.ts`: Svelte 5 rune-backed singleton stores.
- `src/interfaces/**`: Appwrite, forms, and WooCommerce/storefront types.
- `src/lib/appwrite.lib.ts`: Appwrite client, account, database, and storage setup.
- `src/lib/*.ts`: Small shared utilities.
- `src/style/**`: Global CSS/SCSS and design variables.
- `src/hooks.server.ts`: Server hooks and security headers.
- `static/**`: Public assets and PWA files.

## Svelte And TypeScript Conventions

- Write Svelte 5 code. Prefer runes-compatible patterns already used in the repo.
- For global state, follow the existing class-with-`$state` plus exported singleton pattern.
- Prefer store methods for side effects and state updates instead of direct component fetches.
- Keep component logic cohesive. If a component grows multiple responsibilities, extract a focused child component or utility.
- Use existing aliases from `svelte.config.js`:
  - `@` -> `./src`
  - `$constants` -> `./src/constants`
  - `$stores` -> `./src/stores`
  - `$utils` -> `./src/utils`
  - `$interfaces` -> `./src/interfaces`
  - `$style` -> `./src/style`
- Preserve strict TypeScript. Avoid `any` unless the surrounding code already requires it and there is no practical typed alternative.
- Keep imports explicit and consistent with nearby files.

## Remote Functions And Data Flow

- Add backend data calls under `src/routes/api/*.remote.ts`.
- Use `$app/server` `query(...)` and validate inputs with `zod`.
- Reuse `ENDPOINTS` from `src/routes/api/config.const.ts` instead of duplicating WooCommerce URLs.
- Normalize WooCommerce responses at the remote-function boundary when possible.
- Preserve cart headers such as `Cart-Token` and `Nonce` where required.
- Call remote functions from stores or route code, then let stores centralize user-facing side effects and state updates.

## WooCommerce Integration

- Store API and Admin API roots are defined in `src/routes/api/config.const.ts`.
- Keep CSP `connect-src` and CSRF trusted origins aligned with backend host changes in `svelte.config.js`.
- OAuth 1.0a signing for WooCommerce admin endpoints uses private env values:
  - `WC_READ_CONSUMER_KEY`
  - `WC_READ_CONSUMER_SECRET`
- Never expose private WooCommerce credentials through public envs, client code, logs, or rendered HTML.

## Appwrite Integration

- Appwrite setup lives in `src/lib/appwrite.lib.ts`.
- Public Appwrite env values are expected for client setup:
  - `PUBLIC_APPWRITE_ENDPOINT`
  - `PUBLIC_APPWRITE_PROJECT`
  - `PUBLIC_STORE_DB_ID`
  - `PUBLIC_IITEMS_COLLECTION_ID`
  - `PUBLIC_AVATARS_BUCKET_ID`
- Session and account flows should go through the existing Appwrite client and store methods.

## Security Expectations

- Treat checkout, cart tokens, nonces, OAuth signing, sessions, and user account data as sensitive.
- Keep private env access on the server side only.
- Preserve or strengthen CSP, CSRF, and headers in `svelte.config.js` and `src/hooks.server.ts`.
- Validate all remote-function inputs with `zod`.
- Do not add new external origins without updating security config and explaining why.
- Do not log secrets, tokens, nonces, session objects, or full checkout payloads.

## Frontend Quality

- Match the existing storefront style instead of introducing a new visual language.
- Prefer dense, usable commerce UI over marketing-page composition.
- Use existing components and icon patterns before adding new ones.
- Keep text readable and avoid layout shifts in product cards, carts, forms, and checkout flows.
- Make interactive controls accessible with clear labels, keyboard behavior, and disabled/loading/error states where relevant.
- Verify responsive behavior for product grids, product detail pages, cart, checkout, and account views when touched.

## Testing And Verification

- Add or update tests when changing business logic, remote-function normalization, stores, or utilities.
- Use Vitest for unit coverage under `src/**/*.{test,spec}.{js,ts}`.
- For Svelte, route, or TypeScript changes, run `rtk yarn check`.
- For formatting or lint-sensitive changes, run `rtk yarn lint`.
- For deployment-sensitive or integration changes, run `rtk yarn build`.
- If verification cannot be run, say exactly which command was skipped and why.

## Common Change Patterns

- New data endpoint:
  1. Add endpoint constant if needed in `src/routes/api/config.const.ts`.
  2. Add or extend a remote function in `src/routes/api/*.remote.ts`.
  3. Validate input with `zod`.
  4. Add typed normalization near the API boundary.
  5. Consume through a store or route.

- New user-facing state:
  1. Prefer an existing store if ownership is clear.
  2. Add `$state` fields and methods to the class-like store.
  3. Keep persistence logic inside the store.
  4. Avoid duplicating the same state in components.

- UI change:
  1. Follow nearby component structure and styling.
  2. Keep props typed.
  3. Preserve accessibility attributes and improve them when touching forms or controls.
  4. Run `rtk yarn check` before reporting completion.

## Worktree Hygiene

- Check status before editing with `rtk git status --short`.
- If unrelated files are modified, leave them alone and mention them when relevant.
- If a file you need to edit already has user changes, inspect it carefully and preserve their intent.
- Avoid generated churn in lockfiles, build output, `.svelte-kit`, and public assets unless the task requires it.

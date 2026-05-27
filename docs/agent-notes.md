# Agent Notes

This project values pragmatic SOLID, not ceremony.

## When Adding Features

1. Put pure business mapping in `src/features/<feature>`.
2. Keep Svelte routes as composition and orchestration.
3. Keep remote functions thin: validate, call API, return typed data, or throw.
4. Add Vitest coverage for mappers and normalization.
5. Run `rtk yarn run check` for Svelte/TypeScript changes.

## Boundaries To Preserve

- Do not leak Appwrite `Models.*` into components. Use `AccountUser`.
- Do not import `sessionStore` into account mutation logic. Depend on the `AccountSessionStore` port from `src/stores/user-store-deps.ts`.
- Keep remote calls out of store classes when a small gateway dependency is enough.
- Keep browser-global mutations in tiny helpers so component tests and future audits have a clear boundary.
- Account page tab visibility belongs in `src/features/account/account-navigation.ts`, not inline route filtering.
- Keep the navbar root focused on drawer state and orchestration; add focused components under `src/components/Navbar`.
- Keep modal roots focused on state and orchestration; repeated fields/actions should be child components.
- Product-management helpers belong in `src/features/products/product-admin.ts` while admin write actions are still placeholders.
- Do not log secrets, cart tokens, order keys, billing emails, or full payloads.
- Do not return `{}` or `[]` as fake success from remote failures.
- Do not add new direct `document.querySelector` / `getElementById` wiring in Svelte components.
- Do not add `Record<string, any>` for form handling. Use `FormDataRecord`, then map into typed DTOs.

## Placeholder Policy

If a feature is not implemented, disable or hide the action. Do not leave clickable buttons with empty handlers or fake modals.

Current placeholder:

- Account admin product management is read-only. Add/edit/duplicate/delete are disabled until the full WooCommerce admin use case exists.

## Known Follow-Ups

- Continue moving category/order normalization into feature modules when those flows need behavior changes.
- Continue extracting shared UI pieces from the remaining 100+ line components when touching those flows.

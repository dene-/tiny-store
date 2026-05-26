# Tiny Store: Lightweight Svelte 5 Storefront

Tiny Store is a SvelteKit storefront using WooCommerce for commerce data and Appwrite for account/session/profile flows.

## Developing

Install dependencies:

```bash
rtk yarn install
```

Start a development server:

```bash
rtk yarn dev
```

Run the main checks:

```bash
rtk yarn test
rtk yarn run check
rtk yarn build
```

## Architecture

Tiny Store uses:

- SvelteKit 2 and Svelte 5 runes
- WooCommerce Store API for storefront commerce
- Appwrite for account/session/profile/avatar flows
- SvelteKit remote functions for server-side API calls
- Vitest for unit coverage

Read [docs/architecture.md](docs/architecture.md) before making structural changes.
Read [docs/agent-notes.md](docs/agent-notes.md) before handing the repo to another coding agent.

## Building

Create a production build:

```bash
rtk yarn build
```

Preview the production build:

```bash
rtk yarn preview
```

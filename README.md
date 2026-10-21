# Shopping List Frontend — `lista-mercado-react-puro`

Single-page application for managing a shopping list: users create categories, and add items with quantities to each category. Built with **React 19**, **TypeScript**, and **Vite**.

This repository is the frontend of a two-part full-stack project. The companion backend (Express + Prisma + PostgreSQL) lives in [`estudo-lista-mercado-express-prisma`](https://github.com/luckdawn-dev/estudo-lista-mercado-express-prisma).

![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245)
![HTTP client](https://img.shields.io/badge/Axios-1.x-5A29E4)

---

## Highlights

The focus of this project was to practice **pure React** fundamentals (no state-management meta-framework) while applying component design and separation-of-concerns practices:

- **Centralized API service** — all HTTP calls go through a single Axios instance (`src/services/api.ts`) with timeout, JSON headers, and a configurable base URL via `VITE_API_URL`. A committed `.env.example` documents easy switching between local and hosted backends.
- **Custom data hooks** — `useCategories` and `useCategoryItems` encapsulate the full data flow for each resource: fetching, loading/error state, and create/update/remove operations that keep local state in sync with the API.
- **Component decomposition** — large screen components were split into single-responsibility pieces: `CategoryHeader`, `CategoryEditForm` (editing is an isolated component, not an inline block), `CategoryItemSection`, `DeleteConfirmDialog`, `ItemList`, `ShopFormField`, `LoadingScreen`, and `ErrorPage`.
- **Explicit UX states** — an animated `LoadingScreen` while data loads and a dedicated `ErrorPage` when a request fails or the route is unknown.
- **SPA routing** — React Router v7 with a catch-all `*` route rendering the 404 page.
- **Server-state foundation ready** — React Query (`@tanstack/react-query`) is wired at the app root for server-state caching.
- **Component testing** — a React Testing Library smoke test validates the main list screen renders correctly.

## Tech stack

| Layer          | Technology                                    |
| -------------- | --------------------------------------------- |
| UI library     | React 19 (StrictMode) + TypeScript            |
| Build tool     | Vite 6                                        |
| Routing        | React Router 7                                |
| HTTP client    | Axios (centralized service module)            |
| Server state   | React Query (provider wired at app root)      |
| Testing        | React Testing Library                         |
| Code quality   | ESLint 9 (`eslint-plugin-react-hooks`, typescript-eslint) |

## Project structure

```
├── src/
│   ├── main.tsx                       # App bootstrap (StrictMode + React Query provider)
│   ├── App.tsx                        # Router: category list at "/" + 404 fallback
│   ├── services/
│   │   └── api.ts                     # Single Axios instance for every HTTP call
│   ├── hooks/
│   │   ├── useCategories.ts           # Categories: fetch / create / update / delete
│   │   └── useCategoryItems.ts        # Items of one category: fetch / add / remove
│   ├── components/
│   │   ├── category-list/             # Main screen (list + add form + tests)
│   │   ├── category-component/        # Category card: header, edit form, item section, delete dialog
│   │   ├── item-component/            # Individual item row
│   │   ├── item-list/                 # Items grouped per category
│   │   ├── loading-screen/            # Animated full-state loader
│   │   ├── error-page/                # 404 / request-failure screen
│   │   └── shop-form-field/           # Reusable form field
│   ├── shared/models/                 # TypeScript contracts (ICategory, IItem)
│   └── assets/                        # SVG icons
├── .env.example                       # Documents VITE_API_URL
└── vite.config.ts
```

## Getting started

### Prerequisites

- **Node.js 18+** and npm
- A running backend — see [`estudo-lista-mercado-express-prisma`](https://github.com/luckdawn-dev/estudo-lista-mercado-express-prisma)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the backend URL

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000
```

Any value set here overrides the default base URL baked into `src/services/api.ts`.

### 3. Run and build

```bash
npm run dev       # development server with HMR
npm run build     # type-check (tsc -b) + production bundle
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

## Testing

A React Testing Library smoke test (rendering + heading assertion) lives at `src/components/category-list/category-list.test.tsx`. It renders the screen inside a `QueryClientProvider`, matching the production app bootstrap, and serves as the baseline for a full component-test suite using the same rendering pattern.

## Roadmap

- Add a `test` script with Vitest to run the React Testing Library suite as part of CI
- Migrate the hand-rolled hooks to React Query `useQuery`/`useMutation` for cache invalidation
- Add end-to-end tests covering the create/edit/delete flows against the real API

## Related repository

- Backend (Express + Prisma + PostgreSQL): [`estudo-lista-mercado-express-prisma`](https://github.com/luckdawn-dev/estudo-lista-mercado-express-prisma)

# Copilot Instructions — ocg-ui

## Product context
OCGarden is a calm, practical garden-memory companion for one primary user.
The UI is mobile-first, iPhone Safari–first, and ships as a PWA.
Backend contracts are still evolving; keep API boundaries explicit and mock-friendly.

## Tone and product posture
- Calm, low-friction, garden-companion feel — not a task manager, not enterprise software.
- Save-first: the user should never feel like they are filling out forms.
- When in doubt, do less, show less, require less.

## Stack
- **Runtime**: Vite + React 19 + TypeScript + Tailwind CSS v3 + React Router v7
- Build: `npm run build` (tsc + vite), dev: `npm run dev`, lint: `npm run lint`

## Coding preferences
- Prefer small, composable components with minimal props surface.
- Avoid heavy abstractions, factories, or framework boilerplate unless clearly warranted.
- Low dependency count: reach for platform APIs and the existing stack before adding packages.
- No enterprise patterns (no DI containers, no CQRS, no event buses in the UI layer).
- Keep files short; split when a file grows beyond ~200 lines.

## Mobile-first bias
- Default to single-column, full-width layouts.
- Touch targets ≥ 48 × 48 px.
- Avoid hover-only interactions; all affordances must be tap-accessible.
- Test mental model against iPhone SE (375 px) before wider breakpoints.

## API / backend boundary
- Never hard-code backend URLs or schemas in component files.
- API call shapes live in `src/data/api.ts`; mock data and type definitions live in `src/data/mock.ts`.
- Use typed mock objects that mirror expected API shapes during development.
- Mark placeholder endpoints with a `// TODO: real endpoint` comment.

## App UI vs admin UI
- **App UI** (`src/app/`): user-facing, calm, minimal chrome, bottom nav.
- **Admin/operator UI** (`src/admin/`): denser, functional, top nav,
  but must not feel like an enterprise dashboard. Same component library, lighter decoration.

## What Copilot should NOT do in this repo
- Modify `package.json`, lockfiles, `tsconfig`, Vite/Next config, or router files
  unless the task explicitly targets those.
- Generate backend runtime code (ingestion, Gmail pull, cloud provisioning).
- Introduce CSS frameworks or icon libraries not already in the project.
- Add authentication logic beyond what is already scaffolded.

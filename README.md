# OCGarden UI

Mobile-first garden intelligence UI for one household.

## Stack

- **Vite + React 19 + TypeScript** — fast builds, familiar ecosystem
- **Tailwind CSS v3** — utility-first mobile-first styling
- **React Router v7** — client-side routing
- **Mock data layer** — `src/data/` isolates API boundaries for easy future integration

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the app.
Open [http://localhost:5173/admin](http://localhost:5173/admin) for the admin interface.

### Codespaces

This repo includes a devcontainer configuration. Open in GitHub Codespaces and the environment will be ready automatically (Node 22, Azure CLI, Azure Functions Core Tools, SWA CLI).

Port 5173 is forwarded automatically for the Vite dev server.

### Environment variables

Copy `.env.example` to `.env.local` and fill in values for live API access.
When any variable is missing, text-intake falls back to mock/console behavior — local dev works without a backend.

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL (no trailing slash) |
| `VITE_OCG_DEVICE_TOKEN` | Device auth token for capture POSTs |
| `VITE_OCG_DEVICE_ID` | Device identifier header value |

## Structure

```
src/
  app/          # User-facing mobile app (bottom nav)
  admin/        # Operator/admin interface (top nav)
  components/   # Shared UI primitives
  config/       # Theme, navigation, feature flags, copy
  data/         # Mock data + API boundary layer
```

## App UI

| Route | Surface |
|-------|---------|
| `/today` | Daily overview, events, watch items |
| `/note` | Dictated note quick capture |
| `/log` | One-tap action logger |
| `/photo` | Photo capture (mock-only — upload deferred) |
| `/review` | Pending review queue |

## Admin UI

| Route | Surface |
|-------|---------|
| `/admin/intake` | Intake queue |
| `/admin/review` | Parse/review candidates |
| `/admin/sync` | Sync and source status |
| `/admin/settings` | Settings placeholder |

## API Integration

Text captures (`submitNote`, `submitQuickLog`) are wired to `POST /api/v1/captures` when env vars are present. All read endpoints and photo upload are mock-only.

Replace mock functions in `src/data/api.ts` with real fetch calls as backend endpoints become available. Mock data lives in `src/data/mock.ts`.

## Deploy

This repo deploys as a static site to Azure Static Web Apps.

```bash
# Build and deploy from Codespaces
npm run swa:deploy
```

Requires Azure CLI login (`az login`) and either a deployment token or interactive auth. See `.env.example` for API env vars.

## PWA

Includes `public/manifest.json` for basic PWA readiness. No service worker in current scaffold.

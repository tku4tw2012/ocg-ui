# OCGarden UI

Mobile-first garden intelligence UI for one household.

## Stack

- **Vite + React + TypeScript** — fast builds, familiar ecosystem
- **Tailwind CSS** — utility-first mobile-first styling  
- **React Router v6** — client-side routing
- **Mock data layer** — `src/data/` isolates API boundaries for easy future integration

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the app.  
Open [http://localhost:5173/admin](http://localhost:5173/admin) for the admin interface.

## Structure

```
src/
  app/          # User-facing mobile app (bottom nav)
  admin/        # Operator/admin interface (top nav)
  components/   # Shared UI primitives
  data/         # Mock data + API boundary layer
```

## App UI

| Route | Surface |
|-------|---------|
| `/today` | Daily overview, events, watch items |
| `/note` | Dictated note quick capture |
| `/log` | One-tap action logger |
| `/photo` | Photo upload |
| `/review` | Pending review queue |

## Admin UI

| Route | Surface |
|-------|---------|
| `/admin/intake` | Intake queue |
| `/admin/review` | Parse/review candidates |
| `/admin/sync` | Sync and source status |
| `/admin/settings` | Settings placeholder |

## API Integration

Replace functions in `src/data/api.ts` with real fetch calls when the backend is ready. Mock data lives in `src/data/mock.ts`.

## PWA

Includes `public/manifest.json` for basic PWA readiness. Add service worker if needed later.

## Next Steps

- Add plant/zone detail pages
- Add persistent state (localStorage until backend is ready)
- Add swipe gestures for review queue
- Wire up real weather API
- Add voice input trigger on Note page
- Add toast/feedback notifications

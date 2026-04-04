# Navigation Map — ocg-ui

First-pass surface and route map. Routes use a `/` prefix convention; adjust to match the router in use.

## App UI routes

| Surface | Route | Description |
|---|---|---|
| Today | `/` | Daily dashboard: weather summary, recent log, quick-capture entry points |
| Dictated Note | `/note/new` | Full-screen voice / text note capture |
| Quick Log | `/log/quick` | Tap-grid of common garden actions (water, feed, observe, etc.) |
| Photo Check | `/log/photo` | Camera / photo-library entry + optional note |
| Review | `/review` | Scrollable timeline of past entries, filterable by plant / type / date |
| Settings | `/settings` | User preferences, offline mode, notification toggles |

### App bottom navigation (suggested)
```
Today  |  Log  |  Review
```
Quick Log and Photo Check are accessed from the Log entry point or from Today quick-actions.

---

## Admin / Operator routes

| Surface | Route | Description |
|---|---|---|
| Intake Queue | `/admin/intake` | Raw items ingested but not yet processed |
| Review Queue | `/admin/review` | Items flagged for manual operator review |
| Sync / Status | `/admin/sync` | Pipeline health, last-run info, error counts |
| Settings shell | `/admin/settings` | Runtime config placeholders, API key display |

All admin routes sit under `/admin/*` and should be protected at the route level.

---

## Assumptions
- A bottom nav with three tabs covers the core app loop.
- Admin is a separate section, not interleaved with app UI.
- Deep-link routes (e.g., `/review/:itemId`) will be added as surfaces are built.

## Open questions
- Does `/` redirect to `/today` or serve the Today component directly?
- Is there a dedicated onboarding or first-run route needed at MVP?
- Should `/log/quick` and `/log/photo` share a single `/log/new` entry with a type selector?

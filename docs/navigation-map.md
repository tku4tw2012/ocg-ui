# Navigation Map — ocg-ui

First-pass surface and route map. Routes use a `/` prefix convention; adjust to match the router in use.

## App UI routes

| Surface | Route | Description |
|---|---|---|
| Today | `/today` | Daily dashboard: recent garden events (GardenEvents), watch list, quick-capture entry points |
| Dictated Note | `/note` | Full-screen text note capture; submits to `POST /api/v1/captures` (capture_type: dictated_note) |
| Quick Log | `/log` | Tap-grid of 6 common garden actions; submits to `POST /api/v1/captures` (capture_type: quick_log) |
| Photo Check | `/photo` | Camera / photo-library entry + optional caption; photo upload is mock-only pending backend contract |
| Review | `/review` | List of AI-parsed `ReviewCandidate` items pending operator confirmation |

`/` redirects to `/today`.

### App bottom navigation (live)
```
Today  |  Note  |  Log  |  Photo  |  Review
```
Five tabs, fixed bottom, full-width up to `max-w-lg`.

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
- Five-tab bottom nav covers the core app loop.
- Admin is a separate section, not interleaved with app UI.
- Deep-link routes (e.g., `/review/:itemId`) will be added as surfaces mature.

## Open questions
- Should `/review` eventually show a full `GardenEvent` timeline in addition to, or instead of, `ReviewCandidate` items?
- Is there a dedicated onboarding or first-run route needed at MVP?
- Will `/photo` gain a real backend upload endpoint; if so, what is the capture_type value?

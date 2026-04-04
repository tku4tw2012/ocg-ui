# Surface Contract Draft — ocg-ui

Lightweight draft contracts for each UI surface. These are **mock-friendly** — do not treat them as finalized backend schemas.

---

## Today

**Purpose:** Entry point for the day. Show context and surface quick captures.

| | |
|---|---|
| Primary actions | Start dictated note, open Quick Log, open Photo Check |
| Likely inputs | None (read-only on load) |
| Likely outputs | Navigation to capture surfaces |
| Data displayed | Weather summary block, recent timeline items (last 3–5), date |
| Future API placeholders | `GET /api/today-summary` → `{ weather, recentItems[], date }` |

---

## Dictated Note

**Purpose:** Fast free-text or voice note capture.

| | |
|---|---|
| Primary actions | Save note, discard |
| Likely inputs | Text area (voice-to-text via Web Speech API or manual) |
| Likely outputs | Saved `TimelineItem` of type `note` |
| Future API placeholders | `POST /api/items` with `{ type: "note", body: string, capturedAt: iso8601 }` |

---

## Quick Log

**Purpose:** Tap-to-record common garden actions.

| | |
|---|---|
| Primary actions | Tap action tile, optional add note, save |
| Likely inputs | Action type (from fixed list), optional free-text note, optional plant tag |
| Likely outputs | Saved `QuickLogAction` |
| Future API placeholders | `POST /api/items` with `{ type: "log", action: string, note?: string, plantTag?: string, capturedAt: iso8601 }` |

---

## Photo Check

**Purpose:** Capture a plant photo with optional note.

| | |
|---|---|
| Primary actions | Open camera / library, optionally add note, save |
| Likely inputs | Image file, optional text note, optional plant tag |
| Likely outputs | Saved `TimelineItem` of type `photo` |
| Future API placeholders | `POST /api/items/photo` with multipart `{ image, note?, plantTag?, capturedAt }` |

---

## Review

**Purpose:** Browse and reflect on past garden entries.

| | |
|---|---|
| Primary actions | Scroll timeline, filter by plant / type / date range, open detail |
| Likely inputs | Filter state (plant tag, type, date) |
| Likely outputs | None (read-only) |
| Future API placeholders | `GET /api/items?plant=&type=&since=&until=` → `TimelineItem[]` |

---

## Admin — Intake Queue

**Purpose:** Show raw ingested items awaiting processing.

| | |
|---|---|
| Primary actions | View item detail, manually trigger processing, dismiss |
| Likely inputs | None on load; operator actions per row |
| Likely outputs | Trigger process / dismiss API calls |
| Future API placeholders | `GET /api/admin/intake` → `IntakeItem[]`; `POST /api/admin/intake/:id/process` |

---

## Admin — Review Queue

**Purpose:** Show items flagged for manual operator review.

| | |
|---|---|
| Primary actions | Approve, edit, discard item |
| Likely inputs | Optional edited content per item |
| Likely outputs | Approved / discarded items removed from queue |
| Future API placeholders | `GET /api/admin/review` → `IntakeItem[]`; `PATCH /api/admin/review/:id` |

---

## Admin — Sync / Status

**Purpose:** Pipeline health overview.

| | |
|---|---|
| Primary actions | Trigger manual sync, view error detail |
| Likely inputs | None on load |
| Likely outputs | Trigger sync API call |
| Data displayed | `SyncStatus` block: last run, items processed, error count |
| Future API placeholders | `GET /api/admin/sync/status` → `SyncStatus`; `POST /api/admin/sync/run` |

---

## Admin — Settings Shell

**Purpose:** Runtime config display and placeholder for future settings.

| | |
|---|---|
| Primary actions | View current config values (read-only at MVP) |
| Likely inputs | None at MVP |
| Likely outputs | None at MVP |
| Future API placeholders | `GET /api/admin/config` → `{ [key: string]: string }` |

---

## Assumptions
- All `POST /api/items` calls are fire-and-store; no validation round-trip before save.
- `capturedAt` is always set client-side at time of tap/save.
- Plant tags are free-text strings at MVP; structured plant IDs are a future concern.

## Open questions
- Does the API use a unified `POST /api/items` with a `type` discriminator, or separate endpoints per capture type?
- Is image upload synchronous or does it return a job ID for async processing?
- What is the admin auth mechanism — Bearer token, cookie session, basic auth?

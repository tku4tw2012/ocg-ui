# Surface Contract Draft — ocg-ui

Lightweight draft contracts for each UI surface. These are **mock-friendly** — do not treat them as finalized backend schemas.

---

## Today

**Purpose:** Entry point for the day. Show context and surface quick captures.

| | |
|---|---|
| Primary actions | Navigate to Note, Log, or Photo capture |
| Likely inputs | None (read-only on load) |
| Likely outputs | Navigation to capture surfaces |
| Data displayed | Recent `GardenEvent[]`, `WatchItem[]` watch list, date |
| API (current) | Mock-only — `getRecentEvents()` and `getWatchItems()` return mock data |
| Future API placeholders | `GET /api/v1/events?limit=10` → `GardenEvent[]`; `GET /api/v1/watch` → `WatchItem[]` |

---

## Dictated Note

**Purpose:** Fast free-text note capture.

| | |
|---|---|
| Primary actions | Save note, discard |
| Likely inputs | Text area (manual; voice-to-text via Web Speech API is a future enhancement) |
| Likely outputs | Capture posted to intake endpoint |
| API (live) | `POST /api/v1/captures` · `{ capture_type: "dictated_note", raw_text, client_capture_id }` |
| Auth headers | `Authorization: Bearer <VITE_OCG_DEVICE_TOKEN>`, `x-ocg-device-id: <VITE_OCG_DEVICE_ID>` |
| Mock fallback | Falls back to `console.log` when env vars are absent |

---

## Quick Log

**Purpose:** Tap-to-record common garden actions.

| | |
|---|---|
| Primary actions | Tap action tile, optional add note / plant, save |
| Likely inputs | Action id (water / move_in / move_out / repot / observe / weed), optional plant text, optional note |
| Likely outputs | Capture posted to intake endpoint |
| API (live) | `POST /api/v1/captures` · `{ capture_type: "quick_log", raw_text: "<action> — <plant>", client_capture_id }` |
| Auth headers | `Authorization: Bearer <VITE_OCG_DEVICE_TOKEN>`, `x-ocg-device-id: <VITE_OCG_DEVICE_ID>` |
| Mock fallback | Falls back to `console.log` when env vars are absent |

---

## Photo Check

**Purpose:** Capture a plant photo with optional caption.

| | |
|---|---|
| Primary actions | Open camera / library, optionally add caption, save |
| Likely inputs | Image file (any `image/*`), optional caption text |
| Likely outputs | Mock console.log only — no backend call yet |
| API (current) | **Mock-only** — `submitPhoto()` logs to console; multipart upload contract is not yet defined |
| Future API placeholder | `POST /api/v1/captures/photo` · multipart `{ image, caption?, capture_type: "photo", client_capture_id }` |

---

## Review

**Purpose:** Browse AI-parsed garden entries and confirm or dismiss them.

| | |
|---|---|
| Primary actions | Confirm or dismiss `ReviewCandidate` items |
| Likely inputs | None on load; confirm / dismiss per item |
| Likely outputs | Status update per item (client-side state only at MVP) |
| Data displayed | `ReviewCandidate[]` filtered to `status === "pending"` |
| API (current) | Mock-only — `getReviewCandidates()` returns mock data |
| Future API placeholders | `GET /api/v1/review-candidates?status=pending` → `ReviewCandidate[]`; `PATCH /api/v1/review-candidates/:id` |

---

## Admin — Intake Queue

**Purpose:** Show raw ingested items awaiting processing.

| | |
|---|---|
| Primary actions | View item detail, source badge, status badge |
| Likely inputs | None on load |
| Likely outputs | None at MVP (read-only display) |
| Data displayed | `IntakeItem[]` with source emoji + status badge |
| API (current) | Mock-only — `getIntakeItems()` returns mock data |
| Future API placeholders | `GET /api/v1/admin/intake` → `IntakeItem[]`; `POST /api/v1/admin/intake/:id/process` |

---

## Admin — Review Queue

**Purpose:** Show AI-parsed items flagged for operator confirmation.

| | |
|---|---|
| Primary actions | Confirm or reject `ReviewCandidate` items |
| Likely inputs | Optional edited content per item |
| Likely outputs | Confirmed / rejected items removed from queue |
| Data displayed | `ReviewCandidate[]` with confidence badge |
| API (current) | Mock-only — `getReviewCandidates()` returns mock data |
| Future API placeholders | `GET /api/v1/admin/review-candidates` → `ReviewCandidate[]`; `PATCH /api/v1/admin/review-candidates/:id` |

---

## Admin — Sync / Status

**Purpose:** Pipeline health overview.

| | |
|---|---|
| Primary actions | View sync status, trigger manual sync (future) |
| Likely inputs | None on load |
| Likely outputs | None at MVP |
| Data displayed | Placeholder content at MVP — no live data shape defined yet |
| Future API placeholders | `GET /api/v1/admin/sync/status` → `SyncStatus`; `POST /api/v1/admin/sync/run` |

---

## Admin — Settings Shell

**Purpose:** Runtime config display and placeholder for future settings.

| | |
|---|---|
| Primary actions | View current config values (read-only at MVP) |
| Likely inputs | None at MVP |
| Likely outputs | None at MVP |
| Future API placeholders | `GET /api/v1/admin/config` → `{ [key: string]: string }` |

---

## Assumptions
- Text captures use `POST /api/v1/captures`; this endpoint is live. Photo capture endpoint is not yet defined.
- `client_capture_id` is always set client-side via `crypto.randomUUID()` at time of save.
- The backend does not return a structured response body on a successful capture POST (only HTTP status).
- All admin read endpoints are mock-only at MVP.

## Open questions
- Does the API return a structured `GardenEvent` body after a successful capture POST?
- What is the `capture_type` for photo captures?
- What auth mechanism does the admin UI use?

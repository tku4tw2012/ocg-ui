# Mock Data Shapes — ocg-ui

Types and mock fixtures that match the current codebase (`src/data/mock.ts`, `src/data/api.ts`).
These are used as the frontend data contract during development; backend schemas may diverge.

> All types below are canonical for the UI layer as of the current scaffold.

---

## GardenEvent

The primary display unit for the Today and (future) timeline surfaces.

```ts
interface GardenEvent {
  id: string
  type: 'water' | 'move_in' | 'move_out' | 'repot' | 'observe' | 'weed' | 'note' | 'photo'
  plant?: string
  zone?: string
  note?: string
  timestamp: string  // ISO 8601
}
```

**Example:**
```json
{
  "id": "2",
  "type": "observe",
  "plant": "Tomato seedlings",
  "note": "Two new true leaves showing. Looking healthy.",
  "zone": "grow tent",
  "timestamp": "2025-06-10T05:00:00Z"
}
```

---

## WatchItem

Items surfaced on the Today dashboard as reminders or follow-up notes.

```ts
interface WatchItem {
  id: string
  label: string
  plant?: string
  addedAt: string  // ISO 8601
}
```

**Example:**
```json
{
  "id": "w1",
  "label": "Check pepper seedlings — looked pale",
  "plant": "Peppers",
  "addedAt": "2025-06-09T20:00:00Z"
}
```

---

## IntakeItem

Admin intake queue items — raw captures waiting for processing.

```ts
interface IntakeItem {
  id: string
  source: 'gmail' | 'dictation' | 'photo' | 'manual'
  type: string         // free-text description e.g. "voice note", "photo capture"
  status: 'pending' | 'reviewed' | 'linked'
  preview: string      // short display string
  time: string         // relative time string e.g. "2h ago"
}
```

**Example:**
```json
{
  "id": "i1",
  "source": "dictation",
  "type": "voice note",
  "status": "pending",
  "preview": "Watered the basil and checked on the tomatoes...",
  "time": "2h ago"
}
```

---

## ReviewCandidate

Admin/app review queue items — AI-parsed captures awaiting confirmation.

```ts
interface ReviewCandidate {
  id: string
  rawText: string
  parsedPlant?: string
  parsedAction?: string
  confidence: 'high' | 'medium' | 'low'
  status: 'pending' | 'confirmed' | 'rejected'
}
```

**Example:**
```json
{
  "id": "r1",
  "rawText": "watered basil and mint",
  "parsedPlant": "Basil, Mint",
  "parsedAction": "water",
  "confidence": "high",
  "status": "pending"
}
```

---

## CapturePayload (live intake API request body)

Shape sent to `POST /api/v1/captures` for text-based captures.
Photo upload is mock-only; payload shape is TBD pending backend contract.

```ts
interface CapturePayload {
  capture_type: 'dictated_note' | 'quick_log'  // extend as new types are defined
  raw_text: string
  client_capture_id?: string  // UUID generated client-side
}
```

**Required headers:**
```
Authorization: Bearer <VITE_OCG_DEVICE_TOKEN>
x-ocg-device-id: <VITE_OCG_DEVICE_ID>
Content-Type: application/json
```

**Example (dictated note):**
```json
{
  "capture_type": "dictated_note",
  "raw_text": "Basil looking leggy, needs more light",
  "client_capture_id": "a1b2c3d4-..."
}
```

**Example (quick log):**
```json
{
  "capture_type": "quick_log",
  "raw_text": "water — tomatoes",
  "client_capture_id": "e5f6g7h8-..."
}
```

---

## Assumptions
- `GardenEvent` is the UI's current representation of historical activity; it may be replaced by a richer backend type.
- `WatchItem` is frontend-generated or AI-derived; backend source TBD.
- `IntakeItem.time` is a pre-formatted string from the mock; a real API would return an ISO timestamp.
- `client_capture_id` is set by the client using `crypto.randomUUID()`.
- `SyncStatus` and `WeatherSummaryBlock` shapes are deferred; no live data source or UI surface yet.

## Open questions
- What is the `capture_type` value for photo captures when the backend endpoint is defined?
- Will the backend return a structured `GardenEvent` after a successful capture POST, or is the read path entirely separate?
- What shape does the admin sync/status endpoint return?

# Mock Data Shapes — ocg-ui

Lightweight frontend-friendly mock shapes. These mirror expected API responses and are used during development before real endpoints exist.

> These are **draft shapes** — not authoritative backend schemas.

---

## TimelineItem

```ts
type TimelineItemType = "note" | "log" | "photo";

interface TimelineItem {
  id: string;                    // uuid
  type: TimelineItemType;
  body?: string;                 // free-text content (note or log note)
  action?: string;               // quick-log action label e.g. "watered"
  photoUrl?: string;             // resolved URL for photo items
  plantTag?: string;             // free-text plant identifier
  capturedAt: string;            // ISO 8601
  syncedAt?: string;             // ISO 8601, absent if pending sync
}
```

**Example:**
```json
{
  "id": "a1b2c3",
  "type": "note",
  "body": "Basil looking leggy, needs more light",
  "capturedAt": "2025-06-10T08:23:00Z",
  "syncedAt": "2025-06-10T08:24:15Z"
}
```

---

## QuickLogAction

```ts
interface QuickLogAction {
  id: string;                    // uuid, matches TimelineItem.id
  action: string;                // e.g. "watered", "fertilized", "observed"
  plantTag?: string;
  note?: string;
  capturedAt: string;            // ISO 8601
}
```

**Example:**
```json
{
  "id": "d4e5f6",
  "action": "watered",
  "plantTag": "tomatoes",
  "capturedAt": "2025-06-10T09:00:00Z"
}
```

---

## ReviewCard

```ts
interface ReviewCard {
  item: TimelineItem;
  relatedItems?: TimelineItem[]; // other items same day / same plant
}
```

**Example:**
```json
{
  "item": { "id": "a1b2c3", "type": "note", "body": "Basil leggy", "capturedAt": "2025-06-10T08:23:00Z" },
  "relatedItems": [
    { "id": "d4e5f6", "type": "log", "action": "watered", "plantTag": "basil", "capturedAt": "2025-06-10T09:00:00Z" }
  ]
}
```

---

## IntakeItem

```ts
type IntakeStatus = "pending" | "processing" | "flagged" | "done" | "error";

interface IntakeItem {
  id: string;
  source: string;                // e.g. "email", "manual", "photo"
  rawContent: string;            // original text or description
  status: IntakeStatus;
  receivedAt: string;            // ISO 8601
  errorMessage?: string;         // present when status === "error"
}
```

**Example:**
```json
{
  "id": "g7h8i9",
  "source": "email",
  "rawContent": "Watered everything this morning, tomatoes look good",
  "status": "pending",
  "receivedAt": "2025-06-10T07:15:00Z"
}
```

---

## SyncStatus

```ts
interface SyncStatus {
  lastRunAt?: string;            // ISO 8601, absent if never run
  itemsProcessed: number;
  itemsPending: number;
  errorCount: number;
  isRunning: boolean;
}
```

**Example:**
```json
{
  "lastRunAt": "2025-06-10T09:05:00Z",
  "itemsProcessed": 142,
  "itemsPending": 3,
  "errorCount": 1,
  "isRunning": false
}
```

---

## WeatherSummaryBlock

```ts
interface WeatherSummaryBlock {
  date: string;                  // ISO 8601 date ("2025-06-10")
  conditionLabel: string;        // e.g. "Partly cloudy"
  tempHighC?: number;
  tempLowC?: number;
  precipMm?: number;
  source?: string;               // attribution, e.g. "Open-Meteo"
}
```

**Example:**
```json
{
  "date": "2025-06-10",
  "conditionLabel": "Partly cloudy",
  "tempHighC": 24,
  "tempLowC": 14,
  "precipMm": 0,
  "source": "Open-Meteo"
}
```

---

## Assumptions
- All `id` fields are UUID strings generated client-side or server-side.
- All timestamps are ISO 8601 strings in UTC.
- `plantTag` is a free-text string; structured plant IDs are a future concern.
- `WeatherSummaryBlock` may be absent if weather data is unavailable — UI must handle gracefully.

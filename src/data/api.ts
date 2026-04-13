/**
 * API boundary layer.
 *
 * Text intake (submitNote, submitQuickLog) is wired to the live Azure intake
 * endpoint at POST /api/v1/captures and sends an authenticated device token.
 * All three env vars must be present (VITE_API_BASE_URL, VITE_OCG_DEVICE_TOKEN,
 * VITE_OCG_DEVICE_ID) for live requests to be made; when any are missing the
 * functions fall back to mock/console behavior so local dev keeps working.
 *
 * Read endpoints (getRecentEvents, getWatchItems, getReviewCandidates,
 * getIntakeItems) follow the same pattern: live fetch when API_BASE is set,
 * mock data when it is not.
 *
 * File upload (submitPhoto) is mock-only — multipart/file upload is deferred
 * until the backend contract for photo intake is defined.
 */

import {
  mockEvents,
  mockWatchItems,
  mockIntakeItems,
  mockReviewCandidates,
  type GardenEvent,
  type WatchItem,
  type IntakeItem,
  type ReviewCandidate,
} from './mock'

export type { GardenEvent, WatchItem, IntakeItem, ReviewCandidate } from './mock'

// All three env vars must be present for live requests. If any are missing,
// text-intake functions fall back to mock behavior so local dev keeps working.
const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined
const DEVICE_TOKEN = import.meta.env.VITE_OCG_DEVICE_TOKEN as string | undefined
const DEVICE_ID = import.meta.env.VITE_OCG_DEVICE_ID as string | undefined

/** Whether all env vars are set for live API calls. */
const isLive = Boolean(API_BASE && DEVICE_TOKEN && DEVICE_ID)

function authHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${DEVICE_TOKEN}`,
    'x-ocg-device-id': DEVICE_ID!,
  }
}

// -- Offline capture queue ------------------------------------------------

const QUEUE_KEY = 'ocg_pending_captures'

interface QueuedCapture {
  payload: CapturePayload
  queuedAt: string
}

function loadQueue(): QueuedCapture[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveQueue(q: QueuedCapture[]): void {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(q))
}

function enqueue(payload: CapturePayload): void {
  const q = loadQueue()
  q.push({ payload, queuedAt: new Date().toISOString() })
  saveQueue(q)
}

/** Flush any queued captures. Called on app init and after successful saves. */
export async function flushCaptureQueue(): Promise<void> {
  if (!isLive) return
  const q = loadQueue()
  if (q.length === 0) return
  const remaining: QueuedCapture[] = []
  for (const item of q) {
    try {
      await postCaptureRaw(item.payload)
    } catch {
      remaining.push(item)
    }
  }
  saveQueue(remaining)
}

/** Number of captures waiting to be sent. */
export function pendingCaptureCount(): number {
  return loadQueue().length
}

// -- Capture POST ---------------------------------------------------------

interface CapturePayload {
  capture_type: string
  raw_text: string
  client_capture_id?: string
}

/** Raw POST — throws on failure. Does NOT queue. */
async function postCaptureRaw(payload: CapturePayload): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/captures`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Capture POST failed: ${res.status} ${res.statusText}`)
  }
}

/**
 * Submit a capture. In mock mode, logs to console. In live mode, attempts
 * the POST and queues in localStorage on failure (network error, offline).
 */
async function postCapture(payload: CapturePayload): Promise<void> {
  if (!isLive) {
    console.log('[API mock] postCapture:', payload)
    return
  }
  try {
    await postCaptureRaw(payload)
    // Successful send — also try to flush any previously queued items.
    flushCaptureQueue().catch(() => {})
  } catch (err) {
    enqueue(payload)
    throw err
  }
}

// -- Generic live GET helper ----------------------------------------------

async function liveGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: authHeaders(),
  })
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

// -- App API --------------------------------------------------------------

export async function getRecentEvents(): Promise<GardenEvent[]> {
  if (!isLive) return mockEvents
  // TODO: real endpoint — adjust path when backend ships this
  try {
    return await liveGet<GardenEvent[]>('/api/v1/events?limit=20')
  } catch {
    return mockEvents
  }
}

export async function getWatchItems(): Promise<WatchItem[]> {
  if (!isLive) return mockWatchItems
  // TODO: real endpoint — adjust path when backend ships this
  try {
    return await liveGet<WatchItem[]>('/api/v1/watch')
  } catch {
    return mockWatchItems
  }
}

export async function submitNote(text: string): Promise<void> {
  await postCapture({
    capture_type: 'dictated_note',
    raw_text: text,
    client_capture_id: crypto.randomUUID(),
  })
}

export async function submitQuickLog(action: string, plant?: string, note?: string): Promise<void> {
  const parts = [action, plant, note].filter(Boolean)
  await postCapture({
    capture_type: 'quick_log',
    raw_text: parts.join(' — '),
    client_capture_id: crypto.randomUUID(),
  })
}

// submitPhoto is mock-only — file upload contract is not yet defined.
export async function submitPhoto(file: File, caption?: string): Promise<void> {
  console.log('[API mock] submitPhoto:', file.name, caption)
}

// -- Admin API ------------------------------------------------------------

export async function getIntakeItems(): Promise<IntakeItem[]> {
  if (!isLive) return mockIntakeItems
  // TODO: real endpoint
  try {
    return await liveGet<IntakeItem[]>('/api/v1/admin/intake')
  } catch {
    return mockIntakeItems
  }
}

export async function getReviewCandidates(): Promise<ReviewCandidate[]> {
  if (!isLive) return mockReviewCandidates
  // TODO: real endpoint
  try {
    return await liveGet<ReviewCandidate[]>('/api/v1/admin/review-candidates')
  } catch {
    return mockReviewCandidates
  }
}

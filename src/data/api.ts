/**
 * API boundary layer.
 *
 * Text intake (submitNote, submitQuickLog) is wired to the live Azure intake
 * endpoint at POST /api/v1/captures and sends an authenticated device token.
 * All three env vars must be present (VITE_API_BASE_URL, VITE_OCG_DEVICE_TOKEN,
 * VITE_OCG_DEVICE_ID) for live requests to be made; when any are missing the
 * functions fall back to mock/console behavior so local dev keeps working.
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

interface CapturePayload {
  capture_type: string
  raw_text: string
  client_capture_id?: string
}

async function postCapture(payload: CapturePayload): Promise<void> {
  if (!API_BASE || !DEVICE_TOKEN || !DEVICE_ID) {
    console.log('[API mock] postCapture:', payload)
    return
  }
  const res = await fetch(`${API_BASE}/api/v1/captures`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEVICE_TOKEN}`,
      'x-ocg-device-id': DEVICE_ID,
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Capture POST failed: ${res.status} ${res.statusText}`)
  }
}

// -- App API --

export async function getRecentEvents(): Promise<GardenEvent[]> {
  return Promise.resolve(mockEvents)
}

export async function getWatchItems(): Promise<WatchItem[]> {
  return Promise.resolve(mockWatchItems)
}

export async function submitNote(text: string): Promise<void> {
  await postCapture({
    capture_type: 'dictated_note',
    raw_text: text,
    client_capture_id: crypto.randomUUID(),
  })
}

export async function submitQuickLog(
  action: string,
  plant?: string,
  note?: string
): Promise<void> {
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

// -- Admin API --

export async function getIntakeItems(): Promise<IntakeItem[]> {
  return Promise.resolve(mockIntakeItems)
}

export async function getReviewCandidates(): Promise<ReviewCandidate[]> {
  return Promise.resolve(mockReviewCandidates)
}

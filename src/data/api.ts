/**
 * API boundary layer.
 *
 * Text intake (submitNote, submitQuickLog) is wired to the live Azure intake
 * endpoint at POST /api/v1/captures. If VITE_API_BASE_URL is not set the
 * functions fall back to mock/console behavior so local dev keeps working.
 *
 * File upload (submitPhoto) is mock-only for now — multipart handling is
 * deferred until the backend contract for photo intake is defined.
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

// Base URL is set via VITE_API_BASE_URL in .env (e.g. https://ocg-api.azurewebsites.net).
// When absent, text-intake functions fall back to mock behavior.
const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined

interface CapturePayload {
  capture_type: string
  raw_text: string
  client_capture_id?: string
}

async function postCapture(payload: CapturePayload): Promise<void> {
  if (!API_BASE) {
    console.log('[API mock] postCapture:', payload)
    return
  }
  const res = await fetch(`${API_BASE}/api/v1/captures`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    capture_type: 'note',
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

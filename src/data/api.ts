/**
 * API boundary layer.
 * Currently returns mock data. Replace fetch calls here when backend is ready.
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

// -- App API --

export async function getRecentEvents(): Promise<GardenEvent[]> {
  return Promise.resolve(mockEvents)
}

export async function getWatchItems(): Promise<WatchItem[]> {
  return Promise.resolve(mockWatchItems)
}

export async function submitNote(text: string): Promise<void> {
  console.log('[API] submitNote:', text)
  return Promise.resolve()
}

export async function submitQuickLog(
  action: string,
  plant?: string,
  note?: string
): Promise<void> {
  console.log('[API] submitQuickLog:', { action, plant, note })
  return Promise.resolve()
}

export async function submitPhoto(file: File, caption?: string): Promise<void> {
  console.log('[API] submitPhoto:', file.name, caption)
  return Promise.resolve()
}

// -- Admin API --

export async function getIntakeItems(): Promise<IntakeItem[]> {
  return Promise.resolve(mockIntakeItems)
}

export async function getReviewCandidates(): Promise<ReviewCandidate[]> {
  return Promise.resolve(mockReviewCandidates)
}

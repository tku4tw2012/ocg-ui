/**
 * Quick Log action definitions.
 *
 * Each entry maps to a capture type sent to POST /api/v1/captures
 * (capture_type: 'quick_log', raw_text includes the action id).
 * Add, remove, or reorder actions here without touching the QuickLog page.
 */

export interface QuickLogAction {
  /** Action identifier — passed as the first segment of raw_text. */
  id: string
  /** Human-readable button label. */
  label: string
  /** Emoji shown above the label on the action tile. */
  emoji: string
}

export const quickLogActions: QuickLogAction[] = [
  { id: 'water', label: 'Watered', emoji: '💧' },
  { id: 'move_in', label: 'Moved Indoors', emoji: '🏠' },
  { id: 'move_out', label: 'Moved Outdoors', emoji: '🌤' },
  { id: 'repot', label: 'Repotted', emoji: '🪴' },
  { id: 'observe', label: 'Observed', emoji: '👁' },
  { id: 'weed', label: 'Weeded', emoji: '🌱' },
]

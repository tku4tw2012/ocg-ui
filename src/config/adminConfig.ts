/**
 * Admin surface config.
 *
 * Sync source display list and settings section list live here.
 * These are display-only placeholders until backend contracts are settled.
 * Status color tokens map status strings to Tailwind text-color classes.
 */

export type SyncSourceStatus = 'connected' | 'idle' | 'disconnected'

export interface SyncSource {
  name: string
  status: SyncSourceStatus
  detail: string
  emoji: string
}

/** Displayed in the Sync / Status admin page. */
export const syncSources: SyncSource[] = [
  { name: 'Cloud Intake', status: 'idle', detail: 'Last pull: 2h ago', emoji: '☁️' },
  { name: 'Gmail', status: 'connected', detail: '3 messages scanned today', emoji: '✉️' },
  { name: 'Weather', status: 'disconnected', detail: 'No source configured', emoji: '🌤' },
  { name: 'OpenClaw Core', status: 'idle', detail: 'Local processing: ready', emoji: '🧠' },
]

/** Tailwind text-color class per sync status. */
export const syncStatusColor: Record<SyncSourceStatus, string> = {
  connected: 'text-green-700',
  idle: 'text-amber-600',
  disconnected: 'text-stone-400',
}

export interface SettingsSection {
  title: string
  detail: string
}

/** Placeholder sections listed in the Settings admin page. */
export const settingsSections: SettingsSection[] = [
  { title: 'Garden Profile', detail: 'Name, location, zones' },
  { title: 'Notification Preferences', detail: 'Follow-up reminders, alerts' },
  { title: 'Source Connections', detail: 'Gmail, weather API keys' },
  { title: 'Data Export', detail: 'Export garden log as JSON or CSV' },
  { title: 'App Theme', detail: 'Light / dark / system' },
]

export const adminPageCopy = {
  intake: {
    title: 'Intake Queue',
    subtitle: (pendingCount: number) => `${pendingCount} pending`,
  },
  review: {
    title: 'Review Queue',
    subtitle: (pendingCount: number) => `${pendingCount} pending`,
  },
  sync: {
    title: 'Sync / Status',
    subtitle: 'Source and processing status',
    placeholderNote:
      'Source configurations and pull schedules will be managed here. Placeholder until backend contracts are settled.',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Configuration placeholder',
    footerNote:
      'Settings sections are placeholders. Full configuration will be added as backend contracts are settled.',
  },
} as const

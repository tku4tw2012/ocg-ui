/**
 * Navigation config.
 *
 * App bottom-nav items and admin top-nav items live here so that
 * adding, removing, or reordering destinations is a one-line change.
 * Routes themselves are defined in App.tsx — do not add routing logic here.
 */

export interface AppNavItem {
  to: string
  label: string
  emoji: string
}

export interface AdminNavItem {
  to: string
  label: string
}

/** App bottom-nav items (order = left-to-right display order). */
export const appNavItems: AppNavItem[] = [
  { to: '/today', label: 'Today', emoji: '🌿' },
  { to: '/note', label: 'Note', emoji: '🎙' },
  { to: '/log', label: 'Log', emoji: '⚡' },
  { to: '/photo', label: 'Photo', emoji: '📷' },
  { to: '/review', label: 'Review', emoji: '📋' },
]

/** Admin top-nav items (order = left-to-right display order). */
export const adminNavItems: AdminNavItem[] = [
  { to: '/admin/intake', label: 'Intake' },
  { to: '/admin/review', label: 'Review' },
  { to: '/admin/sync', label: 'Sync' },
  { to: '/admin/settings', label: 'Settings' },
]

/** Human-readable admin branding shown in the header. */
export const adminBrandLabel = 'OCGarden Admin'

/** Link label for the "back to app" nav control in admin header. */
export const adminBackToAppLabel = '← App'

/**
 * Design tokens — tunable Tailwind class strings.
 *
 * These represent the core visual choices for the app and admin surfaces.
 * Components import from here so a single-line change updates the whole surface.
 * Class strings must remain valid Tailwind classes (v3 JIT).
 */

export const theme = {
  app: {
    /** Page background (mobile shell) */
    bg: 'bg-stone-50',
    /** Max content width for mobile-first layout */
    maxWidth: 'max-w-lg',
    /** Standard page content padding */
    contentPadding: 'px-4 pt-6 pb-4',
  },
  admin: {
    /** Page background (admin shell) */
    bg: 'bg-stone-100',
    /** Header/nav bar background */
    headerBg: 'bg-stone-800',
    /** Max content width for admin layout */
    maxWidth: 'max-w-4xl',
    /** Admin page content padding */
    contentPadding: 'px-4 py-6',
  },
  card: {
    /** Rounded corner size used on cards and buttons */
    radius: 'rounded-2xl',
    /** Card border */
    border: 'border border-stone-100',
    /** Card shadow */
    shadow: 'shadow-sm',
  },
  input: {
    /** Base class string for text inputs and textareas */
    base: 'rounded-2xl border border-stone-200 bg-white text-stone-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-green-300',
  },
  button: {
    /** Full-width primary action button */
    primary:
      'bg-green-700 text-white font-semibold active:bg-green-800 disabled:opacity-40 transition-opacity rounded-2xl',
    /** Compact secondary/outline button */
    secondary: 'border border-stone-200 text-stone-500 active:bg-stone-50 rounded-xl',
  },
} as const

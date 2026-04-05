/**
 * App-wide UI copy and display config.
 *
 * Covers page titles, subtitles, placeholder text, button labels,
 * empty states, section headings, and the event action label map.
 * Keep API contract values (capture_type strings) in api.ts — not here.
 */

/** Maps GardenEvent.type to a human-readable display label. */
export const actionLabels: Record<string, string> = {
  water: 'Watered',
  move_in: 'Moved indoors',
  move_out: 'Moved outdoors',
  repot: 'Repotted',
  observe: 'Observed',
  weed: 'Weeded',
  note: 'Note',
  photo: 'Photo',
}

/** Example notes shown on the Dictated Note screen as tap-to-fill prompts. */
export const noteExamples: string[] = [
  'Watered the basil and the mint. Basil looked a little droopy.',
  'Pepper seedlings still pale — maybe more light needed?',
  'Moved Meyer Lemon back outside. Frost cleared.',
]

export const pageCopy = {
  today: {
    title: 'Today',
    weatherPlaceholderTitle: 'Weather context',
    weatherPlaceholderDetail: 'Connect weather source to show conditions',
  },
  note: {
    title: 'Note',
    subtitle: 'Quick capture — save first, parse later',
    placeholder: 'What happened in the garden?',
    saveLabel: 'Save Note',
    savedLabel: '✓ Saved',
    examplesHeading: 'Examples',
  },
  quickLog: {
    title: 'Quick Log',
    subtitle: 'One tap. Done.',
    notePlaceholder: 'Optional note...',
    saveLabel: 'Log It',
    savedLabel: '✓ Logged',
  },
  photo: {
    title: 'Photo Check',
    subtitle: 'Upload a photo to log',
    captionPlaceholder: 'Optional caption or hint...',
    pickPrompt: 'Tap to choose or take photo',
    /** Shown below the caption field. Must not imply live upload. */
    deferredNotice: 'Zone / plant identification will be linked after upload.',
    changePhotoLabel: 'Change photo',
    saveLabel: 'Save Photo',
    savedLabel: '✓ Saved',
  },
  review: {
    title: 'Review',
    emptyIcon: '✓',
    emptyMessage: 'All caught up',
  },
} as const

export const sectionHeadings = {
  followUp: 'Follow-up',
  recent: 'Recent',
  examples: 'Examples',
} as const

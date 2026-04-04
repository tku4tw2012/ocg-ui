export interface GardenEvent {
  id: string
  type: 'water' | 'move_in' | 'move_out' | 'repot' | 'observe' | 'weed' | 'note' | 'photo'
  plant?: string
  zone?: string
  note?: string
  timestamp: string
}

export interface WatchItem {
  id: string
  label: string
  plant?: string
  addedAt: string
}

export interface IntakeItem {
  id: string
  source: 'gmail' | 'dictation' | 'photo' | 'manual'
  type: string
  status: 'pending' | 'reviewed' | 'linked'
  preview: string
  time: string
}

export interface ReviewCandidate {
  id: string
  rawText: string
  parsedPlant?: string
  parsedAction?: string
  confidence: 'high' | 'medium' | 'low'
  status: 'pending' | 'confirmed' | 'rejected'
}

export const mockEvents: GardenEvent[] = [
  {
    id: '1',
    type: 'water',
    plant: 'Basil (south window)',
    zone: 'kitchen',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'observe',
    plant: 'Tomato seedlings',
    note: 'Two new true leaves showing. Looking healthy.',
    zone: 'grow tent',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'move_in',
    plant: 'Meyer Lemon',
    zone: 'garage',
    note: 'Frost warning tonight',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'note',
    note: 'Need to check on pepper seedlings tomorrow — looked a bit pale.',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockWatchItems: WatchItem[] = [
  { id: 'w1', label: 'Check pepper seedlings — looked pale', plant: 'Peppers', addedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString() },
  { id: 'w2', label: 'Meyer Lemon – move back outside when frost clears', plant: 'Meyer Lemon', addedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
]

export const mockIntakeItems: IntakeItem[] = [
  { id: 'i1', source: 'dictation', type: 'voice note', status: 'pending', preview: 'Watered the basil and checked on the tomatoes...', time: '2h ago' },
  { id: 'i2', source: 'gmail', type: 'shipping confirmation', status: 'pending', preview: 'Your order of Jiffy peat pellets has shipped', time: '4h ago' },
  { id: 'i3', source: 'photo', type: 'photo capture', status: 'reviewed', preview: 'IMG_2041.jpg — grow tent', time: 'yesterday' },
  { id: 'i4', source: 'manual', type: 'quick log', status: 'linked', preview: 'Weeded raised bed #2', time: '2d ago' },
]

export const mockReviewCandidates: ReviewCandidate[] = [
  { id: 'r1', rawText: 'watered basil and mint', parsedPlant: 'Basil, Mint', parsedAction: 'water', confidence: 'high', status: 'pending' },
  { id: 'r2', rawText: 'moved the lemon tree inside before the freeze', parsedPlant: 'Meyer Lemon', parsedAction: 'move_in', confidence: 'high', status: 'pending' },
  { id: 'r3', rawText: 'checked on seedlings in the tent', parsedPlant: undefined, parsedAction: 'observe', confidence: 'medium', status: 'pending' },
  { id: 'r4', rawText: 'replanted something into the big pot on the deck', parsedPlant: undefined, parsedAction: 'repot', confidence: 'low', status: 'pending' },
]

import { useState } from 'react'
import { submitQuickLog } from '../../data/api'

const actions = [
  { id: 'water', label: 'Watered', emoji: '💧' },
  { id: 'move_in', label: 'Moved Indoors', emoji: '🏠' },
  { id: 'move_out', label: 'Moved Outdoors', emoji: '🌤' },
  { id: 'repot', label: 'Repotted', emoji: '🪴' },
  { id: 'observe', label: 'Observed', emoji: '👁' },
  { id: 'weed', label: 'Weeded', emoji: '🌱' },
]

export default function QuickLog() {
  const [selected, setSelected] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    if (!selected) return
    await submitQuickLog(selected, undefined, note || undefined)
    setSaved(true)
    setSelected(null)
    setNote('')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-stone-800">Quick Log</h1>
        <p className="text-sm text-stone-400 mt-1">One tap. Done.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setSelected(selected === id ? null : id)}
            className={`flex flex-col items-center justify-center gap-2 rounded-2xl border py-5 text-sm font-medium transition-colors ${
              selected === id
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-stone-700 border-stone-200 active:bg-stone-50'
            }`}
          >
            <span className="text-2xl">{emoji}</span>
            {label}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note..."
        rows={3}
        className="w-full rounded-2xl border border-stone-200 bg-white p-4 text-stone-800 placeholder-stone-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
      />

      <button
        onClick={handleSave}
        disabled={!selected}
        className="w-full py-4 rounded-2xl bg-green-700 text-white font-semibold text-base active:bg-green-800 disabled:opacity-40 transition-opacity"
      >
        {saved ? '✓ Logged' : 'Log It'}
      </button>
    </div>
  )
}

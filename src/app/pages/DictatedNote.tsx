import { useState } from 'react'
import { submitNote } from '../../data/api'

const examples = [
  'Watered the basil and the mint. Basil looked a little droopy.',
  'Pepper seedlings still pale — maybe more light needed?',
  'Moved Meyer Lemon back outside. Frost cleared.',
]

export default function DictatedNote() {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  async function handleSubmit() {
    if (!text.trim()) return
    await submitNote(text.trim())
    setSaved(true)
    setText('')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-stone-800">Note</h1>
        <p className="text-sm text-stone-400 mt-1">Quick capture — save first, parse later</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What happened in the garden?"
        rows={7}
        className="w-full rounded-2xl border border-stone-200 bg-white p-4 text-stone-800 placeholder-stone-300 text-base resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
        autoFocus
      />

      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="w-full py-4 rounded-2xl bg-green-700 text-white font-semibold text-base active:bg-green-800 disabled:opacity-40 transition-opacity"
      >
        {saved ? '✓ Saved' : 'Save Note'}
      </button>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-3">Examples</h2>
        <div className="space-y-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setText(ex)}
              className="w-full text-left bg-white rounded-2xl border border-stone-100 px-4 py-3 text-sm text-stone-500 active:bg-stone-50"
            >
              {ex}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

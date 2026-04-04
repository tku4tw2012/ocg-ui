import { useEffect, useState } from 'react'
import Badge from '../../components/Badge'
import { getIntakeItems } from '../../data/api'
import type { IntakeItem } from '../../data/api'

const sourceEmoji: Record<string, string> = {
  gmail: '✉️',
  dictation: '🎙',
  photo: '📷',
  manual: '✏️',
}

const statusVariant: Record<string, 'yellow' | 'green' | 'stone'> = {
  pending: 'yellow',
  reviewed: 'stone',
  linked: 'green',
}

export default function IntakeQueue() {
  const [items, setItems] = useState<IntakeItem[]>([])

  useEffect(() => {
    getIntakeItems().then(setItems)
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-stone-800">Intake Queue</h1>
        <p className="text-sm text-stone-500 mt-1">{items.filter((i) => i.status === 'pending').length} pending</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3">
            <span className="text-xl shrink-0">{sourceEmoji[item.source]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-stone-400">{item.type}</span>
                <Badge label={item.status} variant={statusVariant[item.status]} />
              </div>
              <p className="text-sm text-stone-600 truncate mt-0.5">{item.preview}</p>
            </div>
            <span className="text-xs text-stone-400 shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

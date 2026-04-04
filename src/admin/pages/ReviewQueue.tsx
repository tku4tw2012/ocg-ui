import { useEffect, useState } from 'react'
import Badge from '../../components/Badge'
import { getReviewCandidates } from '../../data/api'
import type { ReviewCandidate } from '../../data/api'

const confidenceVariant: Record<string, 'green' | 'yellow' | 'red'> = {
  high: 'green',
  medium: 'yellow',
  low: 'red',
}

export default function ReviewQueue() {
  const [items, setItems] = useState<ReviewCandidate[]>([])

  useEffect(() => {
    getReviewCandidates().then(setItems)
  }, [])

  function updateStatus(id: string, status: ReviewCandidate['status']) {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-stone-800">Review Queue</h1>
        <p className="text-sm text-stone-500 mt-1">{items.filter((r) => r.status === 'pending').length} pending</p>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border border-stone-200 px-4 py-3 ${
              item.status !== 'pending' ? 'opacity-50' : ''
            }`}
          >
            <p className="text-sm text-stone-600 italic">"{item.rawText}"</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.parsedPlant && <Badge label={item.parsedPlant} variant="green" />}
              {item.parsedAction && <Badge label={item.parsedAction} variant="stone" />}
              <Badge label={`${item.confidence} confidence`} variant={confidenceVariant[item.confidence]} />
              {item.status !== 'pending' && <Badge label={item.status} variant="stone" />}
            </div>
            {item.status === 'pending' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateStatus(item.id, 'confirmed')}
                  className="px-3 py-1.5 rounded-lg bg-green-700 text-white text-xs font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(item.id, 'rejected')}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-500 text-xs"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

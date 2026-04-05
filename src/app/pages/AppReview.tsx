import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import { getReviewCandidates } from '../../data/api'
import type { ReviewCandidate } from '../../data/api'
import { pageCopy } from '../../config/appConfig'

const confidenceVariant: Record<string, 'green' | 'yellow' | 'red'> = {
  high: 'green',
  medium: 'yellow',
  low: 'red',
}

export default function AppReview() {
  const [items, setItems] = useState<ReviewCandidate[]>([])

  useEffect(() => {
    getReviewCandidates().then((all) => setItems(all.filter((r) => r.status === 'pending')))
  }, [])

  function dismiss(id: string) {
    setItems((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-stone-800">{pageCopy.review.title}</h1>
        <p className="text-sm text-stone-400 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} to review</p>
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-stone-400">
          <span className="text-4xl block mb-3">{pageCopy.review.emptyIcon}</span>
          <p className="text-sm">{pageCopy.review.emptyMessage}</p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <p className="text-sm text-stone-600 italic leading-snug">"{item.rawText}"</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.parsedPlant && <Badge label={item.parsedPlant} variant="green" />}
              {item.parsedAction && <Badge label={item.parsedAction} variant="stone" />}
              <Badge label={`${item.confidence} confidence`} variant={confidenceVariant[item.confidence]} />
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-xl bg-green-700 text-white text-sm font-medium active:bg-green-800">
                Confirm
              </button>
              <button
                onClick={() => dismiss(item.id)}
                className="flex-1 py-2 rounded-xl border border-stone-200 text-stone-500 text-sm active:bg-stone-50"
              >
                Dismiss
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

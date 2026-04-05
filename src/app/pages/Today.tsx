import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import { getRecentEvents, getWatchItems } from '../../data/api'
import type { GardenEvent, WatchItem } from '../../data/api'
import { actionLabels, pageCopy, sectionHeadings } from '../../config/appConfig'

function formatTime(iso: string): string {
  const d = new Date(iso)
  const diffMs = Date.now() - d.getTime()
  const diffH = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffH < 1) return 'just now'
  if (diffH < 24) return `${diffH}h ago`
  return `${Math.floor(diffH / 24)}d ago`
}

export default function Today() {
  const [events, setEvents] = useState<GardenEvent[]>([])
  const [watches, setWatches] = useState<WatchItem[]>([])

  useEffect(() => {
    getRecentEvents().then(setEvents)
    getWatchItems().then(setWatches)
  }, [])

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-stone-800">{pageCopy.today.title}</h1>
        <p className="text-sm text-stone-400 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Weather placeholder */}
      <Card className="flex items-center gap-3 bg-green-50 border-green-100">
        <span className="text-3xl">🌤</span>
        <div>
          <p className="text-sm font-medium text-stone-700">{pageCopy.today.weatherPlaceholderTitle}</p>
          <p className="text-xs text-stone-400">{pageCopy.today.weatherPlaceholderDetail}</p>
        </div>
      </Card>

      {/* Watch items */}
      {watches.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">{sectionHeadings.followUp}</h2>
          <div className="space-y-2">
            {watches.map((w) => (
              <Card key={w.id} className="flex items-start gap-3">
                <span className="text-lg mt-0.5">👁</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-700 leading-snug">{w.label}</p>
                  {w.plant && <p className="text-xs text-stone-400 mt-0.5">{w.plant}</p>}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recent events */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">{sectionHeadings.recent}</h2>
        <div className="space-y-2">
          {events.map((e) => (
            <Card key={e.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge label={actionLabels[e.type] ?? e.type} variant="stone" />
                    {e.zone && <Badge label={e.zone} variant="green" />}
                  </div>
                  {e.plant && <p className="text-sm font-medium text-stone-700 mt-1">{e.plant}</p>}
                  {e.note && <p className="text-sm text-stone-500 mt-1 leading-snug">{e.note}</p>}
                </div>
                <span className="text-xs text-stone-400 whitespace-nowrap shrink-0">{formatTime(e.timestamp)}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

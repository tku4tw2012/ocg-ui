import { syncSources, syncStatusColor, adminPageCopy } from '../../config/adminConfig'

export default function SyncStatus() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-stone-800">{adminPageCopy.sync.title}</h1>
        <p className="text-sm text-stone-500 mt-1">{adminPageCopy.sync.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
        {syncSources.map((s) => (
          <div key={s.name} className="flex items-center gap-3 px-4 py-3">
            <span className="text-xl">{s.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-stone-700">{s.name}</span>
                <span className={`text-xs font-medium ${syncStatusColor[s.status]}`}>{s.status}</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 rounded-xl border border-stone-200 px-4 py-3 text-xs text-stone-400">
        {adminPageCopy.sync.placeholderNote}
      </div>
    </div>
  )
}

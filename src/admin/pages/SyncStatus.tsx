const sources = [
  { name: 'Cloud Intake', status: 'idle', detail: 'Last pull: 2h ago', emoji: '☁️' },
  { name: 'Gmail', status: 'connected', detail: '3 messages scanned today', emoji: '✉️' },
  { name: 'Weather', status: 'disconnected', detail: 'No source configured', emoji: '🌤' },
  { name: 'OpenClaw Core', status: 'idle', detail: 'Local processing: ready', emoji: '🧠' },
]

const statusColor: Record<string, string> = {
  connected: 'text-green-700',
  idle: 'text-amber-600',
  disconnected: 'text-stone-400',
}

export default function SyncStatus() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-stone-800">Sync / Status</h1>
        <p className="text-sm text-stone-500 mt-1">Source and processing status</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-3 px-4 py-3">
            <span className="text-xl">{s.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-stone-700">{s.name}</span>
                <span className={`text-xs font-medium ${statusColor[s.status]}`}>{s.status}</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 rounded-xl border border-stone-200 px-4 py-3 text-xs text-stone-400">
        Source configurations and pull schedules will be managed here. Placeholder until backend contracts are settled.
      </div>
    </div>
  )
}

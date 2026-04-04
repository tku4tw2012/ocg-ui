const sections = [
  { title: 'Garden Profile', detail: 'Name, location, zones' },
  { title: 'Notification Preferences', detail: 'Follow-up reminders, alerts' },
  { title: 'Source Connections', detail: 'Gmail, weather API keys' },
  { title: 'Data Export', detail: 'Export garden log as JSON or CSV' },
  { title: 'App Theme', detail: 'Light / dark / system' },
]

export default function Settings() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-stone-800">Settings</h1>
        <p className="text-sm text-stone-500 mt-1">Configuration placeholder</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
        {sections.map((s) => (
          <div key={s.title} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-stone-700">{s.title}</p>
              <p className="text-xs text-stone-400 mt-0.5">{s.detail}</p>
            </div>
            <span className="text-stone-300 text-lg">›</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400 px-1">
        Settings sections are placeholders. Full configuration will be added as backend contracts are settled.
      </p>
    </div>
  )
}

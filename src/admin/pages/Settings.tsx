import { settingsSections, adminPageCopy } from '../../config/adminConfig'

export default function Settings() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-stone-800">{adminPageCopy.settings.title}</h1>
        <p className="text-sm text-stone-500 mt-1">{adminPageCopy.settings.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
        {settingsSections.map((s) => (
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
        {adminPageCopy.settings.footerNote}
      </p>
    </div>
  )
}

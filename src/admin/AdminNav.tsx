import { NavLink, Link } from 'react-router-dom'

const navItems = [
  { to: '/admin/intake', label: 'Intake' },
  { to: '/admin/review', label: 'Review' },
  { to: '/admin/sync', label: 'Sync' },
  { to: '/admin/settings', label: 'Settings' },
]

export default function AdminNav() {
  return (
    <header className="bg-stone-800 text-white">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-12">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-sm font-semibold text-stone-200 shrink-0">
            OCGarden Admin
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-sm transition-colors ${
                    isActive ? 'bg-stone-600 text-white' : 'text-stone-400 hover:text-stone-200'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <Link to="/today" className="text-xs text-stone-500 hover:text-stone-300">
          ← App
        </Link>
      </div>
    </header>
  )
}

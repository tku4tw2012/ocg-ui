import { NavLink, Link } from 'react-router-dom'
import { adminNavItems, adminBrandLabel, adminBackToAppLabel } from '../config/navigation'

export default function AdminNav() {
  return (
    <header className="bg-stone-800 text-white">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-12">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-sm font-semibold text-stone-200 shrink-0">
            {adminBrandLabel}
          </Link>
          <nav className="flex items-center gap-1">
            {adminNavItems.map(({ to, label }) => (
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
          {adminBackToAppLabel}
        </Link>
      </div>
    </header>
  )
}

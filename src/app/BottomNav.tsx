import { NavLink } from 'react-router-dom'
import { appNavItems } from '../config/navigation'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 flex justify-around items-stretch h-16 max-w-lg mx-auto z-10">
      {appNavItems.map(({ to, label, emoji }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 gap-1 text-xs transition-colors ${
              isActive ? 'text-green-700' : 'text-stone-400'
            }`
          }
        >
          <span className="text-lg leading-none">{emoji}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

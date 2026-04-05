import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import { theme } from '../config/theme'

export default function AppShell() {
  return (
    <div className={`flex flex-col h-full ${theme.app.bg} ${theme.app.maxWidth} mx-auto`}>
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'
import { theme } from '../config/theme'

export default function AdminShell() {
  return (
    <div className={`flex flex-col h-full ${theme.admin.bg}`}>
      <AdminNav />
      <main className="flex-1 overflow-y-auto">
        <div className={`${theme.admin.maxWidth} mx-auto ${theme.admin.contentPadding}`}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

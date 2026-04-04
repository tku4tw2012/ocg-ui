import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'

export default function AdminShell() {
  return (
    <div className="flex flex-col h-full bg-stone-100">
      <AdminNav />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './app/AppShell'
import AdminShell from './admin/AdminShell'
import Today from './app/pages/Today'
import DictatedNote from './app/pages/DictatedNote'
import QuickLog from './app/pages/QuickLog'
import PhotoCheck from './app/pages/PhotoCheck'
import AppReview from './app/pages/AppReview'
import IntakeQueue from './admin/pages/IntakeQueue'
import ReviewQueue from './admin/pages/ReviewQueue'
import SyncStatus from './admin/pages/SyncStatus'
import Settings from './admin/pages/Settings'

export default function App() {
  return (
    <Routes>
      {/* App routes */}
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/today" replace />} />
        <Route path="today" element={<Today />} />
        <Route path="note" element={<DictatedNote />} />
        <Route path="log" element={<QuickLog />} />
        <Route path="photo" element={<PhotoCheck />} />
        <Route path="review" element={<AppReview />} />
      </Route>
      {/* Admin routes */}
      <Route path="/admin" element={<AdminShell />}>
        <Route index element={<Navigate to="/admin/intake" replace />} />
        <Route path="intake" element={<IntakeQueue />} />
        <Route path="review" element={<ReviewQueue />} />
        <Route path="sync" element={<SyncStatus />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

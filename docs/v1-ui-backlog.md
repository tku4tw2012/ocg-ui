# V1 UI Backlog — ocg-ui

Practical next-step slices, biased toward the smallest useful deliverable.

---

## Now
*What needs to exist before the UI is usable at all.*

- [ ] App shell: bottom nav (Today / Log / Review) with placeholder screens
- [ ] Today screen: date header, weather summary block (mock data), recent items list (mock data)
- [ ] Quick Log screen: tap-grid of 6–8 common actions, save to local state
- [ ] Dictated Note screen: text area + save button, save to local state
- [ ] Review screen: scrollable list of `TimelineItem` cards from mock data
- [ ] API boundary stub: typed mock functions in `src/api/` for `getToday`, `postItem`, `getItems`
- [ ] PWA manifest: icons, theme color, display mode, start URL
- [ ] Admin shell: `/admin` route with basic nav (Intake / Review / Sync / Settings)

---

## Next
*What makes the core loop actually useful.*

- [ ] Photo Check screen: file/camera input + optional note + save
- [ ] Wire Today and Review to real API (replace mocks with `fetch` calls)
- [ ] Wire Quick Log and Dictated Note saves to real `POST /api/items`
- [ ] Admin — Intake Queue: list view of `IntakeItem[]` with status badges
- [ ] Admin — Sync Status: `SyncStatus` display + manual sync trigger button
- [ ] Offline-first baseline: cache Today data and pending saves with service worker or local storage
- [ ] Plant tag input: free-text autocomplete on log and note capture screens
- [ ] Review filter: filter by type (note / log / photo) and date range

---

## Later
*Enhancements once the core loop is stable.*

- [ ] Admin — Review Queue: approve / edit / discard flagged items
- [ ] Admin — Settings shell: display runtime config values
- [ ] Timeline grouping: group Review items by day with collapsible sections
- [ ] Push notification opt-in (daily capture reminder)
- [ ] Photo viewer: full-screen photo view from Review timeline
- [ ] Plant index: derived list of distinct plant tags with per-plant timeline
- [ ] Export / backup: download entries as JSON or CSV
- [ ] Weather data integration: wire `WeatherSummaryBlock` to a real weather API
- [ ] Dark mode support
- [ ] Accessibility pass: ARIA labels, focus management, reduced motion

---

## Assumptions
- "Local state" in **Now** means in-memory or `localStorage` — no backend required to start.
- PWA manifest is minimal at MVP; full offline support is a **Next** concern.
- Admin UI auth mechanism is not scoped to **Now**; a hard-coded dev bypass is acceptable initially.

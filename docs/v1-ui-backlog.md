# V1 UI Backlog — ocg-ui

Practical next-step slices, biased toward the smallest useful deliverable.

---

## Done (merged to main — PR #1)
*All core app + admin shells and MVP capture flows are live.*

- [x] App shell: bottom 5-tab nav (Today / Note / Log / Photo / Review) with `max-w-lg` mobile layout
- [x] Today screen: date header, recent `GardenEvent` list, `WatchItem` watch list
- [x] Dictated Note screen: text area + save; wired to `POST /api/v1/captures` (capture_type: dictated_note)
- [x] Quick Log screen: 6-action tap-grid; wired to `POST /api/v1/captures` (capture_type: quick_log)
- [x] Photo Check screen: file/camera input + optional caption; mock-only (no backend upload yet)
- [x] Review screen: `ReviewCandidate[]` list with confidence badges + dismiss
- [x] API boundary: `src/data/api.ts` with mock fallback when env vars are absent
- [x] Mock data: `src/data/mock.ts` — `GardenEvent`, `WatchItem`, `IntakeItem`, `ReviewCandidate`
- [x] PWA manifest: `public/manifest.json` (name, icons, theme color, standalone display)
- [x] Admin shell: top nav with Intake / Review / Sync / Settings tabs, `max-w-4xl` layout
- [x] Admin — Intake Queue: `IntakeItem[]` list with source emoji + status badge
- [x] Admin — Review Queue: `ReviewCandidate[]` with confidence badge + confirm/reject
- [x] Admin — Sync Status: placeholder surface
- [x] Admin — Settings: placeholder surface

## Done (Codespaces + deploy setup)
*Environment is reproducible and deployable from Codespaces.*

- [x] Devcontainer: Node 22, Azure CLI, Functions Core Tools, SWA CLI, editor extensions
- [x] VS Code settings: format-on-save, ESLint auto-fix, workspace TypeScript
- [x] Prettier config + format script
- [x] `.env.example` template for `VITE_API_BASE_URL`, `VITE_OCG_DEVICE_TOKEN`, `VITE_OCG_DEVICE_ID`
- [x] Azure Static Web Apps config: `staticwebapp.config.json` (SPA fallback), `swa-cli.config.json`
- [x] Deploy script: `npm run swa:deploy` builds and deploys from Codespaces
- [x] README updated: Codespaces instructions, env var table, deploy commands, accurate stack versions

---

## Now
*Highest-value improvements to the existing surfaces.*

- [x] Wire Today and Review reads to real API when env vars are present (falls back to mock)
- [ ] Photo upload: define backend contract and implement `submitPhoto` real path
- [x] Offline-first baseline: queue pending captures in `localStorage` when offline; flush on reconnect
- [ ] Admin Sync Status: implement real `GET /api/v1/admin/sync/status` display
- [x] Error handling: show user-facing error state when a capture POST fails (queued offline feedback)

---

## Next
*Enhancements once the core loop is stable.*

- [ ] Plant tag autocomplete: free-text input with suggestions from past events on Log and Note screens
- [ ] Review filter on `/review`: filter `ReviewCandidate` by confidence or status
- [ ] `GardenEvent` timeline: full scrollable history view (separate from ReviewCandidate queue)
- [ ] Admin — trigger process action: call process endpoint per `IntakeItem`
- [ ] Deep-link routes: `/review/:id`, `/log/:eventId` for item detail views
- [ ] Push notification opt-in (daily capture reminder)

---

## Later
*When the core loop is solid and usage patterns are clear.*

- [ ] Weather data integration: live `WeatherSummaryBlock` on Today
- [ ] Plant index: derived page of distinct plant tags with per-plant event history
- [ ] Export / backup: download entries as JSON or CSV
- [ ] Dark mode support
- [ ] Accessibility pass: ARIA labels, focus management, reduced motion
- [ ] App settings surface: user preferences, notification toggles

---

## Assumptions
- "Mock-only" items in **Now** mean the API function exists but only `console.log`s — no backend call.
- Admin UI auth mechanism is not scoped to **Now**.
- Photo upload `capture_type` will be determined when the backend endpoint is defined.

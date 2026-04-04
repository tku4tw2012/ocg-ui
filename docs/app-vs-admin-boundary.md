# App vs Admin Boundary — ocg-ui

Two distinct UI surfaces live in this repo. They share a component library but have different audiences, densities, and tones.

## App UI

**Audience:** the single garden user (primary persona).  
**Feel:** calm, minimal, garden-companion — like a quiet notebook.  
**Access:** public PWA install; no login wall assumed at MVP.

### App UI surfaces
- Today dashboard
- Dictated note capture
- Quick log (tap-to-record actions)
- Photo check (plant photo entry)
- Review / timeline feed
- Settings (user preferences, offline mode toggle)

### App UI rules
- One or two primary actions per screen.
- No tables, dense grids, or data-heavy layouts.
- Every screen must be usable with one hand on an iPhone.
- Save-first: data is captured before any confirmation screen.

---

## Admin / Operator UI

**Audience:** the operator (likely the same person in a different context — managing the backend pipeline).  
**Feel:** functional and clear; not enterprise-ugly, but intentionally denser than the app.  
**Access:** protected route (basic auth or token-gated at minimum).

### Admin UI surfaces
- Intake queue — raw items waiting for processing
- Review queue — items flagged for manual review
- Sync / status — pipeline health, last-run timestamps
- Settings shell — runtime config, API key placeholders

### Admin UI rules
- Tables and compact lists are acceptable.
- Status badges (ok / warning / error) are fine.
- Reuse app UI components where they fit; do not build a separate design system.
- Avoid aggressive enterprise styling (heavy drop shadows, dark nav bars, red everywhere).

---

## Shared
- Component library (buttons, cards, modals, inputs).
- API boundary layer (`src/api/`).
- Type definitions for data shapes.

## Open questions
- Should admin routes live under `/admin/*` at the same origin, or a separate deployment?
- Is role-based access needed, or is a single operator token sufficient?

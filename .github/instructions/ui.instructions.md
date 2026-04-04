---
applyTo: "src/**/*.{tsx,ts,jsx,js,css,scss}"
---

# UI Instructions — ocg-ui

## Platform target
- iPhone Safari is the primary runtime. Chrome/desktop is secondary.
- Treat `safe-area-inset-*` as mandatory. Use `env(safe-area-inset-bottom)` for bottom nav.
- Assume no mouse; design for thumbs.

## Layout defaults
- Single-column, full-width cards are the default pattern.
- Avoid fixed pixel widths on container elements; use `100%` + `max-width` for optional desktop comfort.
- Vertical rhythm over horizontal complexity.

## Touch & tap
- Minimum tap target: 48 × 48 px (CSS: `min-height: 3rem; min-width: 3rem`).
- Add `padding` generously on interactive elements — do not rely on small icon hit areas.
- Avoid `title` tooltip patterns; use visible labels or accessible descriptions instead.

## Typography
- Prefer system font stack for body text (performance + familiarity).
- Minimum body size: 16 px / 1 rem.
- Line length: keep prose under ~65 ch on wider screens.
- Avoid all-caps labels beyond very short status badges.

## Components
- Prefer card-based groupings: a rounded container, subtle shadow or border, generous padding.
- Limit nesting depth. Flat structures are easier to scan on small screens.
- Destructive actions (delete, clear) must have a confirmation step or be reversible.
- Loading states: prefer skeleton / pulse over spinners when layout is known.

## App UI surface rules
- Feel: calm, green-adjacent, no aggressive color use.
- No more than two primary actions visible at once.
- Reduce visual noise: icons with labels preferred over icons alone.

## Admin UI surface rules
- Denser information is acceptable (tables, compact lists).
- Maintain the same component library — do not introduce a second design language.
- Avoid dark enterprise styles (hard shadows, aggressive borders, red/yellow status everywhere).
- Admin pages are internal-operator surfaces; they can be functional-first without being ugly.

# Design Principles — ocg-ui

Short, actionable principles for OCGarden UI decisions.

---

## 1. Calm over clever
The UI should feel like picking up a quiet notebook, not opening a dashboard.
Avoid animations, transitions, or layout complexity that draws attention to itself.

## 2. Save-first, ask later
Capture happens immediately on tap/submit. Confirmation screens, edit flows, and cleanup
come after — never before — the data is saved.

## 3. One hand, one thumb
Every primary action must be reachable with a right thumb on an iPhone SE.
Bottom-aligned actions, large tap targets, no hidden swipe-only gestures.

## 4. Low friction > complete data
A partial record saved immediately beats a complete form abandoned.
Optional fields stay optional. Required fields are kept to the absolute minimum.

## 5. Not a form, not a task manager
OCGarden is a memory companion, not a CRM or a to-do list.
Avoid form-style layouts, validation banners, and completion-tracking language.

## 6. One user, not a team
No collaboration features, no user management, no role-based UX at the app layer.
Design decisions that assume a team context are out of scope.

## 7. Mobile-first, desktop-acceptable
Every screen is designed for 375 px wide.
Wider layouts are a comfort enhancement, not a primary target.

## 8. Familiar over novel
Prefer platform conventions (iOS card sheets, bottom drawers, system fonts)
over custom interaction patterns that require learning.

## 9. Lightweight components, low dependencies
Add a package only if it solves a meaningful problem with low risk.
Build small components over importing large libraries.

## 10. Admin surfaces are functional, not enterprise
The admin/operator UI can be denser, but it must not feel like SAP.
The same calm, clear aesthetic applies at a higher information density.

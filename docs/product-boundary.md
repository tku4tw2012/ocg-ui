# Product Boundary — ocg-ui

This repo owns the OCGarden UI layer and its boundary contracts.

## This repo owns

| Area                      | Notes                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| App UI surfaces           | All user-facing screens (Today, Log, Review, etc.)                                                                |
| Admin / operator UI       | Intake queue, review queue, sync status, settings shell                                                           |
| Mock data & mock flows    | Frontend-usable mocks that mirror expected API shapes                                                             |
| Design system direction   | Component patterns, typography, spacing, color decisions                                                          |
| API boundary placeholders | Typed stubs and `// TODO: real endpoint` markers in `src/data/api.ts`; mock data in `src/data/mock.ts`            |
| Navigation map & routes   | Route definitions and surface ownership                                                                           |
| PWA manifest & shell      | App shell (`index.html` + React entry), `public/manifest.json`, SVG icons — no service worker in current scaffold |
| Codespaces / devcontainer | `.devcontainer/devcontainer.json` — Node 22, Azure CLI, Azure Functions Core Tools, SWA CLI, editor extensions    |
| Static deploy config      | Azure Static Web Apps config (`staticwebapp.config.json`, `swa-cli.config.json`), deploy via `npm run swa:deploy` |

## This repo does NOT own

| Area                           | Lives elsewhere                             |
| ------------------------------ | ------------------------------------------- |
| Cloud provisioning             | Infrastructure / devops repo or config      |
| Ingestion runtime              | Backend processing service                  |
| Gmail pull implementation      | Backend email-intake service                |
| Canonical data storage         | Backend DB / storage layer                  |
| Authentication provider config | Backend / identity service                  |
| Push notification backend      | Backend notification service                |
| AI / LLM processing            | Backend AI service (OpenClaw or equivalent) |

## Live mode

- The frontend operates in **live mode** when all three env vars are present: `VITE_API_BASE_URL`, `VITE_OCG_DEVICE_ID`, `VITE_OCG_DEVICE_TOKEN`.
- When any are absent, the app falls back to mock/console behavior — this is the intended safe default for local dev.
- Live text-submit (`dictated_note` and `quick_log`) was verified from Codespaces on 2026-04-16 against the deployed Azure intake (`func-ocg2026-intake-04vmt.azurewebsites.net`). All three POSTs returned 201.
- Proof was terminal-equivalent / live-path proof (same endpoint, headers, and payload as the UI), not a literal click-through UI test.
- Photo capture remains **mock-only** — multipart upload contract is not yet defined.

## Offline capture queue

- On network failure in live mode, captures are queued in `localStorage` (`ocg_pending_captures`).
- `flushCaptureQueue()` retries on app init and after each successful save.
- `pendingCaptureCount()` exposes the queue depth for UI indicators (not yet surfaced).

## Auth boundary

- Backend/runtime auth (device tokens, allowed device IDs) is the source of truth.
- The frontend mirrors token and device ID via env vars for dev/private testing only.
- Azure intake auth config is tracked in the function app settings; `iphone-13-mini` and `iphone-15-cn` are the intended allowed device IDs.

## Assumptions

- The backend exposes a REST or REST-like API; the text capture endpoint (`POST /api/v1/captures`) is live and returns `{ id, status: "queued" }` on success.
- This repo deploys as a static site to Azure Static Web Apps (free tier).
- Deploy happens directly from Codespaces via `swa deploy`, not GitHub Actions.
- Public access is blocked by SWA built-in auth (GitHub login required); see `staticwebapp.config.json`.
- Device token and device ID are backend-provided runtime secrets, not Azure-discoverable. When absent, the app runs in mock mode — this is the intended safe fallback.
- This repo will consume but not define canonical data schemas.
- Mock shapes in `docs/mock-data-shapes.md` are UI-contract drafts, not authoritative.

## Follow-ups

- Rotate placeholder device token (`CHANGE_ME_TOKEN_1`) to a real secret before iPhone use.
- Surface `pendingCaptureCount()` in the UI (e.g., badge on nav) so the user knows about queued captures.

## Open questions

- Will the API be versioned from day one?
- Is the admin UI served from the same origin as the app UI, or a separate deployment?
- Should SWA auth be further restricted to a specific GitHub user ID (role invitation) rather than any authenticated GitHub account?

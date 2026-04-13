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

## Assumptions

- The backend exposes a REST or REST-like API; the text capture endpoint (`POST /api/v1/captures`) is live.
- This repo deploys as a static site to Azure Static Web Apps (free tier).
- Deploy happens directly from Codespaces via `swa deploy`, not GitHub Actions.
- Public access is blocked by SWA built-in auth (GitHub login required); see `staticwebapp.config.json`.
- Device token and device ID are backend-provided runtime secrets, not Azure-discoverable. When absent, the app runs in mock mode — this is the intended safe fallback.
- This repo will consume but not define canonical data schemas.
- Mock shapes in `docs/mock-data-shapes.md` are UI-contract drafts, not authoritative.

## Open questions

- Will the API be versioned from day one?
- Is the admin UI served from the same origin as the app UI, or a separate deployment?
- Should SWA auth be further restricted to a specific GitHub user ID (role invitation) rather than any authenticated GitHub account?

# Product Boundary — ocg-ui

This repo owns the OCGarden UI layer and its boundary contracts.

## This repo owns

| Area | Notes |
|---|---|
| App UI surfaces | All user-facing screens (Today, Log, Review, etc.) |
| Admin / operator UI | Intake queue, review queue, sync status, settings shell |
| Mock data & mock flows | Frontend-usable mocks that mirror expected API shapes |
| Design system direction | Component patterns, typography, spacing, color decisions |
| API boundary placeholders | Typed stubs and `// TODO: real endpoint` markers in `src/data/api.ts`; mock data in `src/data/mock.ts` |
| Navigation map & routes | Route definitions and surface ownership |
| PWA manifest & shell | App shell (`index.html` + React entry), `public/manifest.json`, SVG icons — no service worker in current scaffold |

## This repo does NOT own

| Area | Lives elsewhere |
|---|---|
| Cloud provisioning | Infrastructure / devops repo or config |
| Ingestion runtime | Backend processing service |
| Gmail pull implementation | Backend email-intake service |
| Canonical data storage | Backend DB / storage layer |
| Authentication provider config | Backend / identity service |
| Push notification backend | Backend notification service |
| AI / LLM processing | Backend AI service (OpenClaw or equivalent) |

## Assumptions
- The backend exposes a REST or REST-like API; specific contracts are TBD.
- This repo will consume but not define canonical data schemas.
- Mock shapes in `docs/mock-data-shapes.md` are UI-contract drafts, not authoritative.

## Open questions
- Will the API be versioned from day one?
- Is the admin UI served from the same origin as the app UI, or a separate deployment?

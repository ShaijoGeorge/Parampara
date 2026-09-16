---
name: Parampara family tree
overview: "Build Parampara as a premium client-first family-tree web app: IndexedDB on-device storage, a repository interface for later share/sync, Vite+React+TypeScript, 2D interactive templates, full marketing/PWA surface, and a natural git history under Shaijo George."
todos:
  - id: step-1-scaffold
    content: Scaffold Vite React-TS + Tailwind + Router, folder layout, README, git init + initial commit
    status: completed
  - id: step-2-design-system
    content: Design tokens, typography, UI kit, dark/light, /playground
    status: completed
  - id: step-3-marketing
    content: Landing, about, privacy (data stays in browser)
    status: completed
  - id: step-4-dexie
    content: Domain types, Zod, DexieTreeRepository
    status: completed
  - id: step-5-tree-list
    content: "Multiple trees: create, rename, duplicate, delete"
    status: completed
  - id: step-6-member-form
    content: "Member editor: gender, relation, family name, children, place, late"
    status: completed
  - id: step-7-pedigree
    content: React Flow + ELK interactive pedigree
    status: completed
  - id: step-8-templates
    content: River, mandala, compact templates + gallery
    status: completed
  - id: step-9-photos
    content: Photos, late treatment, child slots
    status: completed
  - id: step-10-onboarding
    content: First-run tour and empty states
    status: completed
  - id: step-11-export-print
    content: JSON export/import and print/PDF
    status: completed
  - id: step-12-pwa
    content: vite-plugin-pwa install + offline shell
    status: completed
  - id: step-13-polish
    content: Mobile inspector, a11y, quota, dark mode fixes
    status: completed
  - id: step-14-sync-seam
    content: Repository docs + RemoteAdapter stub
    status: completed
  - id: step-15-deploy
    content: Cloudflare Pages or Vercel config
    status: completed
isProject: false
---

# Parampara — build plan

Greenfield app in [c:\PROJECTS\Parampara](c:\PROJECTS\Parampara). **v1 is local-first** (Dexie/IndexedDB + export). Shareable URLs need a later `RemoteTreeRepository` — not in the first slice.

## Stack

- Vite + React 19 + TypeScript, React Router 7, Tailwind CSS 4, Framer Motion
- `@xyflow/react` + elkjs for 2D trees
- Dexie, Zustand, React Hook Form + Zod
- vite-plugin-pwa, react-to-print, browser-image-compression
- Host: Cloudflare Pages or Vercel (static)

Do **not** use Cache Storage or localStorage as source of truth.

## Storage

All I/O through `TreeRepository`. Dexie stores: `trees`, `people`, `edges`, `photos`, `settings`. Autosave, export/import JSON, backup banner. Future: same interface for a tiny Worker + R2 (not Supabase unless you change that).

## UI

Warm jewel palette (saffron, maroon, teal, cream, gold). Four 2D templates on the same graph: Pedigree, Ancestral river, Mandala, Compact clan.

## Git

`git init` with existing user **Shaijo George** / `shaijokuttikkatt@gmail.com`. Small real-time commits. No backdating, no AI co-author trailers.

## Implementation order (execute Step 1 first after approval)

1. **Repo + shell** — Vite React-TS, Tailwind, Router, folders `src/domain`, `src/storage`, `src/canvas`, `src/ui`, `src/pages`, ESLint, README, first commit `initial commit`
2. Design tokens + UI kit (`/playground`)
3. Landing / about / privacy
4. Domain types + Dexie repository
5. Tree list (create, rename, duplicate, delete)
6. Member form
7. React Flow + ELK pedigree
8. Other templates + gallery
9. Photos, late styling, child slots
10. Onboarding
11. Export/import + print
12. PWA
13. Polish (mobile, a11y, quota)
14. Sync seam (no backend)
15. Deploy config

## Step 1 file layout (this is the first coding slice)

- `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`
- `src/pages/LandingPage.tsx` (minimal placeholder until Step 3)
- Empty dirs: `src/domain`, `src/storage`, `src/canvas`, `src/ui`
- `.gitignore`, `README.md`

Then `git init` and commit as Shaijo George. Do not implement Dexie, templates, or PWA in Step 1.
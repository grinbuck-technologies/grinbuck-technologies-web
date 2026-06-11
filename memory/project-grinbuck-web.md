---
name: project-grinbuck-web
description: Core facts about the Grinbuck Technologies web project — architecture, branch, key decisions
metadata:
  type: project
---

Next.js 16 (see AGENTS.md) landing page on branch `feature/solar-landing`. Uses React 19, GSAP (with SplitText, CustomEase, ScrollTrigger, Draggable), Lenis smooth scroll, Tailwind CSS v4, TypeScript strict mode.

**Architecture:**
- `app/page.tsx` — thin composition: `<Cursor>`, `<IntroGate>`, `<SceneStage>`
- `components/SceneStage.tsx` — fixed snap-scene stage; curtain wipe transitions between HOME / PinBoard pages / ABOUT US
- `components/PinBoard.tsx` — cork board with drag/drop pin cards; paginated via `lib/pinboard.ts`
- `components/ClosingScene.tsx` — "About Us" final scene; uses both Tailwind (responsive) and inline styles (design tokens)
- `components/IntroGate.tsx` — opening gate animation
- `components/Wordmark.tsx` — hero lockup with SplitText entrance
- `lib/gsap.ts` — single GSAP registration point; exports `EASE_ENTER` ("weight") and `EASE_EXIT` ("weightOut") brand easing constants
- `lib/sceneTransition.ts` — curtain wipe animation; exports `DOCK_SCALE`, `DOCK_Y_FRACTION`
- `lib/useSceneNavigation.ts` — wheel/touch/keyboard snap-scene hook
- `lib/pinboard.ts` — slot geometry, shadows (`CARD_SHADOW`, `CARD_SHADOW_HOVER`, `BOARD_SHADOW`), pagination
- `lib/pinboardMotion.ts` — GSAP card placement, drop, snap, pointer binding
- `lib/ventures.ts` — Venture data (name, description, url, status); no icon field
- `lib/constants.ts` — Z-index layers, `REDUCED_MOTION_QUERY`

**Why:** Fully inline-styled (except ClosingScene which uses Tailwind for responsive breakpoints + inline for CSS vars). No SSR except layout.

**June 2026 code audit completed.** Zero ESLint warnings, zero TS errors. Dead files deleted: `OrbitingGears.tsx`, `OrbitingGearsClient.tsx`, `Room.tsx`.

**Known risky items (not touched):**
- `bindCardPointer` in `lib/pinboardMotion.ts` never removes its event listeners — memory leak on card unmount

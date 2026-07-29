# grinbuck-technologies-web

Public-facing landing page for **Grinbuck Technologies Inc.** — a Canadian holding company based in Victoria, BC.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Lenis

---

## Overview

This is not a traditional website. There is no native scroll. The experience is a **custom snap-scroll stage** — a fixed-position container holding a sequence of full-screen scenes, each revealed by a two-panel curtain wipe driven entirely by GSAP. The visitor moves through scenes via scroll, swipe, or keyboard. After the last scene, the curtain returns to the beginning. The loop is infinite.

**Scene sequence:**

```
Intro Gate → Hero → Ventures (paginated) → About Us → [loops back]
```

| Scene | What it is |
|---|---|
| **Intro Gate** | Two dark panels cover the screen. A progress bar fills. "WELCOME TO THE GRINVERSE" in Press Start 2P pixel font. Panels split open. |
| **Hero** | The `grinbuck` wordmark assembles letter by letter with weighted gravity. `grin` in ink. `buck` arrives in olive a half-beat later. "Technologies Inc." fades in last. The mark breathes continuously via a variable font weight yoyo. |
| **Ventures** | A cork bulletin board. Each venture is a physical card, pinned, draggable, unpinnable, and re-pinnable. Paginated at 6 cards per board. |
| **About Us** | A clean institutional document — company overview, operating principles, sector coverage, and contact. Single screen, no scroll. |

---

## The ventures system

> ⚠️ **The ventures currently listed are placeholders.** They demonstrate the system — real venture data, icons, and URLs will be updated as each venture launches.

Adding, removing, or updating a venture is a **single-line change** in one file:

```ts
// lib/ventures.ts — the only file you ever touch for ventures
export const ventures: Venture[] = [
  {
    name: "Grinbuck3D",
    description: "Precision 3D-printed goods at scale.",
    url: "/3d",           // subfolder, subdomain, or external URL — all work
    status: "Live",
  },
  // Add a new object here.
  // A new pinned card appears on the board automatically.
  // If this is the 7th venture, a second paginated board scene is created automatically.
  // No other code changes required.
];
```

The `url` field accepts anything:
- Internal route: `/3d`
- External subdomain: `https://smallbizhub.ca`
- External domain: `https://islandpass.ca`

Clicking a card opens the URL in a new tab.

---

## Pinboard interactions

The ventures board is fully interactive:

| Interaction | Behavior |
|---|---|
| **Hover card** | Card straightens to 0°, shadow deepens |
| **Click card body** | Navigates to venture URL |
| **Click brass pin** | Card unpins and falls to the bottom of the board with a gravity animation |
| **Drag fallen card up** | Release in the upper 80% of the board — card snaps to the nearest available pin slot |
| **Drag pinned card** | Move to any other pin slot — cards swap positions |
| **Scene re-entry** | All cards animate back to their pinned positions when you return to the board |

---

## Project structure

```
grinbuck-technologies-web/
├── app/
│   ├── layout.tsx              # Font loading, metadata, SmoothScroll wrapper
│   ├── page.tsx                # Composition only — IntroGate + SceneStage + Cursor
│   └── globals.css             # Tailwind v4 @theme design tokens, grain overlay
│
├── components/
│   ├── IntroGate.tsx           # Opening gate — progress bar + panel split animation
│   ├── SceneStage.tsx          # Scene orchestrator — derives scenes, owns curtain refs
│   ├── Wordmark.tsx            # grinbuck logotype — SplitText entrance + breathing
│   ├── SmoothScroll.tsx        # Lenis wrapper — synced to GSAP ticker
│   ├── Cursor.tsx              # Custom ink dot cursor — trails, turns olive near links
│   ├── PinBoard.tsx            # Cork board — slot layout, drag system, GSAP resets
│   ├── PinCard.tsx             # Single venture card — hover, drag state, unpin
│   ├── BrassPin.tsx            # SVG brass pin — unique gradient ID per venture
│   ├── PinHole.tsx             # Decorative empty slot indicator
│   └── ClosingScene.tsx        # About Us — static, single-screen, no animation
│
├── lib/
│   ├── ventures.ts             # ← THE ONLY FILE TO EDIT FOR VENTURE CHANGES
│   ├── constants.ts            # Z-indices, media query strings
│   ├── gsap.ts                 # Single GSAP registration point + EASE_ENTER / EASE_EXIT
│   ├── pinboard.ts             # Pin slot geometry, shadows, cork texture, pagination
│   ├── pinboardMotion.ts       # All drag/drop/snap logic — imperative, no React
│   ├── sceneTransition.ts      # Curtain GSAP timeline — close, swap, open
│   └── useSceneNavigation.ts   # Wheel/touch/keyboard → scene index, with cooldown lock
│
└── public/
    ├── fonts/
    │   └── GeneralSans-Variable.woff2   # Self-hosted variable font (weight axis 200–700)
    └── gb.png                           # Transparent grinbuck mark
```

---

## Architecture

### No native scroll

The page body never scrolls. `document.body.overflow` is locked to `hidden` for the entire session. All wheel, touch swipe, and keyboard input is captured by `useSceneNavigation` and translated into scene index changes. Lenis is installed and synced to GSAP's ticker, but immediately paused by `SceneStage` — it's available for future scroll-within-scene features.

### Curtain wipe model

Scene transitions are not CSS transitions or scroll-snapping. Every scene change is a GSAP timeline:

```
panels close (0.5s) → scene swaps instantly underneath → label fades in/out → panels open (0.55s)
```

The scene behind the curtain is already rendered and in its final state before the curtain opens. There is no flash, no layout shift, no in-between state ever visible.

### Auto-paginated scene list

Scenes are computed at runtime from `lib/ventures.ts`:

```
[HOME] + [PINBOARD × ceil(ventures.length / 6)] + [ABOUT]
```

The "About Us" scene is always appended last. Adding a 7th venture automatically creates a second pinboard scene with the label "OUR VENTURES — CONTINUED". No hardcoded scene count anywhere.

### Imperative motion layer

Pinboard drag mechanics live entirely in `lib/pinboardMotion.ts` — outside React. The component passes DOM refs; the motion module attaches raw pointer event listeners and calls GSAP directly. React state is only involved when visible content changes (card rotations). This keeps the RAF loop clean and prevents React re-renders from interfering with animation.

### Single GSAP registration point

`lib/gsap.ts` is the only place GSAP and its plugins are imported and registered. Every other file imports from this module. Plugins are always available when animation code runs — no registration race conditions.

---

## Design system

### Tokens

All tokens are defined in `app/globals.css` under `@theme` and available everywhere as CSS variables:

| Token | Value | Role |
|---|---|---|
| `--color-paper` | `#FAFAF7` | Page background, card backgrounds |
| `--color-ink` | `#0A0A0A` | Body text, cursor dot |
| `--color-olive` | `#6E7A3E` | Brand accent — the only color used for interaction |
| `--color-olive-deep` | `#4F5A2C` | Hover and active states |
| `--color-gate` | `#0E0F0C` | Intro gate and curtain panels |
| `--color-cork` | `#C4A882` | Pinboard background |
| `--color-cork-border` | `#8B6914` | Pinboard frame |
| `--color-pin` | `#B8963E` | Brass pin color |
| `--color-wall` | `#2C2416` | Wall behind the pinboard |

### Easing curves

Two brand curves are defined once and imported as constants — never hardcode the string names:

```ts
import gsap, { EASE_ENTER, EASE_EXIT } from "@/lib/gsap";

// EASE_ENTER — "weight"    → cubic-bezier(0.16, 1, 0.3, 1)  — weighted settle, no bounce
// EASE_EXIT  — "weightOut" → cubic-bezier(0.7, 0, 0.84, 0)  — strong acceleration out
```

### Z-index layers

All z-indices are named constants in `lib/constants.ts`:

| Constant | Value | Layer |
|---|---|---|
| `Z_WORDMARK` | `5` | Persistent wordmark + olive underline |
| `Z_CURTAIN` | `50` | Transition panels |
| `Z_CURTAIN_TEXT` | `51` | Scene label over closed curtain |
| `Z_INTRO_GATE` | `100` | Opening gate |
| `Z_CURSOR` | `99999` | Custom cursor dot |

### Typography

| Role | Family | Source |
|---|---|---|
| Display / wordmark | **General Sans** (variable, wt 200–700) | [Fontshare](https://www.fontshare.com/fonts/general-sans) — self-hosted at `public/fonts/` |
| Labels / mono | **Geist Mono** | `geist` npm package via `next/font` |
| Intro gate only | **Press Start 2P** | `next/font/google` — scoped to `IntroGate`, not loaded globally |

General Sans **must** be the variable `.woff2` file. The wordmark breathing animation depends on the `font-weight` axis spanning 200–700.

---

## Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Production build
pnpm build
```

Requires **Node 20+** and **pnpm**.

---

## Deployment

Deployed to Vercel. No environment variables required — this is a fully static public site with no server-side data fetching.

| Setting | Value |
|---|---|
| Framework | Next.js |
| Root directory | `.` |
| Build command | `pnpm build` |
| Install command | `pnpm install` |
| Output | Auto (Next.js default) |

---

## Code standards

- **Zero ESLint errors, zero TypeScript errors** — verified after every session with `pnpm lint` and `pnpm tsc --noEmit`
- **Constants over magic values** — all colors, durations, z-indices, easing names, and breakpoints are named exports
- **One job per function** — functions over 30 lines are broken into named sub-functions
- **Cleanup on unmount** — every `useGSAP`, every event listener, and every ScrollTrigger is killed on unmount
- **No dead code** — unused files, imports, and variables are removed
- **Inline styles over utility classes** — keeps animation-relevant geometry co-located with animation code; exceptions are noted in `ClosingScene.tsx`

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.9 | App Router framework, `next/font`, `next/image` |
| `react` / `react-dom` | 19.2.4 | UI rendering |
| `gsap` | ^3.15 | All animation — timelines, tweens, SplitText, CustomEase, Draggable |
| `@gsap/react` | ^2.1.2 | `useGSAP` hook — React-aware animation context with auto-cleanup |
| `lenis` | ^1.3.23 | Smooth scroll — synced to GSAP ticker, paused during snap-scroll mode |
| `geist` | ^1.7.2 | Geist Mono variable font |
| `lucide-react` | ^1.17 | Icon library — installed, reserved for venture card icons |
| `three` · `@react-three/fiber` · `@react-three/drei` | — | 3D engine — installed, reserved for future scenes |
| `tailwindcss` | ^4 | Utility CSS — used primarily for the `@theme` token block |

---

*Grinbuck Technologies Inc. · Victoria, BC · [grinbuck.com](https://grinbuck.com)*

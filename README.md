# grinbuck-technologies-web

The public-facing landing page for **Grinbuck Technologies Inc.** — a Canadian holding company based in Victoria, BC.

**Live:** [grinbuck.com](https://grinbuck.com) · **Branch:** `feature/solar-landing` · **Stack:** Next.js 16 · TypeScript · Tailwind v4 · GSAP · Lenis

---

## What this is

A cinematic, scene-based landing page with no traditional scroll. The visitor moves through a sequence of full-screen scenes — each transition driven by a two-panel curtain that closes and opens like a stage. The experience is designed to feel like a premium publication, not a website.

**The scenes, in order:**

| # | Scene | What it shows |
|---|---|---|
| 1 | **Hero** | The `grinbuck` wordmark assembles with weighted gravity. Letters rise from below a mask, `buck` arrives in olive a half-beat after `grin`. |
| 2–N | **Ventures** | A cork pinboard. Each venture is a physical card pinned to the board — draggable, unpinnable, re-pinnable. Paginated at 6 cards per board. |
| N+1 | **About** | A clean institutional document — company overview, approach, contact. |
| → | **Loop** | Scrolling past the last scene returns to the hero via curtain. The experience is a continuous loop. |

---

## Architecture

```
grinbuck-technologies-web/
├── app/
│   ├── layout.tsx          # Font loading (General Sans, Geist Mono, Press Start 2P), global tokens
│   ├── page.tsx            # Composition only — IntroGate + SceneStage
│   └── globals.css         # Tailwind v4 @theme tokens, grain overlay
├── components/
│   ├── IntroGate.tsx       # Two-panel opening gate — "WELCOME TO THE GRINVERSE"
│   ├── SceneStage.tsx      # Scene orchestrator — derives scenes from ventures, owns curtain refs
│   ├── Wordmark.tsx        # Persistent grinbuck mark — gravity settle + idle breathing
│   ├── PinBoard.tsx        # Cork board — card layout, pin slots, drag system, GSAP resets
│   ├── PinCard.tsx         # Single venture card — hover lift, olive wash, unpin interaction
│   ├── PinHole.tsx         # Empty pin slot indicator
│   ├── BrassPin.tsx        # SVG brass pin rendered above each card
│   ├── ClosingScene.tsx    # About/contact — static, no animation, fits one screen
│   ├── Cursor.tsx          # Custom ink dot cursor — trails with mass, turns olive near links
│   └── SmoothScroll.tsx    # Lenis wrapper — synced to GSAP ticker, disabled on reduced motion
├── lib/
│   ├── ventures.ts         # Single source of truth — add a venture here, it appears everywhere
│   ├── constants.ts        # Z-indices, media query strings, semantic values
│   ├── gsap.ts             # GSAP plugin registration + EASE_ENTER / EASE_EXIT exports
│   ├── pinboard.ts         # Pinboard geometry — slot generation, shadow constants, cork texture
│   ├── pinboardMotion.ts   # All pinboard pointer logic — drag, drop, snap, cleanup
│   ├── sceneTransition.ts  # GSAP curtain timeline — close, swap, open
│   └── useSceneNavigation.ts # Wheel/touch/keyboard intent → scene index, with cooldown lock
└── public/
    ├── fonts/
    │   └── GeneralSans-Variable.woff2
    └── gb.png              # Transparent grinbuck mark — used on pinboard and about page
```

---

## The venture system

Adding a new venture is a one-line change in `lib/ventures.ts`:

```ts
export const ventures: Venture[] = [
  {
    name: "Grinbuck3D",
    description: "Precision 3D-printed goods at scale.",
    url: "/3d",
    status: "Live",
  },
  // Add a new object here — a new pinned card appears automatically.
  // The pinboard paginates at 6 per page. A 7th venture creates a second board.
];
```

The `url` field accepts anything — a subfolder (`/3d`), a subdomain (`https://smallbizhub.ca`), or an external domain. Clicking the card navigates there in a new tab.

---

## Motion system

All animation runs through two libraries with a strict division of ownership:

| Library | Owns |
|---|---|
| **GSAP** | Everything — curtain timelines, wordmark settle, pinboard resets, SplitText reveals, the gear loop |
| **Lenis** | Scroll smoothing only — synced to the GSAP ticker via `lenis.on("scroll", ScrollTrigger.update)` |

The two custom easing curves used everywhere:

```ts
// lib/gsap.ts
CustomEase.create("weight",    "0.16, 1, 0.3, 1");   // EASE_ENTER — weighted settle, no bounce
CustomEase.create("weightOut", "0.7, 0, 0.84, 0");   // EASE_EXIT  — strong acceleration out
```

Import them as constants — never hardcode the string names:

```ts
import gsap, { EASE_ENTER, EASE_EXIT } from "@/lib/gsap";
```

---

## Design tokens

All tokens live in `app/globals.css` under `@theme` and are available as CSS variables everywhere:

```css
--color-paper:        #FAFAF7   /* base canvas — warm off-white */
--color-ink:          #0A0A0A   /* primary text */
--color-olive:        #6E7A3E   /* brand accent — the only colour */
--color-olive-deep:   #4F5A2C   /* hover / active states */
--color-gate:         #0E0F0C   /* curtain panels */
--color-cork:         #C4A882   /* pinboard background */
--color-cork-border:  #8B6914   /* pinboard frame */
--color-pin:          #B8963E   /* brass pin colour */
--color-wall:         #2C2416   /* wall behind the pinboard */
```

---

## Fonts

| Role | Family | Source |
|---|---|---|
| Display / wordmark | **General Sans** (variable, wt 200–700) | [Fontshare](https://www.fontshare.com/fonts/general-sans) — self-hosted |
| Mono / labels | **Geist Mono** | `geist` npm package via `next/font` |
| Intro gate | **Press Start 2P** | `next/font/google` — scoped to `IntroGate` only |

General Sans must be the variable `.woff2` — the idle breathing animation on the wordmark depends on the weight axis.

---

## Z-index layers

All z-indices are named constants in `lib/constants.ts`:

```ts
Z_WORDMARK    = 5     // persistent grinbuck mark above scene content
Z_CURTAIN     = 50    // transition panels
Z_CURTAIN_TEXT = 51   // label over closed curtain
Z_INTRO_GATE  = 100   // opening gate, above everything
Z_CURSOR      = 99999 // custom cursor dot
```

---

## Setup

```bash
# Install
pnpm install

# Dev server
pnpm dev

# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Build
pnpm build
```

Requires Node 20+.

---

## Deployment

Deployed to Vercel. Settings:

| Setting | Value |
|---|---|
| Framework | Next.js |
| Root directory | `.` |
| Build command | `pnpm build` |
| Install command | `pnpm install` |

No environment variables required — this is a fully static public site.

---

## Code standards

- **Zero ESLint errors, zero TypeScript errors** — enforced on every commit
- **Constants over magic values** — all hardcoded colors, durations, z-indices, and easing names are named exports
- **One job per function** — functions over 30 lines are broken into named sub-functions
- **Cleanup on unmount** — every `useGSAP`, every event listener, every ScrollTrigger is killed on unmount
- **No dead code** — unused files, imports, and variables are removed

---

*Last updated: June 2026*

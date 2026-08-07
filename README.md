# grinbuck-technologies-web

Public-facing landing page for **Grinbuck Technologies Inc.**, a Canadian holding company based in Victoria, BC.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Lenis

---

## Recent changes (PR #1)

This PR reconciles the `core-implementation` branch with `main`. It contains
the full initial site build (homepage, Grinbuck3D, ClickIT, tabMonk/QP Quintet
venture pages, the green brand system, Resend-backed contact/quote/pilot-kit
forms) plus its actual new addition: founder portrait images on `/about`
(see #3).

Going forward, `core-implementation` is retired. Each change gets its own
issue and its own dedicated branch, per the process in place as of this PR.

---

## Overview

This is a native-scroll site. The page body scrolls normally; there is no scroll-jacking, no full-screen scene stage, and no snap-to-scene navigation. Scroll feel is smoothed by Lenis (`components/SmoothScroll.tsx`, wrapping `ReactLenis`), and each page's client component uses GSAP `ScrollTrigger` to run reveal-on-scroll animations (hero entrance, staggered section reveals) as the visitor scrolls down, not to control scroll itself. Reduced-motion preference (`prefers-reduced-motion`) is respected throughout.

`app/layout.tsx` sets `history.scrollRestoration = "manual"` in a blocking inline script so a page reload always starts at the top, since Lenis otherwise adopts whatever scroll position the browser tries to restore.

### Routes

| Route | Page |
|---|---|
| `/` | Homepage: hero, ventures index, About teaser |
| `/about` | Team roster: founder bios and portraits for Sarshad Abubaker and Kavita Uttam |
| `/contact` | General contact form |
| `/grinbuck3d` | Grinbuck3D venture landing page (3D-print production) |
| `/grinbuck3d/quote` | Grinbuck3D manufacturing enquiry form (prototyping / production runs) |
| `/grinbuck3d/clickit` | ClickIT product marketing page (a sub-brand under Grinbuck3D) |
| `/grinbuck3d/clickit/quote` | ClickIT quote / shop request form (personal, training, or bulk order) |
| `/grinbuck3d/clickit/pilot-kit` | ClickIT pilot-kit quote request form, for institutions |

There is no dedicated `/grinbuck3d/clickit/shop` route. "Shop the clicker" CTAs on the ClickIT page point to `/grinbuck3d/clickit/quote`, and the Grinbuck3D page separately links out to an external Etsy shop.

---

## Ventures and sub-brands

> ⚠️ **tabMonk and QP Quintet are external ventures**, listed on the homepage but hosted on their own domains (`tabmonk.com`, `qpquintet.ca`). Grinbuck3D and ClickIT are the only ventures with pages inside this repo.

Both lists are array-based by design, one file each, so adding or updating an entry is a single change with no other code touched:

```ts
// lib/ventures.ts: top-level ventures shown on the homepage
export const ventures: Venture[] = [
  { name: "Grinbuck3D", url: "/grinbuck3d", status: "Live", ... },
  { name: "tabMonk", url: "https://www.tabmonk.com", status: "Live", ... },
  { name: "QP Quintet", url: "https://qpquintet.ca", status: "In Development", ... },
];
```

```ts
// lib/subBrands.ts: product lines under Grinbuck3D
export const subBrands: SubBrand[] = [
  { name: "ClickIT", url: "/grinbuck3d/clickit", ... },
];
```

`lib/clickitProducts.ts` holds ClickIT's single product ("The Clicker") and its two sound variants (silent, audible), shared by every ClickIT form that asks a buyer to pick one.

---

## Forms and Resend integration

Four forms send transactional email through a single shared helper, `sendInquiryEmail` in `lib/resend.ts`:

| Form | Route | Component |
|---|---|---|
| Contact | `/contact` | `components/forms/ContactForm.tsx` |
| Grinbuck3D quote | `/grinbuck3d/quote` | `components/forms/Grinbuck3dQuoteForm.tsx` |
| ClickIT quote / shop | `/grinbuck3d/clickit/quote` | `components/forms/ClickitQuoteForm.tsx` |
| ClickIT pilot kit | `/grinbuck3d/clickit/pilot-kit` | `components/forms/PilotKitForm.tsx` |

Each form is a Next.js server action in `lib/actions/inquiries.ts` (`submitContactRequest`, `submitGrinbuck3dQuoteRequest`, `submitClickitQuoteRequest`, `submitPilotKitRequest`). All four validate their required fields and a basic email pattern, then call `sendInquiryEmail`, which sends from `Grinbuck Technologies <grinbuck.web@tabmonk.com>` to the address in `CONTACT_EMAIL` (`lib/constants.ts`, currently `admin@grinbuck.com`), with the submitter's own address set as `replyTo` so replies go straight to them. Shared submit/success/error UI state comes from `lib/actions/formState.ts`, and the three dedicated quote/pilot-kit pages share a page shell, `components/forms/FormPageLayout.tsx` (nav, compact hero, form, footer).

Sending requires a `RESEND_API_KEY` environment variable (see `.env.example`) and a Resend-verified sending domain for `grinbuck.web@tabmonk.com`. Without a key configured, the build still succeeds, since the Resend client only throws when a send is actually attempted.

---

## Project structure

```
grinbuck-technologies-web/
├── app/
│   ├── layout.tsx                          # Font loading, metadata, SmoothScroll wrapper, scroll-restoration script
│   ├── page.tsx                            # `/`: renders HomeClient
│   ├── globals.css                         # Tailwind v4 @theme design tokens, grain overlay, hover states
│   ├── about/
│   │   ├── page.tsx                        # `/about`: team roster, portraits
│   │   └── images/                         # Founder portrait JPEGs
│   ├── contact/page.tsx                    # `/contact`
│   └── grinbuck3d/
│       ├── page.tsx                        # `/grinbuck3d`
│       ├── quote/page.tsx                  # `/grinbuck3d/quote`
│       └── clickit/
│           ├── page.tsx                    # `/grinbuck3d/clickit`
│           ├── quote/page.tsx              # `/grinbuck3d/clickit/quote`
│           └── pilot-kit/page.tsx          # `/grinbuck3d/clickit/pilot-kit`
│
├── components/
│   ├── HomeClient.tsx                      # Homepage: hero, ventures index, About teaser, scroll reveals
│   ├── Grinbuck3dClient.tsx                # Grinbuck3D landing page content and reveals
│   ├── ClickitClient.tsx                   # ClickIT landing page content and reveals
│   ├── Nav.tsx                             # Sticky nav, Lenis-driven anchor/route scrolling
│   ├── SmoothScroll.tsx                    # ReactLenis wrapper, synced to GSAP ticker, reduced-motion aware
│   ├── Wordmark.tsx                        # Two-color "grinbuck" wordmark (ink + brand green spans)
│   ├── CtaButton.tsx                       # Shared pill CTA link (internal route or external/mailto)
│   ├── BeatStack.tsx                       # Stacks short prose "beats" instead of one dense paragraph
│   ├── forms/
│   │   ├── FormPageLayout.tsx              # Shared shell for the three dedicated form pages
│   │   ├── fields.tsx                      # Shared input/label/textarea styles and field components
│   │   ├── ContactForm.tsx
│   │   ├── Grinbuck3dQuoteForm.tsx
│   │   ├── ClickitQuoteForm.tsx
│   │   └── PilotKitForm.tsx
│   └── illustrations/
│       ├── Wire.tsx                        # Shared single-stroke <svg> wrapper every icon renders through
│       ├── types.ts                        # Shared IllustrationProps contract and defaults
│       ├── index.ts                        # Barrel export
│       └── *.tsx                           # One file per wire-drawn icon (printer, filament spool, paw print, etc.)
│
├── lib/
│   ├── ventures.ts                         # Homepage venture list, array-based, single file to edit
│   ├── subBrands.ts                        # Grinbuck3D product lines (currently: ClickIT)
│   ├── clickitProducts.ts                  # ClickIT's product and sound variants
│   ├── constants.ts                        # Contact email, nav/scroll/animation timing constants
│   ├── typography.ts                       # Shared eyebrow/label text style
│   ├── gsap.ts                             # Single GSAP registration point: ScrollTrigger, CustomEase, EASE_ENTER
│   ├── resend.ts                           # sendInquiryEmail, shared Resend send call for every form
│   └── actions/
│       ├── inquiries.ts                    # Server actions for all four forms
│       └── formState.ts                    # Shared FormState type and idle state
│
└── public/
    ├── fonts/GeneralSans-Variable.woff2    # Self-hosted variable font (weight axis 200-700)
    ├── gb.png                              # Transparent grinbuck mark
    ├── grinbuck-logo.png
    ├── og-image.png
    ├── tabmonk-wordmark.png / tabmonk-icon.png
    └── qp-canada-expanded.svg
```

---

## Design system

### Brand color

The site has a single accent color, Grinbuck green, defined once in `app/globals.css` and referenced everywhere as `var(--color-brand)`:

| Token | Value | Role |
|---|---|---|
| `--color-brand` | `oklch(0.424 0.112 145.6)` (hex `#4A7C2F`) | The one accent color, shared by every Grinbuck-family property |
| `--color-brand-on-dark` | `oklch(0.72 0.16 145.6)` | Same hue, lightened for text on dark backgrounds (WCAG AA) |
| `--color-brand-tint` | `oklch(0.96 0.02 145.6)` | Light tonal tint for panel/band backgrounds |

`--color-brand` shifts to a richer green under `prefers-color-scheme: dark`. Base page tokens (`--color-paper` `#FAFAF7`, `--color-ink` `#0A0A0A`, `--color-hairline`, `--color-subhead`, `--color-muted`) hold the neutral palette used site-wide, including `/about` and `/contact`. A second, cooler set (`--color-home-paper`, `--color-home-ink`, `--color-home-accent`, `--color-home-hairline`, `--color-home-eyebrow`, `--color-home-neutral-tint`) is scoped to the "Serious Tech. Serious Fun." homepage redesign (`/`, `/grinbuck3d`, `/grinbuck3d/clickit`); `--color-home-accent` is the same brand green, not a second color.

### Typography

| Role | Family | Scope |
|---|---|---|
| Display (default) | **General Sans** (variable, wt 200-700), self-hosted at `public/fonts/` | Site-wide default, including `/about` and `/contact` |
| Body / headings | **Noto Sans** (wt 400/700/800), `next/font/google` | `/`, `/grinbuck3d`, `/grinbuck3d/clickit` only |
| Eyebrows / labels | **Noto Sans Mono** (wt 400/500/700), `next/font/google`, exposed as `var(--font-mono)` | Same three redesign pages |

### Illustrations

`components/illustrations/` holds a set of wire-drawn SVG icons (Bambu Lab printer, filament spool, print nozzle, print bed gantry, finance growth, trade loop, focus tap, paw print), each a single continuous stroke with no fill. Every icon renders through the shared `Wire` wrapper and `IllustrationProps` contract in `types.ts`, so `color` (defaulting to `currentColor`) is the only thing that varies between instances.

### Easing

`lib/gsap.ts` is the single place GSAP and its plugins (`ScrollTrigger`, `CustomEase`) are imported and registered; every other file imports GSAP from this module. One custom eased curve is registered for enter/reveal animations:

```ts
import { gsap, EASE_ENTER } from "@/lib/gsap";

// EASE_ENTER: "weight" → cubic-bezier(0.16, 1, 0.3, 1), weighted settle, no bounce
```

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

Requires **Node 20+** and **pnpm**. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` to send form submissions locally; the app runs and builds without it, but form sends will fail.

---

## Deployment

Deployed to Vercel. `RESEND_API_KEY` must be set in the deployment environment for the contact, quote, and pilot-kit forms to send; the rest of the site has no other server-side data fetching.

| Setting | Value |
|---|---|
| Framework | Next.js |
| Root directory | `.` |
| Build command | `pnpm build` |
| Install command | `pnpm install` |
| Output | Auto (Next.js default) |

---

## Code standards

- **Zero ESLint errors, zero TypeScript errors:** verified with `pnpm lint` and `pnpm tsc --noEmit`
- **Constants over magic values:** colors, durations, z-indices, easing names, and breakpoints are named exports in `lib/constants.ts` and `lib/gsap.ts`
- **One job per function:** functions over 30 lines are broken into named sub-functions
- **Cleanup on unmount:** every `useGSAP`, every event listener, and every ScrollTrigger is killed on unmount
- **No dead code:** unused files, imports, and variables are removed
- **Inline styles over utility classes:** keeps layout and animation-relevant geometry co-located with the component; Tailwind is used mainly for the `@theme` token block and a few responsive overrides in `globals.css`

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.9 | App Router framework, `next/font`, `next/image`, server actions |
| `react` / `react-dom` | 19.2.4 | UI rendering |
| `gsap` | ^3.15 | Scroll-reveal animation: `ScrollTrigger` and `CustomEase`, via `lib/gsap.ts` |
| `@gsap/react` | ^2.1.2 | `useGSAP` hook, React-aware animation context with auto-cleanup |
| `lenis` | ^1.3.23 | Smooth scroll, synced to GSAP's ticker |
| `geist` | ^1.7.2 | Installed; General Sans and Noto Sans are the fonts actually in use (see Typography above) |
| `resend` | ^6.18.0 | Sends the contact, quote, and pilot-kit form emails (`lib/resend.ts`) |
| `tailwindcss` | ^4 | Utility CSS, used primarily for the `@theme` token block |

---

*Grinbuck Technologies Inc. · Victoria, BC · [grinbuck.com](https://grinbuck.com)*

# grinbuck-technologies-web

Public-facing landing page for Grinbuck Technologies Inc., covering the homepage, the Grinbuck3D manufacturing venture, the ClickIT product, and the team's About and Contact pages.

**Company:** Grinbuck Technologies Inc., Victoria, BC  
**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP, Lenis, Resend

---

## Repository Structure

```
grinbuck-technologies-web/
├── app/
│   ├── layout.tsx                          # Font loading, metadata, SmoothScroll wrapper, scroll-restoration script
│   ├── page.tsx                            # `/`
│   ├── globals.css                         # Tailwind v4 @theme design tokens, grain overlay, hover states
│   ├── about/
│   │   ├── page.tsx                        # `/about`
│   │   └── images/                         # Founder portrait JPEGs
│   ├── contact/page.tsx                    # `/contact`
│   └── grinbuck3d/
│       ├── page.tsx                        # `/grinbuck3d`
│       ├── quote/page.tsx                  # `/grinbuck3d/quote`
│       └── clickit/
│           ├── page.tsx                    # `/grinbuck3d/clickit`
│           ├── quote/page.tsx              # `/grinbuck3d/clickit/quote`
│           └── pilot-kit/page.tsx          # `/grinbuck3d/clickit/pilot-kit`
├── components/
│   ├── HomeClient.tsx                      # Homepage: hero, ventures index, About teaser, scroll reveals
│   ├── Grinbuck3dClient.tsx                # Grinbuck3D landing page content and reveals
│   ├── ClickitClient.tsx                   # ClickIT landing page content and reveals
│   ├── Nav.tsx                             # Sticky nav, Lenis-driven anchor/route scrolling
│   ├── SmoothScroll.tsx                    # ReactLenis wrapper, synced to GSAP ticker, reduced-motion aware
│   ├── Wordmark.tsx                        # Two-color "grinbuck" wordmark
│   ├── CtaButton.tsx                       # Shared pill CTA link
│   ├── BeatStack.tsx                       # Stacks short prose "beats" instead of one dense paragraph
│   ├── forms/                              # FormPageLayout, fields, and one component per form
│   └── illustrations/                      # Wire-drawn SVG icon set, one file per icon
├── lib/
│   ├── ventures.ts                         # Homepage venture list
│   ├── subBrands.ts                        # Grinbuck3D product lines
│   ├── clickitProducts.ts                  # ClickIT's product and sound variants
│   ├── constants.ts                        # Contact email, nav/scroll/animation timing constants
│   ├── typography.ts                       # Shared eyebrow/label text style
│   ├── gsap.ts                             # Single GSAP registration point
│   ├── resend.ts                           # sendInquiryEmail, shared Resend send call for every form
│   └── actions/                            # Server actions and shared form state type
└── public/
    ├── fonts/GeneralSans-Variable.woff2    # Self-hosted variable font (weight axis 200-700)
    └── ...                                 # Wordmarks, logos, OG image, venture logos
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Homepage: hero, ventures index, About teaser |
| `/about` | Team roster: founder bios and portraits for Sarshad Abubaker and Kavita Uttam |
| `/contact` | General contact form |
| `/grinbuck3d` | Grinbuck3D venture landing page (3D-print production) |
| `/grinbuck3d/quote` | Grinbuck3D manufacturing enquiry form (prototyping and production runs) |
| `/grinbuck3d/clickit` | ClickIT product marketing page, a sub-brand under Grinbuck3D |
| `/grinbuck3d/clickit/quote` | ClickIT quote and shop request form (personal, training, or bulk order) |
| `/grinbuck3d/clickit/pilot-kit` | ClickIT pilot-kit quote request form, for institutions |

There is no dedicated `/grinbuck3d/clickit/shop` route. "Shop the clicker" CTAs on the ClickIT page point to `/grinbuck3d/clickit/quote`.

---

## Ventures and Sub-brands

`lib/ventures.ts` and `lib/subBrands.ts` are both array-based by design, documented in-file as a permanent architectural requirement: never collapse to a single object, regardless of how many entries exist.

| Venture | Status | Hosted |
|---|---|---|
| Grinbuck3D | Live | This repo, `/grinbuck3d` |
| tabMonk | Live | External, `tabmonk.com` |
| QP Quintet | In development | External, `qpquintet.ca` |

ClickIT is a sub-brand under Grinbuck3D (`lib/subBrands.ts`), the only product line listed there today. `lib/clickitProducts.ts` holds ClickIT's single product, The Clicker, and its two sound variants, silent and audible, shared by every ClickIT form that asks a buyer to pick one.

---

## Forms and Email

Four forms send transactional email through one shared helper, `sendInquiryEmail` in `lib/resend.ts`:

| Form | Route | Component |
|---|---|---|
| Contact | `/contact` | `components/forms/ContactForm.tsx` |
| Grinbuck3D quote | `/grinbuck3d/quote` | `components/forms/Grinbuck3dQuoteForm.tsx` |
| ClickIT quote and shop | `/grinbuck3d/clickit/quote` | `components/forms/ClickitQuoteForm.tsx` |
| ClickIT pilot kit | `/grinbuck3d/clickit/pilot-kit` | `components/forms/PilotKitForm.tsx` |

Each form is a Next.js server action in `lib/actions/inquiries.ts`. All four validate their required fields and a basic email pattern, then call `sendInquiryEmail`, which sends from `Grinbuck Technologies <grinbuck.web@tabmonk.com>` to the address in `CONTACT_EMAIL` (`lib/constants.ts`, currently `admin@grinbuck.com`), with the submitter's own address set as `replyTo`. Shared submit and success or error UI state comes from `lib/actions/formState.ts`; the three dedicated quote and pilot-kit pages share a page shell, `components/forms/FormPageLayout.tsx`.

Sending requires a `RESEND_API_KEY` environment variable (see `.env.example`) and a Resend-verified sending domain for `grinbuck.web@tabmonk.com`. Without a key configured, the build still succeeds, since the Resend client only throws when a send is actually attempted.

---

## Design System

| Token | Value | Role |
|---|---|---|
| `--color-brand` | `oklch(0.424 0.112 145.6)` (hex `#4A7C2F`) | The one accent color, shared by every Grinbuck-family property |
| `--color-brand-on-dark` | `oklch(0.72 0.16 145.6)` | Same hue, lightened for text on dark backgrounds |
| `--color-brand-tint` | `oklch(0.96 0.02 145.6)` | Light tonal tint for panel and band backgrounds |

`--color-brand` shifts to a richer green under `prefers-color-scheme: dark`. Base page tokens (`--color-paper`, `--color-ink`, `--color-hairline`, `--color-subhead`, `--color-muted`) hold the neutral palette used site-wide, including `/about` and `/contact`. A second, cooler set (`--color-home-*`) is scoped to the homepage redesign (`/`, `/grinbuck3d`, `/grinbuck3d/clickit`); `--color-home-accent` is the same brand green, not a second color.

| Role | Family | Scope |
|---|---|---|
| Display (default) | General Sans, variable, self-hosted at `public/fonts/` | Site-wide default, including `/about` and `/contact` |
| Body and headings | Noto Sans, `next/font/google` | `/`, `/grinbuck3d`, `/grinbuck3d/clickit` only |
| Eyebrows and labels | Noto Sans Mono, `next/font/google`, exposed as `var(--font-mono)` | Same three redesign pages |

`components/illustrations/` holds a set of wire-drawn SVG icons, each a single continuous stroke with no fill. Every icon renders through the shared `Wire` wrapper and `IllustrationProps` contract (`types.ts`), so `color`, defaulting to `currentColor`, is the only thing that varies between instances.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Animation | GSAP (`ScrollTrigger`, `CustomEase`), single registration point in `lib/gsap.ts` |
| Smooth scroll | Lenis, synced to GSAP's ticker |
| Email | Resend |
| Hosting | Vercel |
| Package manager | pnpm |

---

## First-time Setup (after cloning)

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment variables
Create `.env.local` in the repo root with:
```bash
RESEND_API_KEY=
```
Required for the contact, quote, and pilot-kit forms to send. The app runs and builds without it, but form sends will fail. See `.env.example`.

### 3. Run the app
```bash
pnpm dev
```
App runs at [http://localhost:3000](http://localhost:3000).

### 4. Checks
```bash
pnpm tsc --noEmit   # typecheck
pnpm lint           # eslint
pnpm build           # production build
```
This repo is standalone, not a pnpm workspace, so there is no `--filter` target to run these against.

---

## Deployment

| Setting | Value |
|---|---|
| Host | Vercel |
| Framework preset | Next.js |
| Root directory | `.` |
| Build command | `pnpm build` |
| Install command | `pnpm install` |
| Required environment variable | `RESEND_API_KEY`, for the contact, quote, and pilot-kit forms |

---

## Key Technical Decisions

- **Native scroll, no scene-snap.** The site was fully redesigned off an earlier scene-snap, curtain-wipe, cork-pinboard concept. The page body scrolls normally; Lenis (`components/SmoothScroll.tsx`) smooths the feel, and GSAP `ScrollTrigger` drives reveal-on-scroll animations only, never scroll itself.
- **One accent color.** `--color-brand` is shared by every Grinbuck-family property (grinbuck.com, Grinbuck3D, ClickIT, tabMonk, QP Quintet). `--color-brand-on-dark` and `--color-brand-tint` are tonal variants of the same hue, not separate colors.
- **Two typography scopes.** General Sans is the site-wide default display font. Noto Sans and Noto Sans Mono are scoped to the three homepage-redesign pages only, `/`, `/grinbuck3d`, and `/grinbuck3d/clickit`.
- **Ventures and sub-brands are array-based.** `lib/ventures.ts` and `lib/subBrands.ts` must never collapse to a single object, regardless of how many entries exist, so adding a venture is a one-line change with no other code touched.
- **All form email goes through one helper.** Every form's server action calls `sendInquiryEmail` (`lib/resend.ts`) rather than calling the Resend SDK directly, so the send call and error handling live in one place.
- **Scroll restoration is set to manual.** `app/layout.tsx` sets `history.scrollRestoration = "manual"` in a blocking inline script so a reload always starts at the top, since Lenis otherwise adopts whatever scroll position the browser tries to restore before it mounts.
- **No dedicated shop route.** "Shop" CTAs on the ClickIT page route to `/grinbuck3d/clickit/quote`. There is no separate `/grinbuck3d/clickit/shop` page.
- **Illustrations share one wrapper.** Every icon in `components/illustrations/` renders through the shared `Wire` `<svg>` wrapper and the `IllustrationProps` contract, so instances differ only by `color`.
- **Inline styles over utility classes.** Layout and animation-relevant geometry stay co-located with the component that owns them. Tailwind is used mainly for the `@theme` token block in `app/globals.css` and a few responsive overrides.

---

## Branch and PR Rules

- `main` is protected. No direct pushes.
- Each issue gets its own branch off current `main`, named `IssueN_description` (for example, `Issue3_add_founder_images`).
- Merge to `main` via PR only.
- The long-lived `core-implementation` branch is retired and deleted. Do not branch from it or reference it going forward.

---

## Notes

- `.env.example` documents the required `RESEND_API_KEY`. The app builds without it, but form sends will fail.
- `package.json` has no dedicated `typecheck` script; `pnpm tsc --noEmit` is the direct equivalent.
- This repo has no `pnpm-workspace.yaml` and is not part of a monorepo. `grinbuck-platform` (a separate repo) is the actual pnpm workspace containing the `tabmonk` app.

---

*Last updated: August 11, 2026. Founder portraits added to /about, and this README rewritten from scratch to match the grinbuck-platform documentation pattern.*

"use client";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, EASE_ENTER } from "@/lib/gsap";
import {
  REDUCED_MOTION_QUERY,
  CONTACT_EMAIL,
  NAV_SCROLL_OFFSET,
  SECTION_MAX_WIDTH,
  SECTION_PADDING_X,
  ANIM_DURATION_ENTER,
  ANIM_DURATION_REVEAL,
  ANIM_STAGGER,
  ANIM_DELAY_ENTER,
  ANIM_Y_HERO,
  ANIM_Y_REVEAL,
} from "@/lib/constants";
import { clicker } from "@/lib/clickitProducts";
import { EYEBROW_STYLE } from "@/lib/typography";
import { Nav } from "@/components/Nav";
import { BeatStack } from "@/components/BeatStack";
import { CtaButton } from "@/components/CtaButton";
import { FocusTap, PawPrint } from "@/components/illustrations";

const HOME_HREF = "/";

// Denser vertical rhythm than the rest of the site. An editorial feature,
// not a landing page with one statement per screen.
const SECTION_PAD_Y = "clamp(2rem, 4vh, 3rem)";

// Focus first: the bigger, more universal audience and the more
// defensible institutional pitch. Training is real and stays on the page,
// but as a use case mentioned within the flow, not a mirrored second act.
const HERO_THESIS =
  "A click is one of the most versatile behavioural tools ever made. Most people reach for ClickIT to focus. Some use it to train a dog. Same clicker, built properly.";

const PRODUCT_FACTS = [
  "ABS plastic",
  "3D-printed and assembled in Victoria, BC",
  "Pocket-sized",
  "Silent or audible",
  "No batteries, no screen, nothing to charge",
];

const VARIANT_BEATS = [
  "ClickIT ships in two variants: silent and audible. Same clicker, same build, different sound.",
  "Silent tends to suit focus and quiet spaces. Audible tends to suit training. Neither is locked to one use case: pick whichever fits how you'll use it.",
];

type AudienceGroup = { label: string; audience: string[] };

const AUDIENCE_GROUPS: AudienceGroup[] = [
  {
    label: "Institutions and classrooms",
    audience: [
      "Schools",
      "Daycares & kindergartens",
      "Pediatric dental offices",
      "Children's hospitals",
      "OT clinics",
      "Offices",
    ],
  },
  {
    label: "Training and behavior work",
    audience: [
      "Dog trainers & owners",
      "Obedience clubs",
      "Shelters",
      "Stables",
      "Veterinary practices",
      "Coaches & instructors",
    ],
  },
];

// Each inner array is one "beat group": a handful of short (1-2 sentence)
// paragraphs stacked with space between them, rather than one dense block.
const FOCUS_BEAT_GROUPS: string[][] = [
  [
    "ADHD is now the most commonly diagnosed long-term condition among children and youth in Canada.",
    "Prevalence rose from 6.7% in 2019 to 8.4% in 2023. Autism rose from 2.0% to 3.0% over the same period.",
    "One in four Canadian children and youth, more than 1.6 million kids, now has at least one diagnosed long-term condition (Public Health Agency of Canada, Canadian Health Survey on Children and Youth, 2023).",
  ],
  [
    "Fidget spinners answered that need badly enough to get banned.",
    "At the peak of the craze, about a third of the top 200 US schools banned fidgets outright.",
    "The research backs the bans, at least for spinners. Studies found they increased distracted behaviour in kids with ADHD and dragged down third-graders' math scores.",
    "One university lecture study found spinners cut retention substantially for the student using one, and measurably for students sitting nearby.",
  ],
  [
    "The problem is that spinners are visual. They demand hand-eye coordination.",
    "That pulls the user's eyes, and their neighbours' eyes, off whatever they're supposed to be doing.",
    "Occupational therapists have always recommended the opposite: something tactile, worked by feel, that never asks to be looked at.",
  ],
  [
    "The other complaint is volume.",
    "Ask teachers and they're close to unanimous. The fidgets that survive in a classroom are the quiet ones.",
    "A clicking pen is the textbook example of what not to do.",
  ],
];

const FOCUS_SOLUTION =
  "ClickIT's clicker is built to the constraint teachers actually name: feedback you can feel without looking, that the room never hears.";

const FOCUS_HONESTY_LEAD =
  "Most fidget brands would rather you didn't look too closely at the research. ClickIT is built assuming you will.";

const FOCUS_HONESTY_BEATS = [
  "The evidence that fidget tools improve attention or grades is weak.",
  "A controlled classroom study of a leading tactile fidget, the Fidget Cube, found no improvement in on-task behaviour or math productivity. Its authors suggested schools consider phasing fidgets out entirely (Croley, Drevon & Decker, 2022).",
  "The honest summary across reviews: fidgeting doesn't reliably improve attention.",
  "At best, for some people in some contexts, it may displace more disruptive habits and support self-regulation (Edutopia, 2024).",
];

const FOCUS_POSITIONING_BEATS = [
  "ClickIT doesn't claim to improve focus, attention, grades, or ADHD symptoms. That's not a hedge, it's the point. This isn't a treatment.",
  "It's a self-regulation tool engineered to be the least disruptive option in the room.",
  "Teachers already settled this. Fidgets are fine when they're tools, not toys, which means quiet, tactile, and put away when they stop helping.",
];

const PILOT_HEADING = "Bringing ClickIT to your space?";
const PILOT_COPY =
  "Schools, daycares, kindergartens, pediatric dental offices, and children's hospitals are already putting ClickIT to work. If yours could use the same, tell us your unit count and we'll follow up with a custom quote.";

const TRAINING_INTRO =
  "People also use ClickIT for dog training and marker-based training more broadly. It's a genuine second use case, not a separate product.";

const TRAINING_MECHANISM_BEATS = [
  "A clicker is an event marker. The sound is short and identical every time, and unlike a spoken word, it lands at the exact instant a behaviour happens.",
  'Paired consistently with a reward, that sound becomes a conditioned reinforcer. The animal learns the click itself means "that, right there, was correct."',
];

type TimelineEntry = { step: string; year?: string; text: string };

// The signature moment for this page: a real, checkable sequence, told
// typographically rather than with illustration. Lives inside the training
// passage, since it's the lineage of marker training specifically.
const TIMELINE: TimelineEntry[] = [
  {
    step: "01",
    year: "1951",
    text: 'B.F. Skinner introduces the clicker as a conditioned reinforcer, in "How to Teach Animals" (Scientific American).',
  },
  { step: "02", text: "Marian and Keller Breland commercialize clicker training." },
  {
    step: "03",
    text: "Refined on dolphins in marine mammal parks through the 1950s and 60s.",
  },
  {
    step: "04",
    text: "Karen Pryor popularizes clicker training beyond the marine mammal world.",
  },
  { step: "05", text: "TAGteach adapts the same marker principle for people." },
  { step: "06", text: "Today: ClickIT builds the mechanism into one pocket tool." },
];

// Combines the original breadth and TAGteach content into fewer, denser
// beats (a shorter passage, per the unified-narrative restructure) without
// dropping a single animal, field, or claim from either.
const TRAINING_BEATS = [
  "The breadth is what makes this interesting. Dogs and horses, obviously, but also zoos and aquariums, where accredited facilities use marker training so animals take part voluntarily in their own veterinary care: elephants presenting a foot for a pedicure, voluntary blood draws, tortoises and storks stepping onto a scale, macaws, primates, reptiles. Laboratory animal welfare programs use it too, and so do shelter and rescue rehabilitation programs.",
  "The human branch is called TAGteach, Teaching with Acoustical Guidance. It's the same marker principle applied to people, and it shows up in elite gymnastics and dance, professional golf instruction, yoga, orthopedic surgical technique, emergency nursing, physical therapy and gait retraining, speech therapy, special education and mainstream classrooms, and workplace safety training. A click can mark a body position a learner can't see themselves, toes pointed, back straight, at the exact moment it's correct, which spoken feedback always arrives too late for.",
];

const TRAINING_HONESTY_BEATS = [
  'The training literature is mixed on whether a clicker actually outperforms other consistent markers, a verbal "yes," a whistle. We\'re not claiming it does.',
  "What's true and well documented is the consistency and the timing precision. This is the tool the field standardized on.",
];

type Source = { label: string; url: string };

const SOURCES: Source[] = [
  {
    label: "Public Health Agency of Canada: chronic conditions in childhood, prevalence",
    url: "https://health-infobase.canada.ca/chronic-conditions/childhood/prevalence.html",
  },
  {
    label: 'Scientific American: "Fidget Toys Aren\'t Just Hype" (2017)',
    url: "https://www.scientificamerican.com/article/fidget-toys-arent-just-hype/",
  },
  {
    label: 'Edutopia: "Do Fidgets Help Students Focus?" (2024)',
    url: "https://www.edutopia.org/article/do-fidgets-help-students-focus/",
  },
  {
    label:
      "Croley, Drevon & Decker: Fidget Cube classroom study, Behavior Analysis in Practice (2022)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9388206/",
  },
  {
    label:
      "Fidget devices and disruptive behaviour in students with autism, Contemporary School Psychology (2025)",
    url: "https://link.springer.com/article/10.1007/s40688-025-00551-w",
  },
];

// This page's default eyebrow color (muted gray) — spread EYEBROW_STYLE
// first, then this, to get the shared base with a page-specific default.
const eyebrowStyle: React.CSSProperties = {
  ...EYEBROW_STYLE,
  color: "var(--color-subhead)",
};

const beatStyle: React.CSSProperties = {
  fontFamily: "var(--font-noto-sans)",
  fontWeight: 400,
  fontSize: "0.9375rem",
  lineHeight: 1.55,
  color: "var(--color-ink)",
  margin: 0,
};

/**
 * Client-rendered content for the ClickIT product page: one continuous
 * narrative led by focus and self-regulation (full research grounding, its
 * own honesty box, unchanged from the prior build), with dog training and
 * marker-based training folded in as a real but secondary use case rather
 * than a mirrored second section, plus a real sources list and GSAP
 * scroll-reveal animations. Rendered by the thin server component at
 * `app/grinbuck3d/clickit/page.tsx`.
 */
export function ClickitClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

      gsap.fromTo(
        ".js-hero",
        { opacity: 0, y: ANIM_Y_HERO },
        {
          opacity: 1,
          y: 0,
          duration: ANIM_DURATION_ENTER,
          ease: EASE_ENTER,
          stagger: ANIM_STAGGER,
          delay: ANIM_DELAY_ENTER,
        }
      );

      gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: ANIM_Y_REVEAL },
          {
            opacity: 1,
            y: 0,
            duration: ANIM_DURATION_REVEAL,
            ease: EASE_ENTER,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      return () => ScrollTrigger.getAll().forEach((st) => st.kill());
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <Nav
        homeHref={HOME_HREF}
        links={[
          { label: "Grinbuck3D", href: "/grinbuck3d" },
          { label: "Home", href: HOME_HREF },
        ]}
      />

      <main>
        {/* ── S1: Hero ── */}
        <section
          id="hero"
          style={{
            padding: `clamp(2.5rem, 6vh, 4rem) ${SECTION_PADDING_X} ${SECTION_PAD_Y}`,
            background: "var(--color-paper)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div
              className="js-hero"
              style={{ ...eyebrowStyle, marginBottom: "1rem" }}
            >
              A Grinbuck3D product line
            </div>
            {/* The wordmark IS the hero headline here — dominant on first
                paint, before any reveal animation settles, so it wins
                against the thesis line beneath it. */}
            <h1
              className="js-hero"
              style={{
                display: "block",
                fontFamily: "var(--font-noto-sans)",
                fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                margin: "0 0 0.875rem",
              }}
            >
              <span style={{ color: "var(--color-ink)" }}>Click</span>
              <span style={{ color: "var(--color-brand)" }}>IT</span>
            </h1>
            <p
              className="js-hero"
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
                color: "var(--color-ink)",
                maxWidth: "700px",
                margin: "0 0 1rem",
              }}
            >
              The click, engineered properly.
            </p>
            <p
              className="js-hero"
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 400,
                fontSize: "1.0625rem",
                lineHeight: 1.55,
                color: "var(--color-subhead)",
                maxWidth: "600px",
                margin: "0 0 1.75rem",
              }}
            >
              {HERO_THESIS}
            </p>
            <CtaButton href="/grinbuck3d/clickit/quote">
              Shop the clicker &rarr;
            </CtaButton>
          </div>
        </section>

        {/* ── S2: The one product ── */}
        <section
          style={{
            background: "var(--color-paper)",
            padding: `0 ${SECTION_PADDING_X} ${SECTION_PAD_Y}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="js-reveal"
            style={{
              maxWidth: SECTION_MAX_WIDTH,
              width: "100%",
              borderTop: "1px solid var(--color-hairline)",
              borderBottom: "1px solid var(--color-hairline)",
              padding: "1.5rem 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                  margin: 0,
                }}
              >
                {clicker.name}.
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem 1.5rem",
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  color: "var(--color-subhead)",
                }}
              >
                {PRODUCT_FACTS.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
            </div>
            <div style={{ maxWidth: "680px" }}>
              <BeatStack beats={VARIANT_BEATS} paragraphStyle={beatStyle} />
            </div>
          </div>
        </section>

        {/* ── S3: Focus & self-regulation — the lead narrative ── */}
        <section
          id="focus"
          style={{
            background: "var(--color-paper)",
            padding: `0 ${SECTION_PADDING_X} ${SECTION_PAD_Y}`,
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div style={{ ...eyebrowStyle, marginBottom: "0.5rem" }}>
              Focus &amp; Regulation
            </div>
            <div
              className="js-reveal"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                marginBottom: "1.5rem",
              }}
            >
              <FocusTap width={36} height={36} color="var(--color-brand)" strokeWidth={4} />
              <h2
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "var(--color-ink)",
                  margin: 0,
                }}
              >
                For focus.
              </h2>
            </div>

            <div
              className="js-reveal two-col-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem 3rem",
                marginBottom: "1.5rem",
              }}
            >
              {FOCUS_BEAT_GROUPS.map((beats, i) => (
                <BeatStack key={i} beats={beats} paragraphStyle={beatStyle} />
              ))}
            </div>

            <p
              className="js-reveal"
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 700,
                fontSize: "1.0625rem",
                lineHeight: 1.5,
                color: "var(--color-ink)",
                borderLeft: "3px solid var(--color-brand)",
                paddingLeft: "1.25rem",
                margin: "0 0 1.5rem",
              }}
            >
              {FOCUS_SOLUTION}
            </p>

            {/* Honesty box, deliberately set apart from the marketing copy
                above, not buried in a footnote. */}
            <div
              className="js-reveal"
              style={{
                background: "var(--color-brand-tint)",
                borderRadius: "16px",
                padding: "clamp(1.5rem, 4vw, 2rem)",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  lineHeight: 1.45,
                  color: "var(--color-ink)",
                  margin: "0 0 1rem",
                }}
              >
                {FOCUS_HONESTY_LEAD}
              </p>
              <div
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--color-brand)",
                  marginBottom: "0.75rem",
                }}
              >
                What the research actually shows
              </div>
              <div style={{ marginBottom: "0.75rem" }}>
                <BeatStack beats={FOCUS_HONESTY_BEATS} paragraphStyle={beatStyle} />
              </div>
              <BeatStack
                beats={FOCUS_POSITIONING_BEATS}
                paragraphStyle={{ ...beatStyle, fontWeight: 700 }}
              />
            </div>

            {/* Pilot-kit CTA, the classroom/institutional path. */}
            <div
              id="pilot"
              className="js-reveal"
              style={{
                background: "var(--color-ink)",
                borderRadius: "16px",
                padding: "clamp(1.5rem, 4vw, 2rem)",
                scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <div style={{ maxWidth: "460px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    letterSpacing: "-0.01em",
                    color: "white",
                    margin: "0 0 0.5rem",
                  }}
                >
                  {PILOT_HEADING}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "0.9375rem",
                    lineHeight: 1.55,
                    color: "#c9c6bd",
                    margin: 0,
                  }}
                >
                  {PILOT_COPY}
                </p>
              </div>
              <CtaButton href="/grinbuck3d/clickit/pilot-kit">
                Request a pilot kit &rarr;
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── S4: Training, folded in as a secondary use case within the
            same flow — smaller heading level, no numbered eyebrow, no
            matching honesty-box or CTA-card weight, so it reads as "also
            true" rather than a mirrored second act. ── */}
        <section
          id="training"
          style={{
            background: "var(--color-paper)",
            padding: `0 ${SECTION_PADDING_X} ${SECTION_PAD_Y}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div
              className="js-reveal"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "0.75rem",
              }}
            >
              <PawPrint width={24} height={24} color="var(--color-brand)" strokeWidth={4} />
              <h3
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                  margin: 0,
                }}
              >
                It also works for training.
              </h3>
            </div>
            <p
              className="js-reveal"
              style={{ ...beatStyle, marginBottom: "1.25rem", maxWidth: "60ch" }}
            >
              {TRAINING_INTRO}
            </p>

            <div className="js-reveal" style={{ marginBottom: "1.25rem" }}>
              <BeatStack beats={TRAINING_MECHANISM_BEATS} paragraphStyle={beatStyle} />
            </div>

            {/* Signature moment: a real, checkable lineage, told
                typographically. Stays on the page, just inside the
                training passage rather than under its own section. */}
            <div
              className="js-reveal"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.25rem",
                borderTop: "1px solid var(--color-hairline)",
                borderBottom: "1px solid var(--color-hairline)",
                padding: "1.25rem 0",
                marginBottom: "1.25rem",
              }}
            >
              {TIMELINE.map((entry) => (
                <div key={entry.step} style={{ flex: "1 1 150px", minWidth: "150px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      color: "var(--color-brand)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {entry.step}
                    {entry.year ? ` / ${entry.year}` : ""}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      color: "var(--color-ink)",
                      margin: 0,
                    }}
                  >
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="js-reveal" style={{ marginBottom: "1.25rem" }}>
              <BeatStack beats={TRAINING_BEATS} paragraphStyle={beatStyle} />
            </div>

            {/* Honesty aside, lighter than the focus section's box on
                purpose, same content though: still substantive, still
                sourced, not a mirrored equal-weight disclaimer. */}
            <div
              className="js-reveal"
              style={{
                borderLeft: "3px solid var(--color-hairline)",
                paddingLeft: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              <BeatStack beats={TRAINING_HONESTY_BEATS} paragraphStyle={beatStyle} />
            </div>

            {/* Lightweight inline CTA, not a full-width card matching the
                pilot box's visual weight. */}
            <div
              className="js-reveal"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <p style={{ ...beatStyle, fontWeight: 700 }}>
                Training your dog? The same clicker works.
              </p>
              <CtaButton href="/grinbuck3d/clickit/quote" size="sm" variant="ink">
                Shop it &rarr;
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── S5: Who it's for — two labeled lists, stacked, not a
            side-by-side comparison grid. ── */}
        <section
          style={{
            background: "var(--color-paper)",
            padding: `0 ${SECTION_PADDING_X} ${SECTION_PAD_Y}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <h2
              className="js-reveal"
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 800,
                fontSize: "1.375rem",
                letterSpacing: "-0.01em",
                color: "var(--color-ink)",
                margin: "0 0 1.25rem",
              }}
            >
              Who it&apos;s for.
            </h2>
            <div
              className="js-reveal"
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {AUDIENCE_GROUPS.map((group) => (
                <div key={group.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--color-ink)",
                      margin: "0 0 0.625rem",
                    }}
                  >
                    {group.label}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem 1.5rem",
                    }}
                  >
                    {group.audience.map((who) => (
                      <li
                        key={who}
                        style={{
                          fontFamily: "var(--font-noto-sans)",
                          fontWeight: 400,
                          fontSize: "0.9375rem",
                          color: "var(--color-subhead)",
                        }}
                      >
                        {who}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S6: Closing CTA — shop is primary (this is a clicker-selling
            page), the pilot-kit path is a clearly-labeled secondary option
            for institutions, not an equal-weight mirrored second button. ── */}
        <section
          style={{
            background: "var(--color-paper)",
            padding: `0 ${SECTION_PADDING_X} ${SECTION_PAD_Y}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="js-reveal"
            style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}
          >
            <Link
              className="btn-cta"
              href="/grinbuck3d/clickit/quote"
              style={{
                display: "block",
                background: "var(--color-brand)",
                color: "var(--color-paper)",
                borderRadius: "16px",
                padding: "clamp(1.5rem, 4vw, 2rem)",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  marginBottom: "0.375rem",
                }}
              >
                Shop the clicker &rarr;
              </div>
              <div
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                }}
              >
                For personal use, training, or a bulk order.
              </div>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 400,
                fontSize: "0.9375rem",
                color: "var(--color-subhead)",
                margin: 0,
              }}
            >
              Ordering for a school, clinic, or institution?{" "}
              <Link href="/grinbuck3d/clickit/pilot-kit" className="home-accent-link">
                Request a pilot kit &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* ── S7: Sources ── */}
        <section
          style={{
            background: "var(--color-paper)",
            padding: `0 ${SECTION_PADDING_X} ${SECTION_PAD_Y}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="js-reveal"
            style={{
              maxWidth: SECTION_MAX_WIDTH,
              width: "100%",
              borderTop: "1px solid var(--color-hairline)",
              paddingTop: "1.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                letterSpacing: "-0.01em",
                color: "var(--color-ink)",
                margin: "0 0 1rem",
              }}
            >
              Sources &amp; further reading.
            </h2>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
              }}
            >
              {SOURCES.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-accent-link"
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      color: "var(--color-subhead)",
                    }}
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--color-hairline)",
          padding: "2rem clamp(1.5rem, 4vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--color-paper)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.8125rem",
            color: "var(--color-ink)",
            opacity: 0.65,
          }}
        >
          © {new Date().getFullYear()} Grinbuck Technologies Inc.
        </span>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="footer-link"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.8125rem",
            color: "var(--color-ink)",
            textDecoration: "none",
            opacity: 0.65,
          }}
        >
          {CONTACT_EMAIL}
        </a>
      </footer>
    </div>
  );
}

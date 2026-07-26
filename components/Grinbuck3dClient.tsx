"use client";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, EASE_ENTER } from "@/lib/gsap";
import {
  REDUCED_MOTION_QUERY,
  CONTACT_EMAIL,
  SECTION_MAX_WIDTH,
  SECTION_PADDING_X,
  ANIM_DURATION_ENTER,
  ANIM_DURATION_REVEAL,
  ANIM_STAGGER,
  ANIM_DELAY_ENTER,
  ANIM_Y_HERO,
  ANIM_Y_REVEAL,
} from "@/lib/constants";
import { ventures } from "@/lib/ventures";
import { subBrands } from "@/lib/subBrands";
import { EYEBROW_STYLE } from "@/lib/typography";
import { Nav } from "@/components/Nav";
import { CtaButton } from "@/components/CtaButton";
import { PrintBedGantry, FilamentSpool, PrintNozzle } from "@/components/illustrations";

const grinbuck3d = ventures.find((v) => v.name === "Grinbuck3D")!;

const HOME_HREF = "/";

type Capability = { name: string; description: string };

// Capability language, not numbers that go stale or invite scrutiny.
const CAPABILITIES: Capability[] = [
  {
    name: "Production floor",
    description: "A real manufacturing floor, not a hobby setup.",
  },
  {
    name: "In-house, start to finish",
    description: "Design, printing, and assembly happen under one roof.",
  },
  {
    name: "Prototype to production",
    description: "Same process for one part or a full run.",
  },
  {
    name: "Victoria, BC",
    description: "Built and shipped from Vancouver Island.",
  },
];

const CAPABILITIES_HEADING = "What we do.";
const CAPABILITIES_COPY =
  "Every part starts as a design file and ends as a finished piece. We take it from prototype through production run, designed and assembled in-house.";

const MAKE_HEADING = "What we make.";
const MAKE_COPY =
  "Alongside client and commercial work, Grinbuck3D designs and produces its own product lines in-house.";

const COMMERCIAL_HEADING = "Prototyping or a production run?";
const COMMERCIAL_COPY =
  "If you have a part to prototype or a batch to produce, tell us what you need. We'll quote it.";

const ETSY_SHOP_URL = "https://www.etsy.com/ca/shop/GrinbuckTech";

/**
 * Client-rendered content for the Grinbuck3D venture page: a dark
 * manufacturing hero, a capabilities section describing real production
 * capability without hardcoded figures, a "what we make" section driven by
 * `lib/subBrands` (ClickIT is one featured line among others, not the
 * page's whole identity), and a commercial/B2B enquiry CTA. Rendered by the
 * thin server component at `app/grinbuck3d/page.tsx`.
 */
export function Grinbuck3dClient() {
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
          { label: "ClickIT", href: "/grinbuck3d/clickit" },
          { label: "Home", href: HOME_HREF },
        ]}
      />

      <main>
        {/* ── S1: Hero — manufacturing and production, no ClickIT mention.
            Deliberately a different illustration than the homepage card's
            printer (BambuLabP1SPrinter is a fixed requirement there, not
            here): the print bed and gantry, so clicking through reveals
            something new rather than repeating the same picture. ── */}
        <section
          style={{
            background: "var(--color-paper)",
            padding: `clamp(5rem, 12vh, 10rem) ${SECTION_PADDING_X}`,
          }}
        >
          <div
            className="two-col-grid"
            style={{
              maxWidth: SECTION_MAX_WIDTH,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                className="js-hero"
                style={{ ...EYEBROW_STYLE, color: "var(--color-subhead)", marginBottom: "18px" }}
              >
                Manufacturing
              </div>
              {/* Dominant on first paint, before any reveal animation
                  settles: significantly larger and tighter-tracked than a
                  section heading, so the brand name is unmistakably the
                  loudest thing on the screen. */}
              <h1
                className="js-hero"
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontSize: "clamp(3.25rem, 9vw, 6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "var(--color-ink)",
                  margin: "0 0 20px",
                  overflowWrap: "break-word",
                }}
              >
                Grinbuck3D
              </h1>
              <p
                className="js-hero"
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 400,
                  fontSize: "1.0625rem",
                  color: "var(--color-subhead)",
                  maxWidth: "440px",
                  lineHeight: 1.55,
                }}
              >
                {grinbuck3d.description}
              </p>
            </div>
            <div>
              <PrintBedGantry
                className="js-hero"
                width="100%"
                height="auto"
                color="var(--color-ink)"
                strokeWidth={2.5}
              />
              {/* A light, secondary aside next to the illustration, not a
                  commercial CTA, so it's a plain link rather than CtaButton. */}
              <a
                href={ETSY_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="js-hero home-accent-link"
                style={{
                  display: "block",
                  marginTop: "0.75rem",
                  textAlign: "right",
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "var(--color-subhead)",
                  textDecoration: "none",
                }}
              >
                See what we&apos;ve printed &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* S2: Capabilities. Capability language, not hardcoded numbers
            that go stale or invite scrutiny. */}
        <section
          style={{
            background: "var(--color-paper)",
            padding: `clamp(3rem, 6vh, 4.5rem) ${SECTION_PADDING_X}`,
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
                gap: "1.25rem",
                marginBottom: "2.5rem",
              }}
            >
              <FilamentSpool
                width={48}
                height={48}
                color="var(--color-brand)"
                strokeWidth={3}
              />
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--color-ink)",
                    margin: "0 0 0.5rem",
                  }}
                >
                  {CAPABILITIES_HEADING}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "1.0625rem",
                    lineHeight: 1.55,
                    color: "var(--color-subhead)",
                    margin: 0,
                    maxWidth: "560px",
                  }}
                >
                  {CAPABILITIES_COPY}
                </p>
              </div>
            </div>

            <div
              className="js-reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.name}
                  style={{ borderTop: "2px solid var(--color-brand)", paddingTop: "1rem" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 800,
                      fontSize: "1.0625rem",
                      letterSpacing: "-0.01em",
                      color: "var(--color-ink)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {cap.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      color: "var(--color-subhead)",
                    }}
                  >
                    {cap.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S3: What we make — sub-brands, ClickIT is one line among
            others (structurally, not just in copy) ── */}
        <section
          style={{
            background: "var(--color-paper)",
            padding: `clamp(3rem, 6vh, 4.5rem) ${SECTION_PADDING_X}`,
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
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              <PrintNozzle
                width={44}
                height={44}
                color="var(--color-brand)"
                strokeWidth={3}
              />
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    margin: "0 0 0.5rem",
                  }}
                >
                  {MAKE_HEADING}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "1.0625rem",
                    lineHeight: 1.55,
                    color: "var(--color-subhead)",
                    margin: 0,
                    maxWidth: "560px",
                  }}
                >
                  {MAKE_COPY}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {subBrands.map((brand) => (
                <Link
                  key={brand.name}
                  href={brand.url}
                  className="js-reveal home-accent-link"
                  style={{
                    display: "block",
                    background: "var(--color-brand-tint)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    textDecoration: "none",
                    color: "var(--color-ink)",
                  }}
                >
                  <div
                    style={{ ...EYEBROW_STYLE, color: "var(--color-brand)", marginBottom: "0.75rem" }}
                  >
                    Featured product line
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 800,
                      fontSize: "1.625rem",
                      letterSpacing: "-0.01em",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 400,
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: "var(--color-subhead)",
                      margin: "0 0 1rem",
                    }}
                  >
                    {brand.description}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-noto-sans)",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    Explore {brand.name} &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── S4: Commercial / B2B ── */}
        <section
          style={{
            background: "var(--color-brand-tint)",
            padding: `clamp(3rem, 6vh, 4.5rem) ${SECTION_PADDING_X}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="js-reveal two-col-grid"
            style={{
              maxWidth: SECTION_MAX_WIDTH,
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  margin: "0 0 0.5rem",
                }}
              >
                {COMMERCIAL_HEADING}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.55,
                  color: "var(--color-subhead)",
                  margin: 0,
                  maxWidth: "520px",
                }}
              >
                {COMMERCIAL_COPY}
              </p>
            </div>
            <CtaButton href="/grinbuck3d/quote">Get a quote &rarr;</CtaButton>
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

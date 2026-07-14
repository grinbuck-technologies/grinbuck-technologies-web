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
import { products } from "@/lib/clickitProducts";
import { Nav } from "@/components/Nav";

const HOME_HREF = "/";

const HERO_SUBHEAD =
  "ClickIT makes tactile tools for focus, built to work by touch instead of sight. Kids, students, and adults use them to stay calm and focused, anywhere they need to.";

const EVIDENCE_HEADING = "Why tactile works.";
const EVIDENCE_SUBHEAD = "Most fidget tools miss what the research actually supports.";

const EVIDENCE_POINTS = [
  "ADHD and autism diagnoses keep climbing, in classrooms and well beyond them. Focus and self-regulation are mainstream needs now, not a niche accommodation.",
  "The tools that actually help work quietly, below conscious attention. Visual fidgets like spinners do the opposite, and that's exactly why so many schools have already banned them.",
  "ClickIT was built for the category that works, not the category that got banned. That distinction is the whole point, whether that's a classroom, an office, or anywhere focus is hard to hold onto.",
];

const PRODUCTS_HEADING = "Our products.";
const PRODUCTS_SUBHEAD =
  "Two tools, one purpose: quiet, tactile focus wherever you need it.";

const PILOT_HEADING = "Bringing ClickIT to your space?";
const PILOT_COPY =
  "Schools, daycares, kindergartens, pediatric dental offices, and children's hospitals are already putting ClickIT to work. If yours could use the same, we'll send a free pilot kit: 10 units, six weeks, no obligation.";

/**
 * Client-rendered content for the ClickIT venture page: hero, "Why tactile
 * works" evidence section, product grid (sourced from `lib/clickitProducts`),
 * and pilot-program CTA, plus GSAP scroll-reveal animations. Rendered by the
 * thin server component at `app/clickit/page.tsx`.
 */
export function ClickitClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

      // Hero: animate in on mount (above fold)
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

      // Below-fold: ScrollTrigger reveals
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
      <Nav homeHref={HOME_HREF} links={[{ label: "Home", href: HOME_HREF }]} />

      <main>
        {/* ── Hero ── */}
        <section
          id="hero"
          style={{
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(5rem, 12vh, 10rem) clamp(1.5rem, 4vw, 4rem)",
            background: "var(--color-paper)",
          }}
        >
          {/* Required brand link: "Click" (ink) / "IT" (brand green), mirroring
              the nav's "grin"/"buck" lockup. */}
          <span
            className="js-hero"
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "1.75rem",
            }}
          >
            <span style={{ color: "var(--color-ink)" }}>Click</span>
            <span style={{ color: "var(--color-brand)" }}>IT</span>
          </span>
          <h1
            className="js-hero"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--color-ink)",
              maxWidth: "880px",
              margin: "0 0 1.5rem",
            }}
          >
            Built to help you focus,<br />wherever you need it.
          </h1>
          <p
            className="js-hero"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "var(--color-subhead)",
              maxWidth: "540px",
              margin: 0,
            }}
          >
            {HERO_SUBHEAD}
          </p>
        </section>

        {/* ── Evidence ── */}
        <section
          id="evidence"
          style={{
            background: "var(--color-paper)",
            padding: `clamp(3rem, 6vh, 4.5rem) ${SECTION_PADDING_X} clamp(5rem, 10vh, 8rem)`,
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
              <h2
                className="js-reveal"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--color-ink)",
                  margin: "0 0 0.75rem",
                }}
              >
                {EVIDENCE_HEADING}
              </h2>
              <p
                className="js-reveal"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "var(--color-subhead)",
                  margin: 0,
                }}
              >
                {EVIDENCE_SUBHEAD}
              </p>
            </div>

            {/* Evidence sits in a tinted panel embedded in the page — the
                pilot section below reuses this same treatment, so the two
                inset panels read as one consistent pattern, not one-offs. */}
            <div
              className="js-reveal"
              style={{
                background: "var(--color-clickit-tint)",
                borderRadius: "24px",
                padding: "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "3rem clamp(2rem, 4vw, 4rem)",
                  justifyContent: "center",
                }}
              >
                {EVIDENCE_POINTS.map((point, i) => (
                  <div key={point}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "var(--color-clickit-accent)",
                        marginBottom: "1rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.0625rem",
                        fontWeight: 400,
                        lineHeight: 1.65,
                        color: "var(--color-ink)",
                        margin: 0,
                      }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        {/* The only place products appear — both shown with equal weight,
            no product singled out as "hero". */}
        <section
          id="catalog"
          style={{
            background: "var(--color-paper)",
            padding: `clamp(3rem, 6vh, 4.5rem) ${SECTION_PADDING_X} clamp(5rem, 10vh, 8rem)`,
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
              <h2
                className="js-reveal"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--color-ink)",
                  margin: "0 0 0.75rem",
                }}
              >
                {PRODUCTS_HEADING}
              </h2>
              <p
                className="js-reveal"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "var(--color-subhead)",
                  margin: 0,
                }}
              >
                {PRODUCTS_SUBHEAD}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem clamp(2rem, 4vw, 4rem)",
                justifyContent: "center",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.name}
                  className="js-reveal"
                  style={{
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "16px",
                    padding: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "var(--color-ink)",
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: "var(--color-subhead)",
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <Link
                className="btn-cta"
                href="/clickit/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  background: "var(--color-clickit-accent)",
                  color: "var(--color-paper)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  borderRadius: "6px",
                }}
              >
                Visit our shop →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Pilot program CTA ── */}
        {/* Same tinted-panel treatment as evidence, not a separate color
            band — one consistent accent pattern across the page. */}
        <section
          id="pilot"
          style={{
            background: "var(--color-paper)",
            padding: `clamp(3rem, 6vh, 4.5rem) ${SECTION_PADDING_X} clamp(5rem, 10vh, 8rem)`,
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div
              className="js-reveal"
              style={{
                background: "var(--color-clickit-tint)",
                borderRadius: "24px",
                padding: "clamp(2.5rem, 6vw, 4rem)",
                textAlign: "center",
              }}
            >
              <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--color-ink)",
                    margin: "0 0 1.25rem",
                  }}
                >
                  {PILOT_HEADING}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "var(--color-subhead)",
                    margin: "0 0 2rem",
                  }}
                >
                  {PILOT_COPY}
                </p>
                <a
                  className="btn-cta"
                  href="/clickit#pilot"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 2rem",
                    background: "var(--color-clickit-accent)",
                    color: "var(--color-paper)",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    textDecoration: "none",
                    borderRadius: "6px",
                  }}
                >
                  Request a pilot kit →
                </a>
              </div>
            </div>
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

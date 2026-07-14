"use client";
import { useRef } from "react";
import Image from "next/image";
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
import { ventures, type Venture } from "@/lib/ventures";
import { Nav } from "@/components/Nav";

// Internal routes that actually resolve to a page. A venture's URL that
// starts with "/" but isn't listed here would 404, so its CTA is suppressed.
const LIVE_INTERNAL_ROUTES = new Set<string>(["/", "/clickit"]);

function ventureCtaKind(venture: Venture): "external" | "internal" | "none" {
  if (!venture.url.startsWith("/")) return "external";
  return LIVE_INTERNAL_ROUTES.has(venture.url) ? "internal" : "none";
}

// Header zone all cards share, so logo chips and text headings start/end
// at the same y regardless of which a given venture has.
const VENTURE_HEADER_HEIGHT = "80px";

// Render size for each logo, derived from its actual file's aspect ratio —
// not copy-pasted from another venture's dimensions.
const LOGO_DIMENSIONS: Record<string, { width: number; height: number; hasOwnBackground: boolean }> = {
  // tabmonk-wordmark.png: flat wordmark, transparent background, ~4:1 source ratio.
  "/tabmonk-wordmark.png": { width: 200, height: 50, hasOwnBackground: false },
  // qp-canada-expanded.svg: viewBox 0 0 520 130 (exactly 4:1), no <rect> background — transparent.
  "/qp-canada-expanded.svg": { width: 200, height: 50, hasOwnBackground: false },
};

const HERO_SUBHEAD =
  "We build and operate companies across manufacturing, software, and commerce — each run independently, for the long term.";

const ABOUT_TEXT =
  "Grinbuck Technologies is a Victoria, BC-based holding company. We acquire, build, and operate independent businesses for the long term — giving each the resources of a larger organization and the autonomy to run on its own terms.";

/**
 * Client-rendered content for the Grinbuck homepage: hero, Ventures
 * (portfolio grid sourced from `lib/ventures`), and About sections, plus
 * GSAP scroll-reveal animations. Rendered by the thin server component at
 * `app/page.tsx`.
 */
export function HomeClient() {
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
      <Nav />

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
          <span
            className="js-hero"
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-brand)",
              marginBottom: "1.5rem",
            }}
          >
            Grinbuck Technologies Inc.
          </span>
          <h1
            className="js-hero"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "var(--color-ink)",
              maxWidth: "820px",
              margin: "0 0 1.5rem",
            }}
          >
            Independent businesses.<br />
            One operating philosophy.
          </h1>
          <p
            className="js-hero"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "var(--color-subhead)",
              maxWidth: "500px",
              margin: 0,
            }}
          >
            {HERO_SUBHEAD}
          </p>
        </section>

        {/* ── Ventures ── */}
        <section
          id="ventures"
          style={{
            background: "var(--color-ink)",
            padding: `clamp(3rem, 6vh, 4.5rem) ${SECTION_PADDING_X} clamp(5rem, 10vh, 8rem)`,
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: SECTION_MAX_WIDTH, width: "100%" }}>
            <div style={{ marginBottom: "4.5rem", textAlign: "center" }}>
              <h2
                className="js-reveal"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--color-paper)",
                  margin: "0 0 0.75rem",
                }}
              >
                Portfolio
              </h2>
              <p
                className="js-reveal"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "var(--color-muted)",
                  margin: 0,
                }}
              >
                Independent businesses we build and operate.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "3.5rem clamp(2rem, 4vw, 4rem)",
                justifyContent: "center",
              }}
            >
              {ventures.map((venture, i) => {
                const cta = ventureCtaKind(venture);
                const isTrailingOdd =
                  ventures.length % 2 === 1 && i === ventures.length - 1;
                const logoDims = venture.logo
                  ? LOGO_DIMENSIONS[venture.logo]
                  : undefined;
                return (
                  <div
                    key={venture.name}
                    className="venture-card js-reveal"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      ...(isTrailingOdd
                        ? {
                            gridColumn: "1 / -1",
                            justifySelf: "center",
                            maxWidth: "480px",
                            width: "100%",
                          }
                        : {}),
                    }}
                  >
                    {/* Header zone: fixed height so every card's name/logo
                        starts and ends at the same y regardless of content. */}
                    <div
                      style={{
                        minHeight: VENTURE_HEADER_HEIGHT,
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {venture.logo && logoDims ? (
                        logoDims.hasOwnBackground ? (
                          <Image
                            src={venture.logo}
                            alt={venture.name}
                            width={logoDims.width}
                            height={logoDims.height}
                            quality={90}
                            style={{ display: "block" }}
                          />
                        ) : (
                          <div
                            style={{
                              display: "inline-block",
                              background: "var(--color-paper)",
                              borderRadius: "12px",
                              padding: "0.75rem 1.25rem",
                            }}
                          >
                            <Image
                              src={venture.logo}
                              alt={venture.name}
                              width={logoDims.width}
                              height={logoDims.height}
                              quality={90}
                              style={{ display: "block" }}
                            />
                          </div>
                        )
                      ) : (
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            color: "var(--color-paper)",
                            margin: 0,
                          }}
                        >
                          {venture.name}
                        </h3>
                      )}
                    </div>

                    {/* Description zone: clamped to 3 lines so length differences
                        don't push the footer to different heights. */}
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.0625rem",
                        fontWeight: 400,
                        lineHeight: 1.65,
                        color: "var(--color-muted)",
                        maxWidth: "480px",
                        margin: "0 0 1.25rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {venture.description}
                    </p>

                    {/* Footer zone: pinned to the bottom of the card so status
                        + CTA align across cards sharing a grid row. */}
                    <div style={{ marginTop: "auto" }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-display)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color:
                            venture.status === "Live"
                              ? "var(--color-brand-on-dark)"
                              : "var(--color-muted)",
                          marginBottom: cta === "none" ? 0 : "1.5rem",
                        }}
                      >
                        {venture.status}
                      </span>

                      {cta === "external" && (
                        <a
                          className="btn-cta"
                          href={venture.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 1.75rem",
                            background: "var(--color-brand)",
                            color: "var(--color-paper)",
                            fontFamily: "var(--font-display)",
                            fontSize: "0.9375rem",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            textDecoration: "none",
                            borderRadius: "6px",
                          }}
                        >
                          Visit {venture.name} →
                        </a>
                      )}

                      {cta === "internal" && (
                        <Link
                          className="btn-cta"
                          href={venture.url}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 1.75rem",
                            background: "var(--color-brand)",
                            color: "var(--color-paper)",
                            fontFamily: "var(--font-display)",
                            fontSize: "0.9375rem",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            textDecoration: "none",
                            borderRadius: "6px",
                          }}
                        >
                          Visit {venture.name} →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          style={{
            padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 4rem)",
            background: "var(--color-paper)",
            textAlign: "center",
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
          }}
        >
          <div
            aria-hidden="true"
            className="js-reveal"
            style={{
              width: "40px",
              height: "2px",
              background: "var(--color-brand)",
              margin: "0 auto 2.5rem",
            }}
          />
          <p
            className="js-reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "var(--color-ink)",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            {ABOUT_TEXT}
          </p>
          <Link
            href="/about"
            className="footer-link js-reveal"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              fontFamily: "var(--font-display)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "var(--color-brand)",
              textDecoration: "none",
            }}
          >
            More about us →
          </Link>
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

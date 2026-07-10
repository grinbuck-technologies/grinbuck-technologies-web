"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger, EASE_ENTER } from "@/lib/gsap";
import {
  REDUCED_MOTION_QUERY,
  CONTACT_EMAIL,
  NAV_SCROLL_OFFSET,
  ANIM_DURATION_ENTER,
  ANIM_DURATION_REVEAL,
  ANIM_STAGGER,
  ANIM_DELAY_ENTER,
  ANIM_Y_HERO,
  ANIM_Y_REVEAL,
} from "@/lib/constants";
import { featuredVenture } from "@/lib/ventures";
import Nav from "@/components/Nav";

const HERO_SUBHEAD =
  "We build and operate companies across manufacturing, software, and commerce — each run independently, for the long term.";

const ABOUT_TEXT =
  "Grinbuck Technologies is a Victoria, BC-based holding company. We acquire, build, and operate independent businesses for the long term — giving each the resources of a larger organization and the autonomy to run on its own terms.";

export default function HomeClient() {
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

        {/* ── Featured venture ── */}
        <section
          id="ventures"
          style={{
            background: "var(--color-ink)",
            padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 4rem)",
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
          }}
        >
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <span
              className="js-reveal"
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-brand-on-dark)",
                marginBottom: "2rem",
              }}
            >
              Portfolio
            </span>
            <h2
              className="js-reveal"
              style={{
                display: "inline-block",
                background: "var(--color-paper)",
                borderRadius: "12px",
                padding: "0.75rem 1.25rem",
                margin: "0 0 1.25rem",
              }}
            >
              <Image
                src="/tabmonk-wordmark.png"
                alt={featuredVenture.name}
                width={200}
                height={50}
                quality={90}
                style={{ display: "block" }}
              />
            </h2>
            <p
              className="js-reveal"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.0625rem",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "var(--color-muted)",
                maxWidth: "480px",
                margin: "0 0 2.5rem",
              }}
            >
              {featuredVenture.description}
            </p>
            <a
              className="js-reveal btn-cta"
              href={featuredVenture.url}
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
              Visit tabMonk →
            </a>
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

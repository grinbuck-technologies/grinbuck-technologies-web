"use client";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, EASE_ENTER } from "@/lib/gsap";
import {
  REDUCED_MOTION_QUERY,
  CONTACT_EMAIL,
  SITE_LEGAL_NAME,
  NAV_SCROLL_OFFSET,
  SCROLL_DURATION,
  SECTION_MAX_WIDTH,
  ANIM_DURATION_ENTER,
  ANIM_DURATION_REVEAL,
  ANIM_STAGGER,
  ANIM_DELAY_ENTER,
  ANIM_Y_HERO,
  ANIM_Y_REVEAL,
} from "@/lib/constants";
import { ventures } from "@/lib/ventures";
import { EYEBROW_STYLE } from "@/lib/typography";
import { Nav } from "@/components/Nav";
import { BeatStack } from "@/components/BeatStack";
import { BambuLabP1SPrinter, FinanceGrowth, TradeLoop } from "@/components/illustrations";

const grinbuck3d = ventures.find((v) => v.name === "Grinbuck3D")!;
const tabmonk = ventures.find((v) => v.name === "tabMonk")!;
const qpQuintet = ventures.find((v) => v.name === "QP Quintet")!;

const HOME_SECTION_PADDING_X = "5vw";

const HERO_SUBHEAD =
  "Grinbuck Technologies builds hardware, software, and the trade routes between them, out of Victoria, BC.";

const ABOUT_HEADING = "Independent ventures. One way of building.";

const ABOUT_TEXT_LINES = [
  "Grinbuck Technologies is based in Victoria, BC. We build hardware, software, and the trade routes between them.",
  "Each venture runs on its own, with its own product, team, and customers. What ties them together is how we build it: fast, direct, and without excuses.",
];

/**
 * Client-rendered content for the Grinbuck homepage: hero, three bespoke
 * venture bands (Grinbuck3D, tabMonk, QP Quintet), and an About teaser, plus
 * GSAP scroll-reveal animations. Rendered by the thin server component at
 * `app/page.tsx`.
 */
export function HomeClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

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

  const scrollToVentures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    lenis?.scrollTo("#ventures", {
      duration: SCROLL_DURATION,
      offset: -NAV_SCROLL_OFFSET,
    });
  };

  return (
    <div
      ref={pageRef}
      style={{ background: "var(--color-home-paper)", overflowX: "hidden" }}
    >
      <Nav />

      <main>
        {/* ── Hero ── */}
        <section
          id="hero"
          style={{
            padding: `8vh ${HOME_SECTION_PADDING_X} 12vh`,
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            className="js-hero"
            style={{
              ...EYEBROW_STYLE,
              color: "var(--color-home-eyebrow)",
              marginBottom: "28px",
            }}
          >
            {SITE_LEGAL_NAME} &nbsp;&middot;&nbsp; Victoria, BC
          </div>
          <h1
            className="js-hero"
            style={{
              fontFamily: "var(--font-noto-sans)",
              fontSize: "clamp(3rem, 9vw, 8rem)",
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--color-home-ink)",
              margin: 0,
            }}
          >
            Serious Tech.
            <br />
            <span style={{ color: "var(--color-home-accent)" }}>
              Serious Fun.
            </span>
          </h1>
          <p
            className="js-hero"
            style={{
              fontFamily: "var(--font-noto-sans)",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#3a3833",
              maxWidth: "620px",
              margin: "40px 0 0",
            }}
          >
            {HERO_SUBHEAD}
          </p>
          <div className="js-hero" style={{ marginTop: "48px" }}>
            <a
              href="#ventures"
              onClick={scrollToVentures}
              className="home-hero-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--color-home-ink)",
                color: "white",
                padding: "16px 28px",
                borderRadius: "100px",
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              See the ventures &rarr;
            </a>
          </div>
        </section>

        {/* ── Ventures ── */}
        <section id="ventures" style={{ scrollMarginTop: `${NAV_SCROLL_OFFSET}px` }}>
          <div
            className="js-reveal"
            style={{
              padding: `0 ${HOME_SECTION_PADDING_X}`,
              maxWidth: "1400px",
              margin: "0 auto 40px",
            }}
          >
            <div
              style={{
                ...EYEBROW_STYLE,
                color: "var(--color-home-eyebrow)",
                borderTop: "1px solid var(--color-home-hairline)",
                paddingTop: "24px",
              }}
            >
              Three Ventures. One Bet on Building.
            </div>
          </div>

          {/* Venture 1: Grinbuck3D — manufacturing */}
          <Link
            href={grinbuck3d.url}
            className="js-reveal home-band-manufacturing"
            style={{
              display: "block",
              background: "var(--color-home-ink)",
              color: "white",
              padding: `8vh ${HOME_SECTION_PADDING_X}`,
              marginBottom: "2px",
            }}
          >
            <div
              className="two-col-grid"
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "60px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    ...EYEBROW_STYLE,
                    color: "#8a8880",
                    marginBottom: "16px",
                  }}
                >
                  01 / Manufacturing
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    margin: "0 0 20px",
                  }}
                >
                  {grinbuck3d.name}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "17px",
                    color: "#c9c6bd",
                    maxWidth: "440px",
                    lineHeight: 1.55,
                    margin: "0 0 10px",
                  }}
                >
                  {grinbuck3d.description}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#8a8880",
                    margin: 0,
                  }}
                >
                  A real production floor. In-house printing and assembly, built in Victoria, BC.
                </p>
              </div>
              <BambuLabP1SPrinter
                width="100%"
                height="auto"
                color="#F6F7F7"
                strokeWidth={2.5}
              />
            </div>
            <div
              style={{
                maxWidth: "1400px",
                margin: "32px auto 0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 700,
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Visit {grinbuck3d.name} &rarr;
              </span>
            </div>
          </Link>

          {/* Venture 2: tabMonk — finance */}
          <a
            href={tabmonk.url}
            target="_blank"
            rel="noopener noreferrer"
            className="js-reveal home-band-tabmonk"
            style={{
              display: "block",
              background: "var(--color-brand-tint)",
              padding: `8vh ${HOME_SECTION_PADDING_X}`,
              marginBottom: "2px",
            }}
          >
            <div
              className="two-col-grid"
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    ...EYEBROW_STYLE,
                    color: "#6f7568",
                    marginBottom: "16px",
                  }}
                >
                  02 / Fintech
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    margin: "0 0 20px",
                    color: "var(--color-home-ink)",
                  }}
                >
                  {tabmonk.name}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "17px",
                    color: "#4a4d47",
                    maxWidth: "440px",
                    lineHeight: 1.55,
                    margin: "0 0 20px",
                  }}
                >
                  {tabmonk.description}
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "var(--color-home-ink)",
                  }}
                >
                  Visit {tabmonk.name} &rarr;
                </div>
              </div>
              <FinanceGrowth
                width="100%"
                height="auto"
                color="var(--color-home-ink)"
                strokeWidth={2.5}
              />
            </div>
          </a>

          {/* Venture 3: QP Quintet — trade, two-way */}
          <a
            href={qpQuintet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="js-reveal home-band-qp"
            style={{
              display: "block",
              background: "var(--color-home-neutral-tint)",
              padding: `8vh ${HOME_SECTION_PADDING_X}`,
              marginBottom: "2px",
            }}
          >
            <div
              className="two-col-grid"
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "60px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    ...EYEBROW_STYLE,
                    color: "#8a7a5c",
                    marginBottom: "16px",
                  }}
                >
                  03 / International Trade
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    margin: "0 0 20px",
                    color: "var(--color-home-ink)",
                  }}
                >
                  {qpQuintet.name}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "17px",
                    color: "#5a5142",
                    maxWidth: "440px",
                    lineHeight: 1.55,
                    margin: "0 0 20px",
                  }}
                >
                  {qpQuintet.description}
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "var(--color-home-ink)",
                  }}
                >
                  Visit {qpQuintet.name} &rarr;
                </div>
              </div>
              <TradeLoop
                width="100%"
                height="auto"
                color="#8a7a5c"
                strokeWidth={2.5}
              />
            </div>
          </a>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          style={{
            padding: "12vh 5vw",
            maxWidth: "1400px",
            margin: "0 auto",
            scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
          }}
        >
          <div
            className="js-reveal two-col-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "60px",
            }}
          >
            <div
              style={{
                ...EYEBROW_STYLE,
                color: "var(--color-home-eyebrow)",
              }}
            >
              About Grinbuck
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-noto-sans)",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--color-home-ink)",
                  margin: "0 0 24px",
                }}
              >
                {ABOUT_HEADING}
              </h3>
              <div style={{ marginBottom: "1.75rem" }}>
                <BeatStack
                  beats={ABOUT_TEXT_LINES}
                  gap="14px"
                  paragraphStyle={{
                    fontFamily: "var(--font-noto-sans)",
                    fontWeight: 400,
                    fontSize: "18px",
                    color: "#4a4740",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                />
              </div>
              <Link
                href="/about"
                className="home-accent-link"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-noto-sans)",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "var(--color-home-ink)",
                  textDecoration: "none",
                }}
              >
                More about us &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        id="contact"
        style={{
          borderTop: "1px solid var(--color-home-hairline)",
          padding: `6vh ${HOME_SECTION_PADDING_X} 5vh`,
          scrollMarginTop: `${NAV_SCROLL_OFFSET}px`,
        }}
      >
        <div
          style={{
            maxWidth: SECTION_MAX_WIDTH,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--color-home-ink)",
                marginBottom: "8px",
              }}
            >
              GRINBUCK
            </div>
            <div
              style={{
                fontFamily: "var(--font-noto-sans)",
                fontWeight: 400,
                fontSize: "14px",
                color: "#8a8880",
              }}
            >
              Victoria, British Columbia &middot; {CONTACT_EMAIL}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              fontFamily: "var(--font-noto-sans)",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            <Link
              href={grinbuck3d.url}
              className="home-accent-link"
              style={{ color: "var(--color-home-ink)" }}
            >
              {grinbuck3d.name}
            </Link>
            <a
              href={tabmonk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="home-accent-link"
              style={{ color: "var(--color-home-ink)" }}
            >
              {tabmonk.name}
            </a>
            <a
              href={qpQuintet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="home-accent-link"
              style={{ color: "var(--color-home-ink)" }}
            >
              {qpQuintet.name}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

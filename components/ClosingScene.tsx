"use client";

const SECTORS = ["3D Manufacturing", "SaaS & Software", "Local Commerce", "Digital Infrastructure"] as const;

const APPROACH = [
  "We validate ideas cheaply before committing capital. Every venture starts as an experiment.",
  "We build lean and ship fast. Operational excellence over feature bloat.",
  "We scale what earns it. Capital follows proof, not promises.",
] as const;

export default function ClosingScene() {
  return (
    <div
      className="flex w-full justify-center"
      style={{
        background: "var(--color-paper)",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "clamp(2rem, 4vh, 3rem) clamp(2rem, 5vw, 5rem)",
      }}
    >
      <div
        className="flex w-full max-w-6xl flex-col lg:flex-row lg:items-start"
        style={{ gap: "clamp(1.4rem, 2.8vw, 2.1rem)" }}
      >
        <div className="flex w-full flex-col lg:w-[55%]">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            We build and operate ventures across technology, manufacturing, commerce, and digital
            infrastructure.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: "var(--color-ink)",
              opacity: 0.6,
              maxWidth: "480px",
              marginTop: "1.4rem",
              marginBottom: 0,
            }}
          >
            A Canadian company based in Victoria, British Columbia. We take ideas from zero to
            operational — managing product development, supply chain, software engineering, and market
            distribution.
          </p>

          <div style={{ marginTop: "1.25rem", maxWidth: "480px" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-olive)",
                margin: "0 0 0.35rem",
              }}
            >
              Our approach
            </p>
            {APPROACH.map((line) => (
              <div
                key={line}
                className="flex items-start justify-between gap-3"
                style={{
                  borderTop: "1px solid color-mix(in srgb, var(--color-ink) 8%, transparent)",
                  padding: "0.7rem 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    color: "var(--color-ink)",
                    margin: 0,
                    lineHeight: 1.45,
                    flex: 1,
                  }}
                >
                  {line}
                </p>
                <span style={{ color: "var(--color-olive)", flexShrink: 0, lineHeight: 1.45 }} aria-hidden="true">
                  →
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.35rem",
              marginTop: "1.4rem",
            }}
          >
            {SECTORS.map((sector) => (
              <span
                key={sector}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--color-olive)",
                  border: "1px solid var(--color-olive)",
                  borderRadius: "100px",
                  padding: "0.3rem 0.75rem",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col lg:w-[45%]">
          <div
            style={{
              background: "var(--color-paper)",
              border: "1px solid color-mix(in srgb, var(--color-ink) 10%, transparent)",
              borderRadius: "4px",
              padding: "2.1rem 1.75rem",
            }}
          >
            <div className="flex flex-col items-center">
              <img src="/gb.png" alt="Grinbuck" style={{ mixBlendMode: "multiply", width: 80, height: "auto" }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  opacity: 0.4,
                  marginTop: "0.7rem",
                  textAlign: "center",
                }}
              >
                Est. 2024
              </span>
            </div>

            <div
              style={{
                height: 1,
                background: "color-mix(in srgb, var(--color-ink) 8%, transparent)",
                margin: "1.4rem 0",
              }}
            />

            <div className="flex flex-col text-left" style={{ gap: "0.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  color: "var(--color-ink)",
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                Victoria, British Columbia
              </p>
              <a
                href="mailto:admin@grinbuck.com"
                className="transition-colors hover:underline"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--color-olive)",
                  textDecoration: "none",
                }}
              >
                admin@grinbuck.com
              </a>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  opacity: 0.35,
                  margin: 0,
                }}
              >
                We respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

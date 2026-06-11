"use client";

export default function ClosingScene() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-paper)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(2rem, 6vw, 5rem)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "760px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-ink)",
              opacity: 0.45,
            }}
          >
            Grinbuck Technologies Inc.
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "var(--color-olive)",
            }}
          >
            Est. 2024
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "var(--color-ink)",
            opacity: 0.1,
            marginBottom: "3rem",
          }}
        />

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "var(--color-ink)",
            margin: 0,
            marginBottom: "2rem",
          }}
        >
          We build and operate ventures across technology, manufacturing, commerce, and digital
          infrastructure.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            fontWeight: 400,
            lineHeight: 1.8,
            color: "var(--color-ink)",
            opacity: 0.65,
            margin: 0,
            marginBottom: "3rem",
            maxWidth: "580px",
          }}
        >
          Grinbuck Technologies is a Canadian holding company based in Victoria, British Columbia.
          We take ideas from zero to operational — managing product development, supply chain,
          software engineering, and market distribution. We are builders first, operators always.
        </p>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "var(--color-ink)",
            opacity: 0.1,
            marginBottom: "2.5rem",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {[
            ["3D Manufacturing", "Physical goods"],
            ["SaaS & Software", "Digital products"],
            ["Local Commerce", "Community networks"],
            ["Digital Infrastructure", "Platforms & systems"],
          ].map(([title, label]) => (
            <div key={title}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  marginBottom: "0.3rem",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--color-ink)",
                  opacity: 0.4,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "var(--color-ink)",
            opacity: 0.1,
            marginBottom: "2rem",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                color: "var(--color-ink)",
                opacity: 0.6,
                marginBottom: "0.3rem",
              }}
            >
              Victoria, British Columbia, Canada
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--color-ink)",
                opacity: 0.35,
              }}
            >
              Incorporated 2024
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <a
              href="mailto:admin@grinbuck.com"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                color: "var(--color-olive)",
                textDecoration: "none",
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              admin@grinbuck.com
            </a>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--color-ink)",
                opacity: 0.35,
              }}
            >
              We respond within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
